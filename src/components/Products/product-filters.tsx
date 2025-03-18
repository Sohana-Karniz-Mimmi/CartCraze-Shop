"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ProductFiltersProps {
  categories: string[]
  selectedCategory?: string
}

export default function ProductFilters({ categories, selectedCategory }: ProductFiltersProps) {
  const router = useRouter()

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(window.location.search)

    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-all"
              checked={!selectedCategory || selectedCategory === "all"}
              onCheckedChange={() => handleCategoryChange("all")}
            />
            <Label htmlFor="category-all" className="text-sm font-medium capitalize cursor-pointer">
              All Products
            </Label>
          </div>

          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategory === category}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm font-medium capitalize cursor-pointer">
                {category.replace("'", "")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            const params = new URLSearchParams()
            router.push(`/products?${params.toString()}`)
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

