import { ProductCarousel } from "@/components/pages/home/banner";
import { CarouselWithReviews } from "@/components/pages/home/carousel-reviews";
import { BrandCarousel } from "@/components/pages/home/brand-carousel";
import ProductGrid from "@/components/pages/home/product-grid";
import { BlogSection } from "@/components/pages/home/blog-section";
import { NewsletterSubscribe } from "@/components/pages/home/newsletter-subscribe";
import HeroBanner from "@/components/pages/home/hero-banner";
import { getSlidersQuery, getBannersQuery, getPartnersQuery } from "@/services/home/queries";
import { getServerLocale } from "@/lib/utils";
import { getServerQueryClient } from "@/providers/server";
import { getBlogsQuery } from "@/services/blogs/queries";
import { getProductsQuery } from "@/services/products/queries";

export default async function Home() {
  const locale = await getServerLocale();
  const queryClient = getServerQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getSlidersQuery()), 
    queryClient.prefetchQuery(getBannersQuery(locale)),
    queryClient.prefetchQuery(getPartnersQuery(locale)),
    queryClient.prefetchQuery(getBlogsQuery(locale)),
    queryClient.prefetchQuery(getProductsQuery(locale))
  ]);
  const data = queryClient.getQueryData(getSlidersQuery().queryKey);
  const banners = queryClient.getQueryData(getBannersQuery(locale).queryKey);
  const partnersData = queryClient.getQueryData(getPartnersQuery(locale).queryKey);
  const blogPostsData = queryClient.getQueryData(getBlogsQuery(locale).queryKey);
  const productsData = queryClient.getQueryData(getProductsQuery(locale).queryKey);
  const sliders = data?.data;
  const banner = banners?.data;
  const partners = partnersData?.data;
  const blogPosts = blogPostsData?.data;
  const products = productsData?.data;

  console.log(products)
  return (
    <div>
      <ProductCarousel sliders={sliders || []} />
      <BrandCarousel partners={partners || []} />
      <ProductGrid products={products || []} />
      {banner ? <HeroBanner banner={banner} /> : null}  
      <BlogSection blogPosts={blogPosts || []} />
      <CarouselWithReviews />
      <NewsletterSubscribe />
    </div>
  );
}
