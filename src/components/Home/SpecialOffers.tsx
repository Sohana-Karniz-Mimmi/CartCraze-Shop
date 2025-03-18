"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Offer {
  id: string
  title: string
  description: string
  discount: string
  image: string
  expiryDate: Date
  link: string
  code?: string
  badgeText?: string
}

export default function SpecialOffers() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const offers: Offer[] = [
    {
      id: "summer-sale",
      title: "Summer Sale",
      description: "Get up to 50% off on summer essentials. Limited time offer.",
      discount: "Up to 50% Off",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      link: "/sale/summer",
      code: "SUMMER50",
      badgeText: "Limited Time",
    },
    {
      id: "new-arrivals",
      title: "New Arrivals",
      description: "Discover our latest products with 15% off your first purchase.",
      discount: "15% Off",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      link: "/new-arrivals",
      code: "NEWITEM15",
      badgeText: "New Collection",
    },
    {
      id: "free-shipping",
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders over $50. No code needed.",
      discount: "Free Shipping",
      image: "/placeholder.svg?height=400&width=600",
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      link: "/shipping-info",
      badgeText: "Ongoing Offer",
    },
  ]

  // Calculate time remaining for the first offer (main offer)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = offers[0].expiryDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTimeUnit = (value: number) => {
    return value < 10 ? `0${value}` : value
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
            <p className="text-muted-foreground mt-1">Limited time deals you don not want to miss</p>
          </div>
          <Button asChild variant="link" className="p-0 h-auto mt-2 md:mt-0">
            <Link href="/offers" className="flex items-center">
              View all offers
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Offer (Larger) */}
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="relative aspect-[16/9] lg:aspect-[2/1]">
              <Image src={offers[0].image || "/placeholder.svg"} alt={offers[0].title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                <div className="p-6 md:p-8 text-white max-w-md">
                  {offers[0].badgeText && (
                    <Badge className="bg-primary hover:bg-primary mb-3">{offers[0].badgeText}</Badge>
                  )}
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{offers[0].title}</h3>
                  <p className="text-white/80 mb-3">{offers[0].description}</p>
                  <div className="text-xl md:text-2xl font-bold mb-4">{offers[0].discount}</div>

                  {offers[0].code && (
                    <div className="mb-4">
                      <div className="text-sm mb-1">Use code at checkout:</div>
                      <div className="bg-white/20 backdrop-blur-sm text-white py-1.5 px-3 rounded-md font-mono inline-block">
                        {offers[0].code}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Offer ends in:</span>
                    </div>
                    <div className="flex gap-2 text-center">
                      <div className="bg-black/30 backdrop-blur-sm rounded-md p-2 w-16">
                        <div className="text-xl font-bold">{formatTimeUnit(timeLeft.days)}</div>
                        <div className="text-xs text-white/70">Days</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-md p-2 w-16">
                        <div className="text-xl font-bold">{formatTimeUnit(timeLeft.hours)}</div>
                        <div className="text-xs text-white/70">Hours</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-md p-2 w-16">
                        <div className="text-xl font-bold">{formatTimeUnit(timeLeft.minutes)}</div>
                        <div className="text-xs text-white/70">Mins</div>
                      </div>
                      <div className="bg-black/30 backdrop-blur-sm rounded-md p-2 w-16">
                        <div className="text-xl font-bold">{formatTimeUnit(timeLeft.seconds)}</div>
                        <div className="text-xs text-white/70">Secs</div>
                      </div>
                    </div>

                    <Button asChild className="mt-2 w-full sm:w-auto">
                      <Link href={offers[0].link}>Shop Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Secondary Offers (Smaller) */}
          <div className="flex flex-col gap-6">
            {offers.slice(1).map((offer) => (
              <Card key={offer.id} className="overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center">
                    <CardContent className="text-white">
                      {offer.badgeText && <Badge className="bg-primary hover:bg-primary mb-2">{offer.badgeText}</Badge>}
                      <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
                      <p className="text-white/80 text-sm mb-2">{offer.description}</p>
                      <div className="text-lg font-bold mb-3">{offer.discount}</div>

                      {offer.code && (
                        <div className="mb-3">
                          <div className="text-xs mb-1">Use code:</div>
                          <div className="bg-white/20 backdrop-blur-sm text-white py-1 px-2 rounded-md font-mono text-sm inline-block">
                            {offer.code}
                          </div>
                        </div>
                      )}

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                      >
                        <Link href={offer.link}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

