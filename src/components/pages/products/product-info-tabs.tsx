import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'
import { ReviewsCarousel } from './reviews-carousel'
import { useTranslations } from 'next-intl'
import { Product } from '@/types'

function ProductInfoTabs({ product }: { product: Product }) {
    const t = useTranslations("product_page")
    return (
        <div className="mt-12">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-200 rounded-none h-auto p-0 lg:w-[calc(45%-16px)]">
                    <TabsTrigger
                        value="details"
                        className="border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4 data-[state=active]:shadow-none"
                    >
                        {t("detailed_information")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4 data-[state=active]:shadow-none"
                    >
                        {t("reviews")}
                    </TabsTrigger>
                    <TabsTrigger
                        value="conditions"
                        className="border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent bg-transparent rounded-none pb-4 data-[state=active]:shadow-none"
                    >
                        {t("order_conditions")}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-8 lg:w-[calc(45%-16px)]">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-900">{t("product_type")}</span>
                                <span className="text-gray-600">{product.category_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-900">{t("fragrance_types")}</span>
                                <span className="text-gray-600">Cicek</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-900">{t("brand")}</span>
                                <span className="text-gray-600">{product.brand_name}</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-8">
                    <div className="space-y-8">
                        <div className="space-y-4 lg:w-[calc(45%-16px)]">
                            <div className="space-y-2 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-medium">{t("write_review")}</h3>
                                    <p className="text-sm text-muted-foreground">{t("share_your_thoughts")}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="size-5 text-amber-400" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input placeholder={t("share_your_thoughts")} className="h-12" />
                                <Button className="h-12 px-6">{t("share")}</Button>
                            </div>
                        </div>

                        <ReviewsCarousel />
                    </div>
                </TabsContent>

                <TabsContent value="conditions" className="mt-8">
                    <div className="prose max-w-none">
                        <p className="text-gray-600">{t("order_conditions_and_delivery_information")}</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProductInfoTabs