"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Scale, Share2, Star, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Container from "@/components/shared/container"
import Link from "next/link"
import { Product } from "@/types"
import { toast } from "sonner"
import ProductInfoTabs from "@/components/pages/products/product-info-tabs"
import RelatedProducts from "@/components/pages/products/related-products"

const products: Product[] = Array.from({ length: 4 }).map((_, index) => ({
  id: index + 1,
  name: "YSL LIBRE",
  brand: "Yves Saint Laurent",
  price: "347 AZN",
  rating: 4.5,
  inStock: true,
  image: "/images/product.jpg",
}))

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("50 ML")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInComparison, setIsInComparison] = useState(false)

  // Mock product data - in real app this would come from props or API
  const currentProduct: Product = {
    id: 1,
    name: "YSL LIBRE",
    brand: "Yves Saint Laurent",
    price: "347 AZN",
    rating: 4.5,
    inStock: true,
    image: "/images/product.jpg",
  }

  // Check if product is in favorites and comparison on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check favorites
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      const isInFavorites = favorites.some((item: { id: number; product: Product }) => item.id === currentProduct.id)
      setIsFavorite(isInFavorites)

      // Check comparison
      const comparison = JSON.parse(localStorage.getItem('comparison') || '[]')
      const isInComparisonList = comparison.some((item: { id: number; product: Product }) => item.id === currentProduct.id)
      setIsInComparison(isInComparisonList)
    }
  }, [currentProduct.id])

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const handleToggleFavorite = () => {
    try {
      const storageKey = 'favorites'
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(storageKey) : null
      const favorites: Array<{ id: number; product: Product }> = raw ? JSON.parse(raw) : []

      const existingIndex = favorites.findIndex(item => item.id === currentProduct.id)

      if (existingIndex >= 0) {
        // Remove from favorites
        favorites.splice(existingIndex, 1)
        setIsFavorite(false)
        toast.success('Məhsul sevimlilərdən çıxarıldı')
      } else {
        // Add to favorites
        favorites.push({ id: currentProduct.id, product: currentProduct })
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

      const existingIndex = comparison.findIndex(item => item.id === currentProduct.id)
      if (existingIndex === -1) {
        comparison.push({ id: currentProduct.id, product: currentProduct })
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

  return (
    <div className="bg-white py-6">
      {/* Breadcrumb */}
      <Container>
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/">Ana səhifə</Link>
          <span className="mx-2">/</span>
          <span>YSL Libre</span>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image Section */}
            <div className="relative w-full lg:w-[calc(45%-16px)]">
              <div className="border border-[#D3D3D7] h-[520px] rounded-[12px] p-8 bg-white">
                <div className="relative aspect-square h-full w-full">
                  <Image
                    width={1000}
                    height={1000}
                    src="/images/product.jpg"
                    alt="YSL Libre Perfume"
                    className="w-full h-full object-contain"
                  />

                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-3">
                    <button
                      onClick={handleToggleFavorite}
                      className="p-2 bg-white border border-none rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                    <button
                      onClick={handleAddToComparison}
                      className="p-2 bg-white border border-none rounded-full hover:bg-gray-50 transition-colors"
                    >
                      <Scale className={`w-5 h-5 ${isInComparison ? 'text-blue-600' : 'text-gray-600'}`} />
                    </button>
                    <button className="p-2 bg-white border border-none rounded-full hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-14 w-full lg:w-[calc(55%-16px)]">
              {/* Product Code */}
              <div className="space-y-6">
                <div className="text-sm text-gray-500">Məhsul kodu: 979797979</div>

                {/* Product Title and Rating */}
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">YSL LIBRE</h1>
                    <p className="text-lg text-gray-600">Yves Saint Laurent</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Stokda var</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FF9500] text-[#FF9500]" />
                      <span className="text-sm font-medium text-[#FF9500]">4.5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Məhsulun həcmi :</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 ML">30 ML</SelectItem>
                    <SelectItem value="50 ML">50 ML</SelectItem>
                    <SelectItem value="90 ML">90 ML</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">347 AZN</div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">200 ml (1.50 ₼ / ml)</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 9H12.01M11 12H12V16H13M12 3C19.2 3 21 4.8 21 12C21 19.2 19.2 21 12 21C4.8 21 3 19.2 3 12C3 4.8 4.8 3 12 3Z" stroke="#77777B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Minimum sifariş məbləği 400 AZN təşkil edir.</span>
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

                <Button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-[10px] font-medium">
                  Səbətə at
                </Button>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <ProductInfoTabs />

          {/* Related Products */}
          <RelatedProducts products={products} />
        </div>
      </Container>
    </div>
  )
}
