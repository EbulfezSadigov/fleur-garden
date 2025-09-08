"use client"

import Container from "@/components/shared/container"
import ProductCard from "@/components/pages/home/product-card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React from "react"
import { Link } from "@/i18n/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface Product {
    id: number
    name: string
    brand: string
    price: string
    rating: number
    inStock: boolean
    image: string
}

export default function FavoritesPage() {
    const [favorites, setFavorites] = React.useState<Product[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const t = useTranslations("favorites")

    // Load favorites from localStorage
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const favoritesData = localStorage.getItem('favorites')
                if (favoritesData) {
                    const parsedFavorites = JSON.parse(favoritesData)
                    const products = parsedFavorites.map((item: { id: number; product: Product }) => item.product)
                    setFavorites(products)
                }
            } catch (error) {
                console.error('Failed to load favorites from localStorage', error)
            } finally {
                setIsLoading(false)
            }
        }
    }, [])

    // Listen for storage changes to update favorites when they're modified in other tabs
    React.useEffect(() => {
        const handleStorageChange = () => {
            if (typeof window !== 'undefined') {
                try {
                    const favoritesData = localStorage.getItem('favorites')
                    if (favoritesData) {
                        const parsedFavorites = JSON.parse(favoritesData)
                        const products = parsedFavorites.map((item: { id: number; product: Product }) => item.product)
                        setFavorites(products)
                    } else {
                        setFavorites([])
                    }
                } catch (error) {
                    console.error('Failed to load favorites from localStorage', error)
                }
            }
        }

        // Listen for both storage events (other tabs) and custom events (same tab)
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('favoritesChanged', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('favoritesChanged', handleStorageChange)
        }
    }, [])
    return (
        <section className="w-full py-9">
            <Container>
                <div className="flex flex-col gap-4 mb-6">
                    <h1 className="text-[28px] md:text-[32px] font-medium text-foreground">{t("favorites")}</h1>

                    <div className="flex flex-col md:flex-row justify-between gap-3 w-full md:w-auto items-center">
                        <div className="flex gap-3">
                            <Select>
                                <SelectTrigger className="h-10 rounded-[8px] border-[#D3D4D6]">
                                    <SelectValue placeholder={t("category")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t("all_categories")}</SelectItem>
                                    <SelectItem value="perfume">{t("perfume")}</SelectItem>
                                    <SelectItem value="cosmetics">{t("cosmetics")}</SelectItem>
                                    <SelectItem value="skincare">{t("skin_care")}</SelectItem>
                                    <SelectItem value="haircare">{t("hair_care")}</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="h-10 rounded-[8px] border-[#D3D4D6] text-black">
                                    <SelectValue className="text-black" placeholder={t("brand")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t("all_brands")}</SelectItem>
                                    <SelectItem value="ysl">Yves Saint Laurent</SelectItem>
                                    <SelectItem value="chanel">Chanel</SelectItem>
                                    <SelectItem value="dior">Dior</SelectItem>
                                    <SelectItem value="gucci">Gucci</SelectItem>
                                    <SelectItem value="tom-ford">Tom Ford</SelectItem>
                                </SelectContent>
                            </Select>

                            <label className="h-9 text-sm flex items-center gap-2 text-primary border border-[#D3D4D6] rounded-[8px] p-2">
                                <Checkbox /> {t("in_stock")}
                            </label>
                        </div>

                        <div className="relative">
                            <Input
                                type="text"
                                placeholder={t("search")}
                                className="pl-4 w-[381px] pr-12 h-12 py-4 border border-gray-300 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                            <Button
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 p-0 hover:bg-gray-800"
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-gray-600">{t("loading")}</p>
                        </div>
                    </div>
                ) : favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {favorites.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg
                                className="w-12 h-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{t("no_favorites")}</h3>
                        <p className="text-gray-600 mb-6">{t("no_favorites_description")}</p>
                        <Link
                            href="/products"
                            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                            {t("products")}
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    )
}