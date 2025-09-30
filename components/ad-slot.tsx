"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AdSlotProps {
  size?: "banner" | "square" | "sidebar"
  className?: string
}

export function AdSlot({ size = "banner", className = "" }: AdSlotProps) {
  const getAdDimensions = () => {
    switch (size) {
      case "banner":
        return "h-24 md:h-32"
      case "square":
        return "aspect-square"
      case "sidebar":
        return "h-64"
      default:
        return "h-24"
    }
  }

  return (
    <Card className={`${className} border-dashed border-2 border-muted-foreground/20`}>
      <CardContent className={`${getAdDimensions()} flex items-center justify-center p-4`}>
        <div className="text-center">
          <Badge variant="outline" className="mb-2">
            Advertisement
          </Badge>
          <p className="text-sm text-muted-foreground">
            {size === "banner" && "Banner Ad Space (728x90)"}
            {size === "square" && "Square Ad Space (300x300)"}
            {size === "sidebar" && "Sidebar Ad Space (300x250)"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
