import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: {
    default: "CartCraze",
    template: "%s | CartCraze - Your Marketplace for Bulk Products",
  },
  description:
    "CartCraze - Your Ultimate Destination for Trendy Shopping! Explore a wide range of products, from fashion to electronics, all in one place. Enjoy seamless browsing, secure payments, and fast delivery. Shop smarter, shop happier with CartCraze!",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CartCraze - Your Marketplace for Bulk Products",
    description:
      "CartCraze - Your Ultimate Destination for Trendy Shopping! Explore a wide range of products, from fashion to electronics, all in one place. Enjoy seamless browsing, secure payments, and fast delivery. Shop smarter, shop happier with CartCraze!",
    url: "https://www.CartCraze.com",
    siteName: "CartCraze",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "CartCraze - Your Marketplace for Bulk Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-center" richColors={true} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
