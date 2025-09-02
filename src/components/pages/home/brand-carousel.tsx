"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const brands = ["seluz", "Givaudan", "NINO", "ZINE", "MAX", "flow", "Givaudan", "InTre"]

export function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth

    let scrollPosition = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      scrollPosition += speed

      // Reset position when we've scrolled past half the content
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="w-full overflow-hidden bg-background py-8">
      <div
        ref={scrollRef}
        className="flex gap-16 overflow-hidden"
        style={{
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Duplicate the brands array to create seamless loop */}
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className={cn(
              "flex-shrink-0 flex items-center justify-center",
              "text-4xl font-medium",
              "hover:text-foreground transition-colors duration-300",
              "whitespace-nowrap select-none",
              // Different font styles for variety
              brand === "flow" && "italic",
              brand === "MAX" && "font-bold tracking-wider",
              brand === "NINO" && "font-light tracking-widest",
              brand === "ZINE" && "font-bold",
              brand === "Givaudan" && "font-serif",
              brand === "seluz" && "font-light",
              brand === "InTre" && "font-medium tracking-wide",
            )}
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  )
}
