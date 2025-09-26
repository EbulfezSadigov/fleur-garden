"use client"

import React from 'react'
import Image from 'next/image'

import Container from '@/components/shared/container'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import PhoneInput from 'react-phone-input-2'
import { useMutation, useQuery } from '@tanstack/react-query'
import { orderMutation } from '@/services/products/mutations'
import type { OrderPayload } from '@/types'
import { useRouter } from '@/i18n/navigation'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { getUserQuery } from '@/services/auth/queries'

interface CheckoutItem {
    id: string
    title: string
    brand: string
    volume: string
    price: number
    qty: number
    image: string
}

function formatCurrency(amount: number) {
    return `${amount.toFixed(2)} AZN`
}

function Order() {
    const [items, setItems] = React.useState<CheckoutItem[]>([])

    const [payment, setPayment] = React.useState<'card' | 'cod'>('card')
    const [fullName, setFullName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [city, setCity] = React.useState('Bakı')
    const [address, setAddress] = React.useState('')
    const [note, setNote] = React.useState('')
    const [promo, setPromo] = React.useState('')

    const t = useTranslations("order")
    const router = useRouter()

    const accessToken = Cookies.get('access_token')

    // Fetch authenticated user if token exists
    const userQuery = useQuery({
        ...getUserQuery(accessToken || ''),
        enabled: Boolean(accessToken),
        staleTime: 5 * 60 * 1000,
    })

    console.log(userQuery.data)

    // LocalStorage keys
    const STORAGE_KEYS = React.useMemo(() => ({
        items: 'cart',
        form: 'order.form',
        payload: 'order.payload',
    }), [])

    function safeParseJSON<T>(value: string | null, fallback: T): T {
        if (!value) return fallback
        try {
            return JSON.parse(value) as T
        } catch {
            return fallback
        }
    }

    // Helpers to detect cart format and transform for UI + payload
    function parseMl(value: unknown): number {
        if (typeof value === 'number' && Number.isFinite(value)) return Math.max(0, Math.floor(value))
        if (typeof value === 'string') {
            const match = value.match(/(\d+)(?=\s*ml)/i) || value.match(/(\d+)/)
            if (match && match[1]) return Math.max(0, Math.floor(Number(match[1])))
        }
        return 0
    }
    const buildProductsPayload = React.useCallback((raw: unknown): OrderPayload['products'] => {
        if (!Array.isArray(raw)) return []
        // V2 format: { id, quantity, size, subtotal, ... }
        if (raw.length > 0 && typeof raw[0] === 'object' && raw[0] && 'quantity' in raw[0] && 'subtotal' in raw[0]) {
            return (raw as Array<{ id: number; quantity: number; size: number | null }>).
                map((it) => ({
                    product_id: Number(it.id),
                    quantity: Number(it.quantity),
                    size: parseMl(it.size), // ensure ml
                }))
        }
        // Very old format: { id, qty, product: {...} }
        if (raw.length > 0 && typeof raw[0] === 'object' && raw[0] && 'product' in raw[0]) {
            return (raw as Array<{ id: number; qty: number }>).map((it) => ({
                product_id: Number(it.id),
                quantity: Number(it.qty),
                size: 0, // legacy format lacks size; server may handle default
            }))
        }
        // Already UI CheckoutItem[] with id like `${id}-${size}`
        return (raw as CheckoutItem[]).map((i) => {
            const [rawId, rawSize] = String(i.id).split('-')
            const productId = Number(rawId)
            const sizeFromId = rawSize && rawSize !== 'na' ? parseMl(rawSize) : 0
            const sizeFromVolume = parseMl(i.volume)
            const finalSize = sizeFromVolume || sizeFromId
            return {
                product_id: productId,
                quantity: Number(i.qty),
                size: finalSize,
            }
        })
    }, [])

    function transformForUI(raw: unknown): CheckoutItem[] {
        if (!Array.isArray(raw)) return []
        // V2
        if (raw.length > 0 && typeof raw[0] === 'object' && raw[0] && 'quantity' in raw[0] && 'subtotal' in raw[0]) {
            return (raw as Array<{
                id: number
                name: string
                image: string
                price: number
                quantity: number
                size: number | null
                product?: { brand_name?: string }
            }>).map((it) => ({
                id: `${it.id}-${it.size ?? 'na'}`,
                title: it.name,
                brand: it.product?.brand_name ?? '',
                volume: it.size ? `${it.size} ML` : '',
                price: Number(it.price),
                qty: Number(it.quantity),
                image: it.image || '',
            }))
        }
        // Very old format
        if (raw.length > 0 && typeof raw[0] === 'object' && raw[0] && 'product' in raw[0]) {
            return (raw as Array<{ id: number; qty: number; product: { name: string; brand: string; price: string | number; image?: string } }>).
                map((it) => ({
                    id: String(it.id),
                    title: it.product.name,
                    brand: it.product.brand,
                    volume: '',
                    price: typeof it.product.price === 'string' ? parseFloat(it.product.price.replace(/[^\d.-]/g, '')) : Number(it.product.price ?? 0),
                    qty: Number(it.qty),
                    image: it.product.image || '',
                }))
        }
        // Assume CheckoutItem[]
        return raw as CheckoutItem[]
    }

    // Load from localStorage on mount
    React.useEffect(() => {
        try {
            const raw = safeParseJSON<unknown>(
                typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.items) : null,
                []
            )
            const uiItems = transformForUI(raw)
            if (uiItems.length) setItems(uiItems)

            const savedForm = safeParseJSON<{
                fullName?: string
                phone?: string
                city?: string
                address?: string
                note?: string
                payment?: 'card' | 'cod'
                promo?: string
            }>(typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.form) : null, {})

            if (savedForm.fullName) setFullName(savedForm.fullName)
            if (savedForm.phone) setPhone(savedForm.phone)
            if (savedForm.city) setCity(savedForm.city)
            if (savedForm.address) setAddress(savedForm.address)
            if (savedForm.note) setNote(savedForm.note)
            if (savedForm.payment) setPayment(savedForm.payment)
            if (savedForm.promo) setPromo(savedForm.promo)
        } catch {
            // ignore storage errors
        }
    }, [STORAGE_KEYS.form, STORAGE_KEYS.items])

    // Persist items
    React.useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(items))
            }
        } catch {
            // ignore storage errors
        }
    }, [items, STORAGE_KEYS])

    // Persist form
    React.useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(
                    STORAGE_KEYS.form,
                    JSON.stringify({ fullName, phone, city, address, note, payment, promo })
                )
            }
        } catch {
            // ignore storage errors
        }
    }, [fullName, phone, city, address, note, payment, promo, STORAGE_KEYS])

    // Autofill from user when available
    React.useEffect(() => {
        const user = userQuery.data?.data
        if (!user) return
        if (!fullName && user.name) setFullName(user.name)
        if (!phone && user.mobile) setPhone(user.mobile)
        // No address/city in user shape; keep as-is
    }, [userQuery.data, fullName, phone])

    // Force COD when unauthenticated
    React.useEffect(() => {
        if (!accessToken) setPayment('cod')
    }, [accessToken])

    // Build and persist API payload whenever dependencies change
    const payload: OrderPayload = React.useMemo(() => {
        return {
            name: fullName,
            city,
            address,
            phone,
            note,
            payment_type: payment === 'card' ? '1' : '2',
            products: buildProductsPayload(items),
            promocode: promo,
            user_id: userQuery.data?.data?.id
        }
    }, [fullName, phone, city, address, note, payment, promo, items, buildProductsPayload, userQuery.data])

    React.useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(STORAGE_KEYS.payload, JSON.stringify(payload))
            }
        } catch {
            // ignore storage errors
        }
    }, [payload, STORAGE_KEYS])

    const submitOrder = useMutation(orderMutation(payload))

    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const total = subtotal

    const orderAction = () => {
        submitOrder.mutateAsync(undefined, {
            onSuccess: (data) => {
                if (payment === 'card') {
                    router.push(data.data)
                } else {
                    router.push('/')
                }
                toast.success(t("order_success"))
            },
            onError: () => {
                toast.error(t("order_failed"))
            }
        })
    }

    return (
        <Container className="py-6 md:py-10">
            <Breadcrumb className="mb-6 md:mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">{t("home")}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_355_8453)">
                            <path d="M11.3332 3.33337L4.6665 12.6667" stroke="#D3D3D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_355_8453">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/cart">{t("cart")}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clipPath="url(#clip0_355_8453)">
                            <path d="M11.3332 3.33337L4.6665 12.6667" stroke="#D3D3D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_355_8453">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <BreadcrumbItem>
                        <BreadcrumbPage>{t("order_confirmation")}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <div className="text-xl md:text-2xl font-semibold mb-4 p-4" style={{ borderRadius: '10px', border: '1px solid #F2F4F8', background: '#FFF' }}>{t("order_confirmation")}</div>
                    <div className="p-5 md:p-6 space-y-6" style={{ borderRadius: '10px', border: '1px solid #F2F4F8', background: '#FFF' }}>
                        <div className="space-y-2">
                            <div className="text-lg font-semibold">{t("payment_method")}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {accessToken && (
                                    <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${payment === 'card' ? 'border-primary' : 'border-[#F2F4F8]'}`}>
                                        <input type="radio" name="payment" className="sr-only" checked={payment === 'card'} onChange={() => setPayment('card')} />
                                        <span className="size-4 rounded-full border border-[#E4E7EC] grid place-content-center">
                                            <span className={`size-2 rounded-full ${payment === 'card' ? 'bg-primary' : 'bg-transparent'}`} />
                                        </span>
                                        <span>{t("online_payment")}</span>
                                    </label>
                                )}
                                <label className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer ${payment === 'cod' ? 'border-primary' : 'border-[#F2F4F8]'}`}>
                                    <input type="radio" name="payment" className="sr-only" checked={payment === 'cod'} onChange={() => setPayment('cod')} />
                                    <span className="size-4 rounded-full border border-[#E4E7EC] grid place-content-center">
                                        <span className={`size-2 rounded-full ${payment === 'cod' ? 'bg-primary' : 'bg-transparent'}`} />
                                    </span>
                                    <span>{t("cash_on_delivery")}</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-lg font-semibold">{t("personal_information")}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input placeholder={t("full_name")} value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                <PhoneInput
                                    country={'az'}
                                    value={phone?.replace(/^\+/, '')}
                                    onChange={(val) => setPhone(val ? `+${val}` : '')}
                                    placeholder={t("phone")}
                                    countryCodeEditable={false}
                                    inputProps={{ name: 'phone', required: true }}
                                    containerClass="w-full"
                                    inputClass="!w-full !h-9 !text-base !bg-white !border !border-[#E4E7EC] !rounded-md !pl-12 !shadow-none focus:!border-[#E4E7EC] focus:!shadow-none"
                                    buttonClass="!border !border-[#E4E7EC] !bg-white !rounded-l-md !h-9"
                                    dropdownClass="!shadow-lg"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="text-lg font-semibold">{t("delivery_information")}</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Select value={city} onValueChange={setCity}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={t("city")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bakı">Bakı</SelectItem>
                                        <SelectItem value="Gəncə">Gəncə</SelectItem>
                                        <SelectItem value="Sumqayıt">Sumqayıt</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Input placeholder={t("address")} value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <Textarea placeholder={t("additional_information")} value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="h-11 flex-1"
                                onClick={() => router.push('/cart')}
                            >
                                {t("cancel")}
                            </Button>
                            <Button
                                className="h-11 flex-1"
                                disabled={submitOrder.isPending || items.length === 0}
                                onClick={orderAction}
                            >
                                {submitOrder.isPending ? t('processing') : t("continue")}
                            </Button>
                        </div>
                        {submitOrder.isError && (
                            <div className="text-red-500 text-sm">{t('order_failed')}</div>
                        )}
                        {submitOrder.isSuccess && (
                            <div className="text-emerald-600 text-sm">{t('order_success')}</div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 sticky top-0">
                    <div className="p-5 md:p-6 space-y-5" style={{ borderRadius: '10px', border: '1px solid #F2F4F8', background: '#FFF' }}>
                        <div className="text-lg md:text-xl font-semibold">{t("cart")} ({items.length} {t("products")})</div>

                        <div className="space-y-4">
                            {items.map((i) => (
                                <div key={i.id} className="flex items-start gap-3">
                                    <Image src={i.image} alt={i.title} width={64} height={64} className="rounded-md object-cover" />
                                    <div className="flex-1">
                                        <div className="font-medium">{i.title}</div>
                                        <div className="text-muted-foreground text-sm">{i.brand} • {i.volume}</div>
                                        <div className="text-sm">(X{i.qty}) {formatCurrency(i.price)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between"><span>{t("total_price")}</span><span className="font-medium">{formatCurrency(subtotal)}</span></div>
                            {/* <div className="flex items-center justify-between"><span>{t("discount")}</span><span className="font-medium">{formatCurrency(0)}</span></div> */}
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex items-center justify-between text-lg font-semibold"><span>{t("total_price")}</span><span>{formatCurrency(total)}</span></div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Order