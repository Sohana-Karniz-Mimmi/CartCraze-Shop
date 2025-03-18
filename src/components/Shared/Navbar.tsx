"use client"

import { useState } from "react"
import Link from "next/link"
import {  ShoppingBag, User, Menu, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Sample cart items count - replace with your actual cart state
  const cartItemsCount = 3

  const categories = [
    { name: "Electronics", href: "/categories/electronics" },
    { name: "Clothing", href: "/categories/clothing" },
    { name: "Home & Kitchen", href: "/categories/home-kitchen" },
    { name: "Sports & Outdoors", href: "/categories/sports" },
    { name: "Beauty", href: "/categories/beauty" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold hidden sm:inline-block">CartCraze</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>

            <Link href="/products" className="text-sm font-medium hover:text-primary">
              All Products
            </Link>

            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>

            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
         

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild aria-label="Wishlist">
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild aria-label="Account">
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" asChild aria-label="Shopping cart">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-[10px]">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                Home
              </Link>

              <div className="px-3 py-2 text-sm font-medium">Categories</div>
              <div className="pl-3 flex flex-col gap-1 mb-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="px-3 py-1.5 text-sm rounded-md hover:bg-accent"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href="/categories"
                  className="px-3 py-1.5 text-sm rounded-md hover:bg-accent text-muted-foreground"
                  onClick={toggleMenu}
                >
                  View All Categories
                </Link>
              </div>

              <Link
                href="/products"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                All Products
              </Link>

              <Link
                href="/sale"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                Sale
              </Link>

              <Link
                href="/about"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                Contact
              </Link>

              <div className="border-t my-2"></div>

              <Link
                href="/account"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                <User className="h-4 w-4" />
                My Account
              </Link>

              <Link
                href="/wishlist"
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                onClick={toggleMenu}
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </Link>

              
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}





// import Link from 'next/link';

// const Navbar = () => {
//   return (
//     <nav className="bg-blue-600 p-4 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold">
//           MyStore
//         </Link>

//         {/* Navigation Links */}
//         <ul className="flex space-x-6">
//           <li>
//             <Link href="/" className="hover:text-gray-200">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/products" className="hover:text-gray-200">
//               Products
//             </Link>
//           </li>
//           <li>
//             <Link href="/cart" className="hover:text-gray-200">
//               Cart
//             </Link>
//           </li>
//           <li>
//             <Link href="/about" className="hover:text-gray-200">
//               About
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;