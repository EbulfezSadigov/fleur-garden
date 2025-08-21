import Container from "@/components/shared/container"
import ProductCard from "./product-card"

interface Product {
    id: number
    name: string
    brand: string
    price: string
    rating: number
    inStock: boolean
    image: string
}

const products: Product[] = [
    {
        id: 1,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 2,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 3,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 4,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 5,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 6,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 7,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
    {
        id: 8,
        name: "YSL LIBRE",
        brand: "Yves Saint Laurent",
        price: "347 AZN",
        rating: 4.5,
        inStock: true,
        image: "/images/product.jpg",
    },
]

export default function ProductGrid() {
    return (
        <Container className="py-[72px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-medium text-primary">Ən Çox Satılanlar</h1>
                <nav className="flex items-center gap-6">
                    <button className="text-primary font-medium relative flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Hamısı</span>
                    </button>
                    <button className="text-gray-500 hover:text-primary transition-colors">Endirim</button>
                    <button className="text-gray-500 hover:text-primary transition-colors">Ən Yeni</button>
                    <button className="text-gray-500 hover:text-primary transition-colors">Ona Çıxanlar</button>
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
                <button className="border border-black text-sm text-primary px-8 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors">
                    Daha çox
                </button>
            </div>
        </Container>
    )
}
