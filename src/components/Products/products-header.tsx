"use client"

import { ShoppingBag } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShoppingBag className="h-8 w-8" />
          Products
        </h1>
        <p className="text-muted-foreground mt-1">Browse our collection of quality products</p>
      </div>

      <div className="w-full sm:w-auto">
        <form>
          <input
            type="hidden"
            name="category"
            value={
              typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("category") || "" : ""
            }
          />
          <Select
            name="sort"
            defaultValue={
              typeof window !== "undefined"
                ? new URLSearchParams(window.location.search).get("sort") || "default"
                : "default"
            }
            onValueChange={(value) => {
              const url = new URL(window.location.href)
              url.searchParams.set("sort", value)
              window.location.href = url.toString()
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </form>
      </div>
    </div>
  )
}

