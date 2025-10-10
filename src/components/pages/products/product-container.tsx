"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Scale, Star, Plus, Minus } from "lucide-react"
import Image from "next/image"
import ShareDialog from "@/components/shared/share-dialog"
import { useTranslations } from "next-intl"
import { Product } from "@/types"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

function ProductContainer({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1)
    const hasUnifiedPrice = product.price !== null && product.price !== undefined
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [customSize, setCustomSize] = useState<string>("")
    const [isFavorite, setIsFavorite] = useState(false)
    const [isInComparison, setIsInComparison] = useState(false)

    const t = useTranslations("product_page")

    // Prepare size options from API shape when price is null
    const sizeOptions = useMemo(() => {
        if (hasUnifiedPrice) return [] as Array<{ label: string; value: string; price: number }>
        const entries = Array.isArray(product.price_by_size) ? product.price_by_size : []
        return entries
            .filter(item => typeof item.size === 'number' && typeof item.price === 'number')
            .map(item => ({
                label: `${item.size} ML`,
                value: String(item.size),
                price: item.price,
            }))
    }, [product.price_by_size, hasUnifiedPrice])

    const selectedSizePrice = useMemo(() => {
        if (hasUnifiedPrice) return product.price ?? 0
        const found = sizeOptions.find(opt => opt.value === selectedSize)
        return found?.price ?? 0
    }, [hasUnifiedPrice, product.price, sizeOptions, selectedSize])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            const isInFavorites = favorites.some((item: { id: number; product: Product }) => item.id === product.id)
            setIsFavorite(isInFavorites)

            // Check comparison
            const comparison = JSON.parse(localStorage.getItem('comparison') || '[]')
            const isInComparisonList = comparison.some((item: { id: number; product: Product }) => item.id === product.id)
            setIsInComparison(isInComparisonList)
        }
    }, [product.id])

    // Initialize default selected size from API when price is null
    useEffect(() => {
        if (!hasUnifiedPrice && sizeOptions.length > 0 && !selectedSize) {
            setSelectedSize(sizeOptions[0].value)
        }
    }, [hasUnifiedPrice, sizeOptions, selectedSize])

    const incrementQuantity = () => setQuantity((prev) => prev + 1)
    const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

    const handleToggleFavorite = () => {
        try {
            const storageKey = 'favorites'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            const favorites: Array<{ id: number; product: Product }> = raw ? JSON.parse(raw) : []

            const existingIndex = favorites.findIndex(item => item.id === product.id)

            if (existingIndex >= 0) {
                // Remove from favorites
                favorites.splice(existingIndex, 1)
                setIsFavorite(false)
                toast.success('Məhsul sevimlilərdən çıxarıldı')
            } else {
                // Add to favorites
                favorites.push({ id: product.id, product: product })
                setIsFavorite(true)
                toast.success('Məhsul sevimlilərə əlavə olundu')
            }

            window.localStorage.setItem(storageKey, JSON.stringify(favorites))

            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('favoritesChanged'))
        } catch (error) {
            console.error('Failed to write favorites to localStorage', error)
            toast.error('Xəta baş verdi')
        }
    }

    const handleAddToComparison = () => {
        try {
            const storageKey = 'comparison'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            const comparison: Array<{ id: number; product: Product }> = raw ? JSON.parse(raw) : []

            const existingIndex = comparison.findIndex(item => item.id === product.id)
            if (existingIndex === -1) {
                comparison.push({ id: product.id, product: product })
                window.localStorage.setItem(storageKey, JSON.stringify(comparison))
                setIsInComparison(true)
                toast.success('Məhsul müqayisə siyahısına əlavə olundu')
                // Notify header and others
                window.dispatchEvent(new CustomEvent('comparisonChanged'))
            } else {
                toast.error('Məhsul artıq müqayisə siyahısına əlavə olunub')
            }
        } catch (error) {
            console.error('Failed to write comparison to localStorage', error)
            toast.error('Xəta baş verdi')
        }
    }

    const handleAddToCart = () => {
        try {
            // Use the SAME schema as the quick `CartButton` so the cart page renders consistently
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

            const storageKey = 'cart'
            const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
            const cart: CartItem[] = raw ? JSON.parse(raw) : []

            const id = String(product.id)

            // Resolve volume label and price according to pricing mode
            let volumeLabel = ''
            let priceValue = 0

            if (hasUnifiedPrice) {
                const v = Number(customSize)
                if (!v || Number.isNaN(v) || v <= 0) {
                    toast.error(t('please_enter_valid_volume') || 'Zəhmət olmasa həcmi daxil edin')
                    return
                }
                volumeLabel = `${v} ML`
                priceValue = (product.price ?? 0) * v
            } else {
                const v = Number(selectedSize)
                volumeLabel = v ? `${v} ML` : ''
                priceValue = selectedSizePrice
            }

            const existingIndex = cart.findIndex(item => item.id === id && item.volume === volumeLabel)
            if (existingIndex >= 0) {
                // Same product and same volume → increment qty only
                cart[existingIndex].qty += quantity
                cart[existingIndex].price = priceValue
            } else {
                cart.push({
                    id,
                    title: product.name,
                    brand: product.brand_name ?? '',
                    volume: volumeLabel,
                    price: priceValue,
                    qty: quantity,
                    selected: true,
                    image: product.image || ''
                })
            }

            window.localStorage.setItem(storageKey, JSON.stringify(cart))
            try {
                window.dispatchEvent(new Event('cart:updated'))
                window.dispatchEvent(new CustomEvent('cartChanged'))
            } catch { }
            toast.success(t('added_to_cart') || 'Səbətə əlavə olundu')
        } catch (error) {
            console.error('Failed to add to cart', error)
            toast.error('Xəta baş verdi')
        }
    }
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image Section */}
            <div className="relative w-full lg:w-[calc(45%-16px)]">
                <div className="border border-[#D3D3D7] h-[520px] rounded-[12px] p-8 bg-white">
                    <div className="relative aspect-square h-full w-full">
                        <Image
                            width={1000}
                            height={1000}
                            src={product.image}
                            alt="YSL Libre Perfume"
                            className="w-full h-full object-contain"
                        />

                        {/* Action Icons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-3">
                            <button
                                onClick={handleToggleFavorite}
                                className="p-2 bg-white border border-none rounded-full hover:bg-gray-50 transition-colors"
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-black text-black' : 'text-gray-600'}`} />
                            </button>
                            <button
                                onClick={handleAddToComparison}
                                className="p-2 bg-white border border-none rounded-full hover:bg-gray-50 transition-colors"
                            >
                                <Scale className={`w-5 h-5 ${isInComparison ? 'text-blue-600' : 'text-gray-600'}`} />
                            </button>
                            <ShareDialog />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-14 w-full lg:w-[calc(55%-16px)]">
                {/* Product Code */}
                <div className="space-y-6">
                    <div className="text-sm text-gray-500">{t("product_code")}: {product.code}</div>

                    {/* Product Title and Rating */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-lg text-gray-600">{product.brand_name}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">{product.stock > 0 ? t("in_stock") : t("not_in_stock")}</div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                                <span className="text-sm font-medium text-[#FF9500]">{product.star}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Volume: Select when price-by-size, Number input when single price */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">{t("product_volume")}:</label>
                    {hasUnifiedPrice ? (
                        <Input
                            type="number"
                            min={1}
                            inputMode="numeric"
                            value={customSize}
                            onChange={(e) => setCustomSize(e.target.value)}
                            className="w-32"
                            placeholder="ML"
                        />
                    ) : (
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {sizeOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">{selectedSizePrice} USD</div>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-500">
                                {!hasUnifiedPrice && selectedSize ? `${selectedSize} ml` : customSize ? `${customSize} ml` : ''} {" "}
                            </div>
                            {customSize && <span>({product?.price ? product?.price * Number(customSize) : 0} USD)</span>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 9H12.01M11 12H12V16H13M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z" stroke="#77777B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>{t("minimum_order_amount")}: 400 USD</span>
                        </div>
                    </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center gap-14">
                    <div className="flex items-center border border-gray-300 rounded-full">
                        <button onClick={decrementQuantity} className="p-3 hover:bg-gray-50 rounded-full">
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
                        <button onClick={incrementQuantity} className="p-3 hover:bg-gray-50 rounded-full">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <Button onClick={handleAddToCart} className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-[10px] font-medium">
                        {t("add_to_cart")}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductContainer