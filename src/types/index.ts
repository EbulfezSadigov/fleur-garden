export interface Product {
    id: number
    name: string
    brand: string
    price: string
    rating: number
    inStock: boolean
    image: string
}

export interface ProductCardProps {
    product: Product
}