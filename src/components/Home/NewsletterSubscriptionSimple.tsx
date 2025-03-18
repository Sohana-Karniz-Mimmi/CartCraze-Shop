"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"

export default function NewsletterSubscriptionSimple() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Get 10% off your first order and stay updated with our latest offers and products.
          </p>

          {isSubscribed ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">Thank You for Subscribing!</h3>
              <p className="text-muted-foreground">
                Your subscription has been confirmed. You'll start receiving our newsletters soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="text-xs text-muted-foreground mt-2">
                By subscribing, you agree to our{" "}
                <a href="/privacy-policy" className="underline hover:text-primary">
                  Privacy Policy
                </a>
                . You can unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

