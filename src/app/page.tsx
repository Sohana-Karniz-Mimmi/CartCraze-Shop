import Hero from "@/components/Home/Hero";
import NewsletterSubscriptions from "@/components/Home/NewsletterSubscriptions";
import ProductCardSkeleton from "@/components/Home/ProductCardSkeleton";
import Products from "@/components/Home/Products";
// import SpecialOffers from "@/components/Home/SpecialOffers";
import Testimonials from "@/components/Home/Testimonials";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { getPageMetaData } from "@/utils/meta";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = getPageMetaData("CartCraze");
export default function Home() {
  return (
    <div>
      <Hero />
      <ErrorBoundary fallback={<div>error components</div>}>
        <Suspense fallback={<ProductCardSkeleton />}>
          <Products />
        </Suspense>
      </ErrorBoundary>
      {/* <SpecialOffers /> */}
      <Testimonials />
      <NewsletterSubscriptions />
    </div>
  );
}
