export interface ApiResponse<T> {
    status: string;
    message: string;
    meta: {
      current_page: number | undefined;
      last_page: number;
      per_page: number;
      total: number;
    };
    links: {
      first: string;
      last: string;
      prev: string;
      next: string;
    };
    data: T;
  }

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