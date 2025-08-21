import { ProductCarousel } from "@/components/pages/home/banner";
import { CarouselWithReviews } from "@/components/pages/home/carousel-reviews";
import { BrandCarousel } from "@/components/pages/home/brand-carousel";
import ProductGrid from "@/components/pages/home/product-grid";
import { BlogSection } from "@/components/pages/home/blog-section";
import { NewsletterSubscribe } from "@/components/pages/home/newsletter-subscribe";
import HeroBanner from "@/components/pages/home/hero-banner";

export default function Home() {
  return (
    <div>
      <ProductCarousel />
      <BrandCarousel />
      <ProductGrid />
      <HeroBanner title="HR-vakansiyaları" imageSrc="/images/banner.jpg" />
      <BlogSection />
      <CarouselWithReviews />
      <NewsletterSubscribe />
    </div>
  );
}
