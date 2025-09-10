"use client"

import { ArrowRight, Heart, Scale, Star } from 'lucide-react'
import { Link, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'
import { ProductCardProps } from '@/types'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

function ProductCard({ product }: ProductCardProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isComparisonOpen, setIsComparisonOpen] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(false)
    const router = useRouter()

    const t = useTranslations("product_card")

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            const isInFavorites = favorites.some((item: { id: number; product: typeof product }) => item.id === product.id)
            setIsFavorite(isInFavorites)
        }
    }, [product.id])

    function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const storageKey = 'cart'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            // Normalize to the cart schema consumed by cart pages
            type CartItem = {
                id: string
                title: string
                brand: string
                volume: string
                price: number
                qty: number
                selected: boolean
                image: string
            }
            const cart: CartItem[] = raw ? JSON.parse(raw) : []

            const id = String(product.id)
            const existingIndex = cart.findIndex(item => item.id === id)
            if (existingIndex >= 0) {
                cart[existingIndex].qty += 1
            } else {
                cart.push({
                    id,
                    title: product.name,
                    brand: product.brand_name ?? '',
                    volume: '50 ML',
                    price: product.price,
                    qty: 1,
                    selected: true,
                    image: product.image || ''
                })
            }

            window.localStorage.setItem(storageKey, JSON.stringify(cart))
            setIsOpen(true)
        } catch (error) {
            console.error('Failed to write cart to localStorage', error)
        }
    }

    function handleAddToComparison(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const storageKey = 'comparison'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            const comparison: Array<{ id: number; product: typeof product, image: string }> = raw ? JSON.parse(raw) : []

            const existingIndex = comparison.findIndex(item => item.id === product.id)
            if (existingIndex === -1) {
                comparison.push({ id: product.id, product, image: product.image })
                window.localStorage.setItem(storageKey, JSON.stringify(comparison))
                setIsComparisonOpen(true)
                toast.success(t("add_to_compare_dialog"))
                // Notify header and others
                window.dispatchEvent(new CustomEvent('comparisonChanged'))
            }
            else {
                toast.error(t("already_in_compare"))
            }
        } catch (error) {
            console.error('Failed to write comparison to localStorage', error)
        }
    }

    function handleToggleFavorite(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()

        try {
            const storageKey = 'favorites'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            const favorites: Array<{ id: number; product: typeof product, image: string }> = raw ? JSON.parse(raw) : []

            const existingIndex = favorites.findIndex(item => item.id === product.id)

            if (existingIndex >= 0) {
                // Remove from favorites
                favorites.splice(existingIndex, 1)
                setIsFavorite(false)
                toast.success(t("remove_from_wishlist_dialog"))
            } else {
                // Add to favorites
                favorites.push({ id: product.id, product, image: product.image })
                setIsFavorite(true)
                toast.success(t("add_to_wishlist_dialog"))
            }

            window.localStorage.setItem(storageKey, JSON.stringify(favorites))

            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('favoritesChanged'))
        } catch (error) {
            console.error('Failed to write favorites to localStorage', error)
            toast.error('Xəta baş verdi')
        }
    }

    return (
        <div onClick={() => router.push(`/products/${product.slug}`)} key={product.id} className="bg-white relative group border border-[#F2F4F8] rounded-[12px] p-4"
            style={{
                boxShadow: "0px 8px 12px 0px #00000008",
            }}
        >
            <div className="flex flex-col items-center justify-end z-10 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="ghost" size="sm" className="p-2" onClick={handleToggleFavorite}>
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-600'}`} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2" onClick={handleAddToComparison}>
                    <Scale className="w-5 h-5 text-gray-600" />
                </Button>
            </div>
            {/* Product Image */}
            <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                <Image
                    width={100}
                    height={100}
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-primary">{product.name}</h3>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                        <span className="text-sm text-orange-400 font-medium">{product.star}</span>
                    </div>

                </div>
                <p className="text-sm text-[#77777B]">{product.brand_name}</p>

                {product.stock > 0 && <p className="text-[10px] text-primary bg-[#F2F4F8] rounded-[4px] px-2 py-1 w-fit mt-3">{t("in_stock")}</p>}

                <div className="h-[1px] bg-[#F2F4F8] w-full" />

                <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-primary">{product.price} AZN</span>
                    <button onClick={handleAddToCart} className="bg-primary text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                        {t("add_to_cart")}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open)
                if (!open) {
                    setTimeout(() => {
                    }, 0)
                }
            }}>
                <DialogContent className="max-w-xl p-0" onClick={(e) => e.stopPropagation()}>
                    <div className="p-4 sm:p-6">
                        <DialogHeader>
                            <DialogTitle>{t("add_to_cart_dialog")}</DialogTitle>
                            <DialogDescription />
                        </DialogHeader>

                        <div className="mt-4 grid grid-cols-[72px_1fr_auto] gap-4 items-center">
                            <div className="w-18 h-18 bg-white py-3 rounded-md border flex items-center justify-center overflow-hidden">
                                <Image
                                    width={72}
                                    height={72}
                                    src={product.image || '/placeholder.svg'}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-primary">{product.name}</p>
                                <p className="text-xs text-[#77777B] mt-1">{product.brand_name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-primary">(x1) {product.price} AZN</p>
                                <p className="text-[10px] text-muted-foreground">200 ml (1.50 a/ml)</p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between text-xs text-[#77777B] border-t pt-2">
                            <span>{t("in_cart")}</span>
                            <span className="text-primary">{t("initial_price")} {product.price}</span>
                        </div>

                        <div className="mt-4 w-full flex justify-end gap-2">
                            <Link
                                href={`/cart`}
                                className="flex gap-2 items-center bg-primary text-white rounded-md px-3 py-2 text-xs text-center"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.stopPropagation()
                                    setIsOpen(false)
                                }}
                            >
                                {t("cross_basket")} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Comparison Dialog */}
            <Dialog open={isComparisonOpen} onOpenChange={(open) => {
                setIsComparisonOpen(open)
                if (!open) {
                    setTimeout(() => {
                    }, 0)
                }
            }}>
                <DialogContent className="max-w-md p-0" onClick={(e) => e.stopPropagation()}>
                    <div className="p-6">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-medium">{t("add_to_compare_dialog")}</DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-md border flex items-center justify-center overflow-hidden flex-shrink-0">
                                <Image
                                    width={64}
                                    height={64}
                                    src={product.image || '/placeholder.svg'}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-primary">{product.name}</h3>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                                        <span className="text-sm text-[#FF9500] font-medium">{product.star}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#77777B] mt-1">{product.brand_name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-primary">{product.price} AZN</p>
                                <p className="text-xs text-[#77777B]">200 ml (1.50 ₼ / ml)</p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Link
                                href="/comparison"
                                className="flex items-center gap-2 bg-gray-800 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
                                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                    e.stopPropagation()
                                    setIsComparisonOpen(false)
                                }}
                            >
                                {t("add_to_compare")}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductCard