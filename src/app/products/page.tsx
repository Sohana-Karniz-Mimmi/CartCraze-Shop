import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ProductsHeader from "@/components/Products/products-header";
import ProductFilters from "@/components/Products/product-filters";
import ProductGrid from "@/components/Products/product-grid";

// Define the product interface
export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Fetch all products from the Fake Store API
async function getProducts(): Promise<IProduct[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch all categories from the Fake Store API
async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getProducts();
  const categories = await getCategories();

  // Get filter and sort parameters from URL
  const category =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : undefined;

  // Filter products by category if specified
  const filteredProducts =
    category && category !== "all"
      ? products.filter((product) => product.category === category)
      : products;

  // Sort products based on sort parameter
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating.rate - a.rating.rate;
      default:
        // Default sort by id (as returned by the API)
        return a.id - b.id;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductsHeader />

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <ProductFilters categories={categories} selectedCategory={category} />
        </aside>

        <main>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={sortedProducts} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border rounded-lg overflow-hidden">
          <Skeleton className="w-full aspect-square" />
          <div className="p-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-24 mt-2" />
            <Skeleton className="h-4 w-16 mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
