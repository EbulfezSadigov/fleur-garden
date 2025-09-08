import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { ReviewsCarousel } from './reviews-carousel'

function ProductInfoTabs() {
    return (
        <div className="mt-12">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-200 rounded-none h-auto p-0 lg:w-[calc(45%-16px)]">
                    <TabsTrigger
                        value="details"
                        className="border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4 data-[state=active]:shadow-none"
                    >
                        Ətrafli məlumat
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4 data-[state=active]:shadow-none"
                    >
                        Rəylər
                    </TabsTrigger>
                    <TabsTrigger
                        value="conditions"
                        className="border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4 data-[state=active]:shadow-none"
                    >
                        Sifariş şərtləri
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-8 lg:w-[calc(45%-16px)]">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-900">Məhsulun növü</span>
                                <span className="text-gray-600">Qadın ətri</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-900">Qoxu tipləri</span>
                                <span className="text-gray-600">Yaşaman, vanil, müşk</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-900">Məhsulun növü</span>
                                <span className="text-gray-600">Qadın ətri</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-8">
                    <div className="space-y-8">
                        <div className="space-y-4 lg:w-[calc(45%-16px)]">
                            <div className="space-y-2 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-medium">Rəy yaz</h3>
                                    <p className="text-sm text-muted-foreground">Fikirlərinizi bizimlə paylaş</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="size-5 text-amber-400" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input placeholder="Fikirlərinizi qeyd edin" className="h-12" />
                                <Button className="h-12 px-6">Paylaş</Button>
                            </div>
                        </div>

                        <ReviewsCarousel />
                    </div>
                </TabsContent>

                <TabsContent value="conditions" className="mt-8">
                    <div className="prose max-w-none">
                        <p className="text-gray-600">Sifariş şərtləri və çatdırılma məlumatları burada göstəriləcək.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProductInfoTabs