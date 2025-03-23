"use client";

import { Skeleton } from "@/components/ui/skeleton"; 

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Navigation Buttons Skeleton */}
      <div className="flex items-center justify-end mb-8">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Product Cards Skeleton */}
      <div className="relative overflow-hidden">
        <div className="flex gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-full min-w-full sm:min-w-[calc(50%-12px)] sm:w-1/2 lg:min-w-[calc(25%-18px)] lg:w-1/5 flex-shrink-0"
            >
              <div className="h-full overflow-hidden group">
                {/* Image Skeleton */}
                <Skeleton className="aspect-square w-full" />

                {/* Badges Skeleton */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>

                {/* Wishlist Button Skeleton */}
                <Skeleton className="absolute top-2 right-2 h-10 w-10 rounded-full" />
              </div>

              {/* Content Skeleton */}
              <div className="p-4">
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-5 w-1/3 mb-2" />
              </div>

              {/* Footer Skeleton */}
              <div className="p-4 pt-0">
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;