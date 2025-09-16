"use client"

import { useMemo, useState } from "react"
import ProductCard from "@/components/pages/home/product-card"
import FilterSidebar from "@/components/pages/products/filter-sidebar"
import { useTranslations } from "next-intl"
import { Brand, Category, Product } from "@/types"
import { useSearchParams } from "next/navigation"

interface ProductsClientProps {
    brands: Brand[]
    categories: Category[]
}

export default function ProductsClient({ brands, categories }: ProductsClientProps) {
    const t = useTranslations("product_grid")
    const [products, setProducts] = useState<Product[]>([])
    const searchParams = useSearchParams()

    const productsCount = products?.length ?? 0

    const brandId = Number(searchParams.get("brand_id") || 0)
    const categoryId = Number(searchParams.get("category_id") || 0)
    const typeId = Number(searchParams.get("type") || 0)
    const categoryName = useMemo(() => {
        if (!categoryId || categoryId <= 0) return ""

        const findInSubcategories = (
            subs: { id: number; name: string; slug: string }[],
            id: number
        ): string => {
            for (const sub of subs) {
                if (sub.id === id) return sub.name
            }
            return ""
        }

        const findCategoryName = (items: Category[], id: number): string => {
            for (const item of items) {
                if (item.id === id) return item.name
                if (item.category && item.category.length > 0) {
                    const found = findInSubcategories(item.category, id)
                    if (found) return found
                }
            }
            return ""
        }

        return findCategoryName(categories, categoryId)
    }, [categories, categoryId])

    const brandName = useMemo(() => {
        if (!brandId || brandId <= 0) return ""
        return brands.find(b => b.id === brandId)?.name ?? ""
    }, [brands, brandId])

    const dynamicTitle = useMemo(() => {
        if (brandName && categoryName) return `${brandName} — ${categoryName}`
        if (categoryName) return categoryName
        if (brandName) return brandName
        if (typeId) return typeId === 1 ? t("title") : typeId === 2 ? t("discount") : t("on_sale")
    }, [brandName, categoryName, typeId, t])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-6">
            <FilterSidebar brands={brands} categories={categories} onFiltered={setProducts} />

            <div className="space-y-6 md:col-span-3">
                <h1 className="text-[28px] md:text-[32px] font-semibold text-foreground mb-2">{dynamicTitle}</h1>
                <p className="text-sm text-[#77777B] mb-6">{productsCount} {t("products_found")}</p>
                <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
                    {products?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {productsCount > 0 && (
                    <div className="flex justify-center pt-2">
                        <button className="px-8 py-2 border border-black rounded-md text-primary text-sm bg-transparent">
                            {t("more")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}