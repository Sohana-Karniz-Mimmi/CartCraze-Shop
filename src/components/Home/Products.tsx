"use server";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import ProductCard from "./ProductCard";

export default async function Products() {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const products = await res.json();

  return (
    <section className="my-12 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center my-3">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <ProductCard products={products} />

        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
