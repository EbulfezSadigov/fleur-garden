import { get, post } from "@/lib/api";
import { ApiResponse, Brand, Category, FilterProductsPayload, Product, Review, CreateReviewPayload } from "@/types";

const getProducts = async (locale: string, number?: number) => {
  const endpoint = number ? `products/${number}` : "products";
  const products = await get<ApiResponse<Product[]>>(endpoint, {
    params: { locale },
  });
  return products;
};

const getProduct = async (locale: string, slug: string) => {
  const product = await get<ApiResponse<Product>>(`product/${slug}`, {
    params: { locale },
  });
  return product;
};

const getRelatedProducts = async (locale: string, category_slug: string) => {
  const products = await get<ApiResponse<Product[]>>(`relational-products/${category_slug}`, {
    params: { locale },
  });
  return products;
};

const getProductReviews = async (locale: string, slug: string) => {
  const reviews = await get<ApiResponse<Review[]>>(`comments/${slug}`, {
    params: { locale },
  });
  return reviews;
};

const addComment = async (data: CreateReviewPayload) => {
  const response = await post<ApiResponse<Review>>(`comment`, {
    data,
  });
  return response;
};

const getBrands = async () => {
  const brands = await get<ApiResponse<Brand[]>>(`brands`);
  return brands;
};

const getCategories = async () => {
  const categories = await get<ApiResponse<Category[]>>(`categories`);
  return categories;
};

const searchProducts = async (search: string) => {
  const products = await get<ApiResponse<Product[]>>(`search`, {
    params: { search },
  });
  return products;
};

const filterProducts = async (data: FilterProductsPayload, page?: number) => {
  const formData = new FormData();

  // Only append non-zero values to reduce payload
  if (data.brand_id > 0) formData.append("brand_id", String(data.brand_id));
  if (data.category_id > 0) formData.append("category_id", String(data.category_id));
  if (data.min_price > 0) formData.append("min_price", String(data.min_price));
  if (data.max_price < 5600) formData.append("max_price", String(data.max_price));
  if (data.stock > 0) formData.append("stock", String(data.stock));
  if (data.type > 0) formData.append("type", String(data.type));

  const products = await post<ApiResponse<Product[]>>(`filter`, formData, {
    params: page ? { page } : undefined,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return products;
};

export {
  getProducts,
  getProduct,
  getRelatedProducts,
  getProductReviews,
  addComment,
  getBrands,
  getCategories,
  searchProducts,
  filterProducts,
};