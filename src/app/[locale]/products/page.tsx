import Container from "@/components/shared/container"
import ProductCard from "@/components/pages/home/product-card"
import FilterSidebar from "@/components/pages/products/filter-sidebar"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { getTranslations } from "next-intl/server"

interface Product {
    id: number
    name: string
    brand: string
    price: string
    rating: number
    inStock: boolean
    image: string
}

const products: Product[] = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    name: "YSL LIBRE",
    brand: "Yves Saint Laurent",
    price: "347 AZN",
    rating: 4.5,
    inStock: true,
    image: "/images/product.jpg",
}))

export default async function ProductsPage() {
    const t = await getTranslations("product_grid")
    return (
        <section className="w-full py-9">
            <Container>
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">
                                {t("home")}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <g clipPath="url(#clip0_295_2185)">
                                <path d="M11.3333 3.3335L4.66663 12.6668" stroke="#D3D3D7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_295_2185">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-foreground font-medium">Qadın parfümləri</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-6">
                    <FilterSidebar />

                    <div className="space-y-6 md:col-span-3">
                        <h1 className="text-[28px] md:text-[32px] font-semibold text-foreground mb-2">Qadın parfümləri</h1>
                        <p className="text-sm text-[#77777B] mb-6">72 {t("products_found")}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="flex justify-center pt-2">
                            <button className="px-8 py-2 border border-black rounded-md text-primary text-sm bg-transparent">
                                {t("more")}
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
