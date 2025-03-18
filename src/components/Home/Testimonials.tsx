"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/Button';

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Customer",
      content:
        "I've been shopping here for years and the quality never disappoints. The customer service is exceptional and delivery is always on time. Highly recommend!",
      rating: 5,
      image: "/images/avatar.webp",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Customer",
      content:
        "Found exactly what I was looking for at a great price. The website is easy to navigate and checkout was seamless. Will definitely be shopping here again.",
      rating: 4,
      image: "/images/avatar.webp",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Verified Customer",
      content:
        "The products are high quality and arrived earlier than expected. The packaging was also eco-friendly which I really appreciate. Great experience overall!",
      rating: 5,
      image: "/images/avatar.webp",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Verified Customer",
      content:
        "Excellent selection of products and the prices are competitive. I had a small issue with my order but their support team resolved it immediately. Very impressed!",
      rating: 4,
      image: "/images/avatar.webp",
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      role: "Verified Customer",
      content:
        "This has become my go-to online store. The website is intuitive, shipping is fast, and the products are exactly as described. Couldn't ask for more!",
      rating: 5,
      image: "/images/avatar.webp",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = { mobile: 1, tablet: 2, desktop: 3 }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Don not just take our word for it. Here is what our customers have to say about their shopping experience.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Customer Reviews</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous testimonial">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next testimonial">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage.desktop)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full min-w-full md:min-w-[50%] md:w-1/2 lg:min-w-[33.333%] lg:w-1/3 px-3"
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-gray-300"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

