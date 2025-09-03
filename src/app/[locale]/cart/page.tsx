"use client"

import React from 'react'
import Image from 'next/image'
import { Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'

import Container from '@/components/shared/container'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CartItemData {
    id: string
    title: string
    brand: string
    volume: string
    price: number
    qty: number
    selected: boolean
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
        selected: true
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
                            src="/images/product.jpg"
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

    // Load cart data from localStorage on component mount
    React.useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart')
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart)
                // Check if it's the new format (CartItemData[]) or old format (LocalStorageCartItem[])
                if (parsedCart.length > 0 && parsedCart[0].product) {
                    // Old format from product card - transform it
                    setItems(transformLocalStorageData(parsedCart))
                } else {
                    // New format - use as is
                    setItems(parsedCart)
                }
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error)
        } finally {
            setIsInitialized(true)
        }
    }, [])

    // Save cart data to localStorage whenever items change (but not on initial load)
    React.useEffect(() => {
        if (isInitialized) {
            try {
                localStorage.setItem('cart', JSON.stringify(items))
            } catch (error) {
                console.error('Error saving cart to localStorage:', error)
            }
        }
    }, [items, isInitialized])

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
            setPromoMessage('20% Promo kod tətbiq olundu!')
        } else {
            setPromoApplied(false)
            setPromoMessage('Promo kod yanlışdır')
        }
    }

    return (
        <Container className="py-6 md:py-10">
            <Breadcrumb className="mb-6 md:mb-8">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Ana səhifə</BreadcrumbLink>
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
                        <BreadcrumbPage>Səbətim</BreadcrumbPage>
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
                                <span className="text-base md:text-lg">Hamısını seç</span>
                            </div>
                            <div className="text-base md:text-lg font-semibold">Səbət ({items.length} Məhsul)</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <CartItem key={item.id} item={item} onChange={(n) => handleItemChange(n, item.id)} />
                        ))}
                        {items.length === 0 && (
                            <div className="border rounded-2xl p-8 text-center text-muted-foreground">Səbət boşdur</div>
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
                            <div className="text-lg md:text-xl font-semibold mb-3">Promo kod</div>
                            <p className="text-muted-foreground text-sm mb-3">Diqqət! Yalnız bir promo kod istifadə oluna bilər.</p>
                            <div className="flex gap-2">
                                <Input placeholder="FLEUR20" value={promo} onChange={(e) => setPromo(e.target.value)} />
                                <Button variant="outline" onClick={applyPromo}>Tətbiq et</Button>
                            </div>
                            {promoMessage && (
                                <div className={promoApplied ? 'text-emerald-600 text-sm mt-2' : 'text-red-500 text-sm mt-2'}>
                                    {promoMessage}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span>Məhsulların qiyməti</span>
                                <span className="font-medium">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Endirim</span>
                                <span className="font-medium">{formatCurrency(discount)}</span>
                            </div>
                        </div>

                        <div className="h-px bg-border" />

                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span>Yekun qiymət</span>
                            <span>{formatCurrency(total)}</span>
                        </div>

                        <Link href="/cart/order">
                            <Button className="w-full h-11">Sifarişi tamamla</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Cart