import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex justify-center">
          <Skeleton className="w-full max-w-md aspect-square rounded-lg" />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4" />
            <div className="mt-2 flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-24 mt-4" />
          </div>

          <div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>

          <Skeleton className="h-4 w-32" />

          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <Skeleton className="h-px w-full" />

          <div>
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full my-8" />

      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="w-full aspect-square" />
            <div className="p-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24 mt-2" />
              <Skeleton className="h-4 w-16 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

