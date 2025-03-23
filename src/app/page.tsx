import Hero from "@/components/Home/Hero";
import NewsletterSubscriptionSimple from "@/components/Home/NewsletterSubscriptionSimple";
import Products from "@/components/Home/Products";
// import SpecialOffers from "@/components/Home/SpecialOffers";
import Testimonials from "@/components/Home/Testimonials";
import { getPageMetaData } from "@/utils/meta";
import { Metadata } from "next";
export const metadata: Metadata = getPageMetaData("CartCraze");
export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      {/* <SpecialOffers /> */}
      <Testimonials />
      <NewsletterSubscriptionSimple />
    </div>
  );
}
