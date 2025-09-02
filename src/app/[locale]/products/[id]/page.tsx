"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Scale, Share2, Star, Info, Plus, Minus } from "lucide-react"
import Image from "next/image"

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("50 ML")

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-6 py-4 text-sm text-gray-600">
        <span>Ana səhifə</span>
        <span className="mx-2">/</span>
        <span>YSL Libre</span>
      </div>

      <div className="px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Product Image Section */}
          <div className="relative">
            <div className="border border-gray-200 rounded-lg p-8 bg-white">
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  width={1000}
                  height={1000}
                  src="/ysl-libre-perfume-bottle-with-clear-glass-and-silv.png"
                  alt="YSL Libre Perfume"
                  className="w-full h-full object-contain"
                />

                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                    <Scale className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Product Code */}
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
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="text-sm font-medium text-orange-400">4.5</span>
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
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
              <div className="text-sm text-gray-500">200 ml (1.50 ₼ / ml)</div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4" />
                <span>Minimum sifariş məbləği 400 AZN təşkil edir.</span>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button onClick={decrementQuantity} className="p-3 hover:bg-gray-50 rounded-full">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center font-medium">{quantity}</span>
                <button onClick={incrementQuantity} className="p-3 hover:bg-gray-50 rounded-full">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-lg font-medium">
                Səbətə at
              </Button>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="max-w-7xl mx-auto mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
              <TabsTrigger
                value="details"
                className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4"
              >
                Ətrafli məlumat
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4"
              >
                Rəylər
              </TabsTrigger>
              <TabsTrigger
                value="conditions"
                className="border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4"
              >
                Sifariş şərtləri
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Məhsulun növü</span>
                    <span className="text-gray-600">Qadın ətri</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Qoxu tipləri</span>
                    <span className="text-gray-600">Yaşaman, vanil, müşk</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Məhsulun növü</span>
                    <span className="text-gray-600">Qadın ətri</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="text-center py-12 text-gray-500">Hələ ki rəy yoxdur</div>
            </TabsContent>

            <TabsContent value="conditions" className="mt-8">
              <div className="prose max-w-none">
                <p className="text-gray-600">Sifariş şərtləri və çatdırılma məlumatları burada göstəriləcək.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
