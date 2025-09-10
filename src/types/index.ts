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

// Auth
export interface AuthUserInfo {
    name: string
    email: string
    mobile: string
    sv: number
    token_type: string
}

export interface AuthLoginResponse {
    data: {
        token: string
        user: AuthUserInfo
    }
    message: string
}

export interface AuthRegisterResponse {
    remark: string
    status: string
    data: {
        access_token: string
        name: string
        email: string
        sv: number
        token_type: string
    }
}

export interface Product {
    id: number,
    name: string,
    discount: number | null,
    slug: string,
    code: string,
    price: number,
    stock: number,
    image: string,
    thumb_image: string,
    category_name: string,
    category_slug: string,
    brand_name: string,
    brand_slug: string,
    star: number
}

export interface ProductCardProps {
    product: Product
}

export interface User {
    name: string
    email: string
    mobile: string
    password: string
}

// Payload for updating basic user profile information
export interface UpdateUserPayload {
    name: string
    email: string
    mobile: string
}

export interface Review {
    id: number
    name: string
    date: string
    comment: string
    rating: number
    image: string
}

export interface Brand {
    id: number
    name: string
    slug: string
}

export interface Category {
    id: number
    name: string
    slug: string
    category:{
        id: number
        name: string
        slug: string
    }[]
}