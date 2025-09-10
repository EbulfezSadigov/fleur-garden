import { get, post } from "@/lib/api";
import { ApiResponse, Brand, Category, Product, Review } from "@/types";

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

const addComment = async (data: Review) => {
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

export {
  getProducts,
  getProduct,
  getRelatedProducts,
  getProductReviews,
  addComment,
  getBrands,
  getCategories,
  searchProducts,
};