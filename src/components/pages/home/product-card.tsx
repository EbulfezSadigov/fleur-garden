"use client"

import { Star } from 'lucide-react'
import { useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import React from 'react'
import { ProductCardProps } from '@/types'
import { useTranslations } from 'next-intl'
import FavComp from '../products/favComp'
import CartButton from '../products/cartButton'

function ProductCard({ product }: ProductCardProps) {
    const router = useRouter()

    const t = useTranslations("product_card")

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

                {product.stock > 0 && <p className="text-[10px] text-primary bg-[#F2F4F8] rounded-[4px] px-2 py-1 w-fit mt-3">{t("in_stock")}</p>}

                <div className="h-[1px] bg-[#F2F4F8] w-full" />

                <div className="flex items-center justify-between pt-2">
                    <div className='flex items-center gap-2'>
                        <span className={`font-semibold text-primary ${product.discount ? 'text-[#77777B]' : 'text-primary'}`}>{product.discount ? product.discount : product.price} AZN</span>
                        {product.discount && <span className={`line-through ${product.discount ? 'text-[#77777B] text-sm' : 'text-primary text-lg font-semibold'}`}>{product.price} AZN</span>}
                    </div>
                    <CartButton product={product} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard