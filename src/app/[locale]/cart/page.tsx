"use client"

import React from 'react'
import Image from 'next/image'
import { Plus, Minus, Trash2 } from 'lucide-react'

import Container from '@/components/shared/container'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Product } from '@/types'

interface CartItemData {
    id: string
    title: string
    brand: string
    volume: string
    price: number
    qty: number
    selected: boolean
    image: string
}

interface LocalStorageCartItem {
    id: number
    qty: number
    product: {
        id: number
        name: string
        brand: string
        price: string
        image?: string
        rating: number
        inStock: boolean
    }
}

interface CartStorageItemV2 {
    id: number
    product?: Product
    name: string
    image: string
    quantity: number
    size: number | null
    price: number
    subtotal: number
    pricingMode?: 'unified' | 'by_size'
    distinguish?: string
}

function formatCurrency(amount: number | string) {
    const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount
    return `${numAmount.toFixed(2)} AZN`
}

function transformLocalStorageData(localStorageData: LocalStorageCartItem[]): CartItemData[] {
    return localStorageData.map(item => ({
        id: item.id.toString(),
        title: item.product.name,
        brand: item.product.brand,
        volume: '50 ML', // Default volume since it's not in the product data
        price: typeof item.product.price === 'string'
            ? parseFloat(item.product.price.replace(/[^\d.-]/g, ''))
            : item.product.price,
        qty: item.qty,
        selected: true,
        image: item.product.image || ""
    }))
}

function transformV2Data(v2: CartStorageItemV2[]): CartItemData[] {
    return v2.map(item => ({
        id: `${item.id}-${item.size ?? 'na'}`,
        title: item.name,
        brand: item.product?.brand_name ?? '',
        volume: item.size ? `${item.size} ML` : '',
        price: item.price,
        qty: item.quantity,
        selected: true,
        image: item.image || "",
    }))
}

function CartItem({ item, onChange }: { item: CartItemData; onChange: (next: CartItemData | null) => void }) {
    const handleQty = (delta: number) => {
        const nextQty = item.qty + delta
        if (nextQty < 1) return
        onChange({ ...item, qty: nextQty })
    }

    return (
        <div className="p-5 md:p-6"
            style={{
                borderRadius: "10px",
                border: "1px solid #F2F4F8",
                background: "#FFF",
            }}
        >
            <div className="flex items-start gap-4 md:gap-6">
                <Checkbox
                    checked={item.selected}
                    onCheckedChange={(v) => onChange({ ...item, selected: Boolean(v) })}
                    className="mt-2"
                />

                <div className="flex items-center gap-4 md:gap-6 flex-1">
                    <div className="shrink-0">
                        <Image
                            src={item.image || ""}
                            alt={item.title}
                            width={88}
                            height={88}
                            className="rounded-md object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <div className="text-lg md:text-xl font-semibold text-foreground">{item.title}</div>
                        <div className="text-muted-foreground text-sm md:text-base mt-1">
                            {item.brand} • {item.volume}
                        </div>
                        <div className="text-foreground text-xl md:text-2xl font-semibold mt-3">{formatCurrency(item.price)}</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button className='rounded-full' variant="outline" size="icon" aria-label="Increase" onClick={() => handleQty(1)}>
                            <Plus />
                        </Button>
                        <span className="w-6 text-center text-base md:text-lg">{item.qty}</span>
                        <Button className='rounded-full' variant="outline" size="icon" aria-label="Decrease" onClick={() => handleQty(-1)}>
                            <Minus />
                        </Button>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remove"
                        className="text-destructive"
                        onClick={() => onChange(null)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Cart() {
    const [items, setItems] = React.useState<CartItemData[]>([])
    const [isInitialized, setIsInitialized] = React.useState(false)
    const [usingV2, setUsingV2] = React.useState(false)
    const originalV2ByKey = React.useRef<Record<string, CartStorageItemV2>>({})

    const t = useTranslations("cart")

    // Load cart data from localStorage on component mount and on cartChanged
    React.useEffect(() => {
        function load() {
            try {
                const savedCart = localStorage.getItem('cart')
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart)
                    if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                        // Detect V2
                        if (parsedCart[0] && typeof parsedCart[0].subtotal === 'number' && 'quantity' in parsedCart[0]) {
                            const v2 = parsedCart as CartStorageItemV2[]
                            setUsingV2(true)
                            // Keep originals for accurate save-back
                            originalV2ByKey.current = v2.reduce((acc, it) => {
                                const key = `${it.id}-${it.size ?? 'na'}`
                                acc[key] = it
                                return acc
                            }, {} as Record<string, CartStorageItemV2>)
                            setItems(transformV2Data(v2))
                        } else if (parsedCart[0].product) {
                            // Very old format from product card - transform it
                            setUsingV2(false)
                            setItems(transformLocalStorageData(parsedCart))
                        } else {
                            // Already in CartItemData[] format
                            setUsingV2(false)
                            setItems(parsedCart)
                        }
                    } else {
                        setItems([])
                    }
                } else {
                    setItems([])
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error)
            } finally {
                setIsInitialized(true)
            }
        }
        load()
        const handler = () => load()
        window.addEventListener('cartChanged', handler)
        return () => window.removeEventListener('cartChanged', handler)
    }, [])

    // Save cart data to localStorage whenever items change (but not on initial load)
    React.useEffect(() => {
        if (isInitialized) {
            try {
                if (usingV2) {
                    // Map back into V2 storage format preserving product info where possible
                    const v2: CartStorageItemV2[] = items.map(it => {
                        const [rawId, rawSize] = it.id.split('-')
                        const idNum = Number(rawId)
                        const sizeNum = rawSize === 'na' ? null : Number(rawSize)
                        const key = `${idNum}-${sizeNum ?? 'na'}`
                        const original = originalV2ByKey.current[key]
                        const price = it.price
                        const quantity = it.qty
                        const base: CartStorageItemV2 = original ? {
                            ...original,
                            name: it.title,
                            image: it.image,
                            price,
                            quantity,
                            size: sizeNum,
                            subtotal: price * quantity,
                            pricingMode: original.pricingMode,
                            distinguish: original.distinguish ?? `${idNum}-${sizeNum ?? 'na'}`,
                        } : {
                            id: idNum,
                            product: undefined,
                            name: it.title,
                            image: it.image,
                            price,
                            quantity,
                            size: sizeNum,
                            subtotal: price * quantity,
                            pricingMode: undefined,
                            distinguish: `${idNum}-${sizeNum ?? 'na'}`,
                        }
                        return base
                    })
                    localStorage.setItem('cart', JSON.stringify(v2))
                } else {
                    localStorage.setItem('cart', JSON.stringify(items))
                }
            } catch (error) {
                console.error('Error saving cart to localStorage:', error)
            }
        }
    }, [items, isInitialized, usingV2])

    const allSelected = items.length > 0 && items.every((p) => p.selected)
    const [promo, setPromo] = React.useState<string>('')
    const [promoApplied, setPromoApplied] = React.useState<boolean>(false)
    const [promoMessage, setPromoMessage] = React.useState<string>('')

    const selectedItems = items.filter((i) => i.selected)
    const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0)
    const discountRate = promoApplied ? 0.2 : 0
    const discount = subtotal * discountRate
    const total = subtotal - discount

    function handleItemChange(next: CartItemData | null, id: string) {
        if (next === null) {
            setItems((prev) => prev.filter((i) => i.id !== id))
            return
        }
        setItems((prev) => prev.map((i) => (i.id === id ? next : i)))
    }

    function handleToggleAll(checked: boolean) {
        setItems((prev) => prev.map((i) => ({ ...i, selected: checked })))
    }

    function applyPromo() {
        if (promo.trim().toUpperCase() === 'FLEUR20') {
            setPromoApplied(true)
            setPromoMessage(t("promo_code_applied"))
        } else {
            setPromoApplied(false)
            setPromoMessage(t('promo_code_invalid'))
        }
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
                        <BreadcrumbPage>{t("cart")}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-4">
                    <div className="p-5 md:p-6"
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #F2F4F8",
                            background: "#FFF",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Checkbox checked={allSelected} onCheckedChange={(v) => handleToggleAll(Boolean(v))} />
                                <span className="text-base md:text-lg">{t("select_all")}</span>
                            </div>
                            <div className="text-base md:text-lg font-semibold">{t("cart")} ({items.length} {t("products")})</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} onChange={(n) => handleItemChange(n, item.id)} />
                        ))}
                        {items.length === 0 && (
                            <div className="border rounded-2xl p-8 text-center text-muted-foreground">{t("cart_empty")}</div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="p-5 md:p-6 space-y-5"
                        style={{
                            borderRadius: "10px",
                            border: "1px solid #F2F4F8",
                            background: "#FFF",
                        }}
                    >
                        <div>
                            <div className="text-lg md:text-xl font-semibold mb-3">{t("promo_code")}</div>
                            <p className="text-muted-foreground text-sm mb-3">{t("promo_code_description")}</p>
                            <div className="flex gap-2">
                                <Input disabled={items.length === 0 || !total} placeholder="FLEUR20" value={promo} onChange={(e) => setPromo(e.target.value)} />
                                <Button disabled={items.length === 0 || !total} variant="outline" onClick={applyPromo}>{t("apply")}</Button>
                            </div>
                            {promoMessage && (
                                <div className={promoApplied ? 'text-emerald-600 text-sm mt-2' : 'text-red-500 text-sm mt-2'}>
                                    {promoMessage}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span>{t("products_price")}</span>
                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>{t("discount")}</span>
                                <span className="font-medium">{formatCurrency(discount)}</span>
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span>{t("total_price")}</span>
                            <span>{formatCurrency(total)}</span>
                        </div>

                        <Link href={items.length === 0 ? "/cart" : "/cart/order"}>
                            <Button disabled={items.length === 0 || !total} className="w-full h-11">{t("complete_order")}</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Cart