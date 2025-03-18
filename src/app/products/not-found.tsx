import Link from "next/link"

import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Product Not Found</h1>
      <p className="mt-4 text-muted-foreground">We could not find the product you were looking for.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}

