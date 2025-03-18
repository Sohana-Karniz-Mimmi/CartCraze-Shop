import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProduct } from "@/types/products";
import { Button } from "../ui/Button";
import { ShoppingCart, Star } from "lucide-react";

// Fetch related products from the Fake Store API
async function getRelatedProducts(
  currentProductId: number,
  category: string
): Promise<IProduct[]> {
  try {
    // Fetch all products
    const response = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products: IProduct[] = await response.json();

    // Filter products by category and exclude current product
    return products
      .filter(
        (product) =>
          product.category === category && product.id !== currentProductId
      )
      .slice(0, 4); // Limit to 4 related products
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export default async function RelatedProducts({
  currentProductId,
  category,
}: {
  currentProductId: number;
  category: string;
}) {
  const relatedProducts = await getRelatedProducts(currentProductId, category);

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No related products found.
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => {
        // For half stars
        const filled = i < Math.floor(rating);
        const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5;

        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              filled
                ? "fill-yellow-400 text-yellow-400"
                : halfFilled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        );
      });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {relatedProducts.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-square relative p-4 bg-white">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
            
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-1">
                {product.category}
              </div>
              <Link
                href={`/products/${product.id}`}
                className="hover:underline"
              >
                <h3 className="font-medium text-base mb-1 line-clamp-1">
                  {product?.title}
                </h3>
              </Link>

              <div className="flex items-center gap-1 mb-2">
                {renderStars(product?.rating?.rate || 0)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.rating?.count})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  ${product.price.toFixed(2)}
                </span>
                {product.price && (
                  <span className="text-muted-foreground line-through text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
