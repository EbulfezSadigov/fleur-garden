import { queryOptions } from "@tanstack/react-query";
import { getBrands, getCategories, getProduct, getProductReviews, getProducts, getRelatedProducts, searchProducts } from "./api";

const getProductsQuery = (locale: string, number?: number) => {
    return queryOptions({
        queryKey: ["products"],
        queryFn: () => getProducts(locale, number),
    });
};

const getSearchProductsQuery = (query: string) => {
    return queryOptions({
        queryKey: ["search-products", query],
        queryFn: () => searchProducts(query),
    });
};

const getProductQuery = (locale: string, slug: string) => {
    return queryOptions({
        queryKey: ["product", slug],
        queryFn: () => getProduct(locale, slug),
    });
};

const getRelatedProductsQuery = (locale: string, category_slug: string) => {
    return queryOptions({
        queryKey: ["related-products", category_slug],
        queryFn: () => getRelatedProducts(locale, category_slug),
    });
};

const getProductReviewsQuery = (locale: string, slug: string) => {
    return queryOptions({
        queryKey: ["product-reviews", slug],
        queryFn: () => getProductReviews(locale, slug),
    });
};

const getBrandsQuery = () => {
    return queryOptions({
        queryKey: ["brands"],
        queryFn: () => getBrands(),
    });
};

const getCategoriesQuery = () => {
    return queryOptions({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });
};

export {
    getProductsQuery,
    getSearchProductsQuery,
    getProductQuery,
    getRelatedProductsQuery,
    getProductReviewsQuery,
    getBrandsQuery,
    getCategoriesQuery,
};