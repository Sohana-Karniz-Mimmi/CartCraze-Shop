"use client"

import type React from "react"

import { useState } from "react"
import { Check, Mail } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewsletterSubscription() {
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
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Stay updated with our latest products, exclusive offers, and helpful tips. Subscribe now and get 10% off
              your first order.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <span>Exclusive deals and discounts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <span>New product announcements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <span>Seasonal sales notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <span>Helpful tips and product guides</span>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Join Our Mailing List</CardTitle>
                <CardDescription>Get 10% off your first order when you subscribe</CardDescription>
              </CardHeader>
              <CardContent>
                {isSubscribed ? (
                  <div className="flex flex-col items-center text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Thank You for Subscribing!</h3>
                    <p className="text-muted-foreground">
                      Your subscription has been confirmed. You will start receiving our newsletters soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-9"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex flex-col items-start text-xs text-muted-foreground">
                <p>
                  By subscribing, you agree to our{" "}
                  <a href="/privacy-policy" className="underline hover:text-primary">
                    Privacy Policy
                  </a>{" "}
                  and consent to receive marketing communications from us.
                </p>
                <p className="mt-1">
                  You can unsubscribe at any time by clicking the unsubscribe link in the footer of our emails.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

