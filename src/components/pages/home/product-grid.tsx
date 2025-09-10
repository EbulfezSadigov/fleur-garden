import Container from "@/components/shared/container"
import ProductCard from "./product-card"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { Product } from "@/types"

export default async function ProductGrid({ products }: { products: Product[] }) {
    const t = await getTranslations("product_grid")
    return (
        <Container className="py-[72px]">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h1 className="text-4xl font-medium text-primary">{t("title")}</h1>
                <nav className="flex items-center gap-6">
                    <button className="text-primary font-medium relative flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{t("all")}</span>
                    </button>
                    <button className="text-gray-500 hover:text-primary transition-colors">{t("discount")}</button>
                    <button className="text-gray-500 hover:text-primary transition-colors">{t("new")}</button>
                    <button className="text-gray-500 hover:text-primary transition-colors">{t("on_sale")}</button>
                </nav>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
                <Link href="/products" className="border border-black text-sm text-primary px-8 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
                    {t("more")}
                </Link>
            </div>
        </Container>
    )
}
