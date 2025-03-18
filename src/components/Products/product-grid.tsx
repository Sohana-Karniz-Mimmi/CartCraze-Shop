import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react"
import { IProduct } from "@/types/products"
import { Button } from "../ui/Button"

interface ProductGridProps {
  products: IProduct[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try changing your filters or check back later for new products.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {products.map((product) => (
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
              <h3 className="font-medium line-clamp-1">{product.title}</h3>
              <div className="flex items-center gap-1 mt-2">
                <div className="text-sm text-primary font-medium">${product.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                <span>{product.rating.rate}</span>
                <span className="mx-1">•</span>
                <span>{product.rating.count} reviews</span>
              </div>
              <div className="w-full">
                <div className="text-xs text-muted-foreground capitalize">{product.category}</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />Add to Cart
                  </Button>
                </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

