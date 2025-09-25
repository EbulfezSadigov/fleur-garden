"use client"

import { Star } from 'lucide-react'
import { useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { ProductCardProps } from '@/types'
import { useTranslations } from 'next-intl'
import FavComp from '../products/favComp'
import CartButton from '../products/cartButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function ProductCard({ product }: ProductCardProps) {
    const router = useRouter()
    const [selectedSize, setSelectedSize] = useState<string>("")
    const hasUnifiedPrice = product.price !== null && product.price !== undefined
    const t = useTranslations("product_card")

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
        if (!hasUnifiedPrice && sizeOptions.length > 0 && !selectedSize) {
            setSelectedSize(sizeOptions[0].value)
        }
    }, [hasUnifiedPrice, sizeOptions, selectedSize])

    return (
        <div onClick={() => router.push(`/products/${product.slug}`)} key={product.id} className="bg-white relative group border border-[#F2F4F8] rounded-[12px] p-4"
            style={{
                boxShadow: "0px 8px 12px 0px #00000008",
            }}
        >
            <FavComp product={product} />
            {/* Product Image */}
            <div className="aspect-[2/2] mb-4 rounded-lg overflow-hidden">
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
                        <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                        <span className="text-sm text-[#FF9500] font-medium">{product.star}</span>
                    </div>

                </div>
                <p className="text-sm text-[#77777B]">{product.brand_name}</p>

                <div className='flex items-center gap-2 justify-between mt-3'>
                    {product.stock > 0 && <p className="text-[10px] text-primary bg-[#F2F4F8] rounded-[4px] px-2 py-1 w-fit">{t("in_stock")}</p>}
                    {!hasUnifiedPrice && (
                        <Select value={selectedSize} onValueChange={setSelectedSize}>
                            <SelectTrigger className="w-24 text-xs py-1 data-[size=default]:h-5">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className='text-xs'>
                                {sizeOptions.map(opt => (
                                    <SelectItem className='text-xs' key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <div className="h-[1px] bg-[#F2F4F8] w-full" />

                <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between pt-2">
                    <div className='flex items-center gap-2'>
                        <span className={`font-semibold text-primary ${product.discount ? 'text-[#77777B]' : 'text-primary'}`}>{product.discount ? (product?.price ? product?.price * (1 - product.discount / 100) : 0) : selectedSizePrice.toFixed(1)} AZN</span>
                        {product.discount !== 0 && <span className={`line-through ${product.discount ? 'text-[#77777B] text-sm' : 'text-primary text-lg font-semibold'}`}>{product.price?.toFixed(1)} AZN</span>}
                    </div>
                    <CartButton
                        product={product}
                        selectedSize={selectedSize}
                        selectedPrice={selectedSizePrice}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCard