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

export default async function Home() {
  const locale = await getServerLocale();
  const queryClient = getServerQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getSlidersQuery()), 
    queryClient.prefetchQuery(getBannersQuery(locale)),
    queryClient.prefetchQuery(getPartnersQuery(locale))
  ]);
  const data = queryClient.getQueryData(getSlidersQuery().queryKey);
  const banners = queryClient.getQueryData(getBannersQuery(locale).queryKey);
  const partnersData = queryClient.getQueryData(getPartnersQuery(locale).queryKey);
  const sliders = data?.data;
  const banner = banners?.data;
  const partners = partnersData?.data;

  return (
    <div>
      <ProductCarousel sliders={sliders || []} />
      <BrandCarousel partners={partners || []} />
      <ProductGrid />
      {banner ? <HeroBanner banner={banner} /> : null}  
      <BlogSection />
      <CarouselWithReviews />
      <NewsletterSubscribe />
    </div>
  );
}
