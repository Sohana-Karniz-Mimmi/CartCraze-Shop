import { Star } from "lucide-react"

interface ProductRatingProps {
  rating: number
}

export default function ProductRating({ rating }: ProductRatingProps) {
  // Convert rating to nearest half star
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-primary text-primary" />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 text-muted-foreground" />
          <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
            <Star className="w-4 h-4 fill-primary text-primary" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground" />
      ))}
    </div>
  )
}

