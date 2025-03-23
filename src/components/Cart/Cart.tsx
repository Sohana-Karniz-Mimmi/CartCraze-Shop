"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export default function Cart() {
  // Sample cart data - replace with your actual cart state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 129.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      color: "Black",
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      color: "White",
      size: "Medium",
    },
    {
      id: "3",
      name: "Smart Fitness Watch",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      color: "Blue",
    },
  ]);

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal;

  // Handle quantity changes
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 mb-6 text-muted-foreground">
            <ShoppingBag className="w-full h-full" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Looks like you haven&apos;t added anything to your cart yet. Browse
            our products and find something you&apos;ll love.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 md:px-6 py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <Separator className="mb-6 hidden md:block" />

              {/* Cart Items List */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid md:grid-cols-12 gap-4 items-center"
                  >
                    {/* Product Image & Info */}
                    <div className="md:col-span-6">
                      <div className="flex gap-4 items-center">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.color && <span>Color: {item.color}</span>}
                            {item.size && (
                              <span className="ml-2">Size: {item.size}</span>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-700 flex items-center mt-2 md:hidden"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 md:text-center">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">
                        Price:
                      </div>
                      ${item?.price?.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 md:text-center">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">
                        Quantity:
                      </div>
                      <div className="flex items-center md:justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-3 w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 md:text-right">
                      <div className="md:hidden text-sm text-muted-foreground mb-1">
                        Total:
                      </div>
                      <div className="font-medium">
                        {/* ${formatPrice(item.price * item.quantity)} */}$
                        {(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 hidden md:flex items-center justify-end mt-2"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>

                    <div className="md:col-span-12">
                      <Separator className="mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-muted/50 rounded-b-lg">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <Button variant="outline" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-4 bg-muted/50 rounded-b-lg">
              <Button className="w-full" size="lg">
                Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-sm">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                <Link href="/shipping" className="hover:text-primary">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
