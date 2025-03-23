"use client";

import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="min-h-[77vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-300 mb-6">404</h1>

        <h2 className="text-2xl font-bold mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, the page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try again
          </button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
