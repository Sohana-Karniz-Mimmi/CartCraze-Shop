"use client"

import { ShoppingCart } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/Button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IProduct } from "@/types/products"


export default function AddToCartButton({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState("1")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call to add item to cart
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Here you would add your actual cart logic
    console.log(`Added ${quantity} of ${product.title} to cart`)

    // You could also use localStorage to store cart items
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += Number.parseInt(quantity)
    } else {
      cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: Number.parseInt(quantity),
      })
    }

    localStorage.setItem("cart", JSON.stringify(cartItems))

    setIsAdding(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={quantity} onValueChange={setQuantity} disabled={isAdding}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Qty" />
        </SelectTrigger>
        <SelectContent>
          {[...Array(10)].map((_, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleAddToCart} disabled={isAdding} className="flex-1">
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAdding ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}

