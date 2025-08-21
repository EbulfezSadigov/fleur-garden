import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Product {
    id: number
    name: string
    brand: string
    price: string
    rating: number
    inStock: boolean
    image: string
}

interface ProductCardProps {
    product: Product
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <div key={product.id} className="bg-white border border-[#F2F4F8] rounded-[12px] p-4"
            style={{
                boxShadow: "0px 8px 12px 0px #00000008",
            }}
        >
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
                        <span className="text-sm text-orange-400 font-medium">{product.rating}</span>
                    </div>

                </div>
                <p className="text-sm text-[#77777B]">{product.brand}</p>

                {product.inStock && <p className="text-[10px] text-primary bg-[#F2F4F8] rounded-[4px] px-2 py-1 w-fit mt-3">Stokda var</p>}

                <div className="h-[1px] bg-[#F2F4F8] w-full" />

                <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-primary">{product.price}</span>
                    <button className="bg-primary text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                        Səbətə at
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard