"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IProduct } from "@/types/products";
import { toast } from "sonner";

const ProductCard = ({ products }: { products: IProduct[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);
  const toggleWishlist = (productId: string) => {
    setWishlistedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  };
  const maxIndex = products.length - itemsPerView.desktop;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

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

  const handleAddToCart = async (userId: number) => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          date: new Date().toISOString().split("T")[0],
          products: [{ userId, quantity: 1 }],
        }),
      });

      const data = await response.json();
      toast.success("Added successfully");
      console.log("Cart Response:", data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end mb-8">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Next products"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full min-w-full sm:min-w-[calc(50%-12px)] sm:w-1/2 lg:min-w-[calc(25%-18px)] lg:w-1/5 flex-shrink-0"
            >
              <Card className="h-full overflow-hidden group">
                <Link href={`products/${product?.id}`}>
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product?.title || "product"}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          New
                        </Badge>
                      )}
                      {product.isSale && product.price && (
                        <Badge className="bg-red-500 hover:bg-red-600">
                          {Math.round(
                            ((product.price - product.price) / product.price) *
                              100
                          )}
                          % Off
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                      onClick={() => toggleWishlist(String(product.id))}
                      aria-label={
                        wishlistedItems.includes(String(product.id))
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlistedItems.includes(String(product.id))
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>
                </Link>

                <Link href={`products/${product?.id}`}>
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
                </Link>

                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={() => handleAddToCart(product?.id)}
                    className="w-full"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
