"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Star, Clock, Phone, ArrowLeft, Calendar, Filter } from "lucide-react"
import Link from "next/link"

export default function SalonsPage() {
  const [searchLocation, setSearchLocation] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState("4.5") // Updated default value
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  const services = [
    "Haircuts",
    "Color",
    "Highlights",
    "Balayage",
    "Perms",
    "Straightening",
    "Extensions",
    "Braids",
    "Updos",
    "Blowouts",
    "Treatments",
    "Styling",
  ]

  const salons = [
    {
      id: 1,
      name: "Luxe Hair Studio",
      address: "123 Madison Ave, Manhattan, NY 10016",
      phone: "(212) 555-0123",
      rating: 4.9,
      reviews: 342,
      image: "/luxury-hair-salon.png",
      services: ["Haircuts", "Color", "Highlights", "Balayage", "Extensions"],
      priceRange: "$$$",
      openHours: "9:00 AM - 8:00 PM",
      specialties: ["Luxury Color", "Celebrity Styling", "Hair Extensions"],
      distance: "0.5 miles",
      nextAvailable: "Today 3:00 PM",
    },
    {
      id: 2,
      name: "Natural Crown Salon",
      address: "456 Nostrand Ave, Brooklyn, NY 11216",
      phone: "(718) 555-0456",
      rating: 4.8,
      reviews: 198,
      image: "/modern-natural-hair-salon.jpg",
      services: ["Haircuts", "Natural Hair", "Braids", "Treatments", "Styling"],
      priceRange: "$$",
      openHours: "10:00 AM - 7:00 PM",
      specialties: ["Natural Hair Care", "Protective Styles", "Hair Health"],
      distance: "1.2 miles",
      nextAvailable: "Tomorrow 11:00 AM",
    },
    {
      id: 3,
      name: "Modern Edge Salon",
      address: "789 Broadway, SoHo, NY 10012",
      phone: "(212) 555-0789",
      rating: 4.7,
      reviews: 256,
      image: "/placeholder.svg?key=salon3",
      services: ["Haircuts", "Color", "Straightening", "Styling", "Treatments"],
      priceRange: "$$$",
      openHours: "8:00 AM - 9:00 PM",
      specialties: ["Trendy Cuts", "Color Correction", "Keratin Treatments"],
      distance: "2.1 miles",
      nextAvailable: "Today 5:30 PM",
    },
    {
      id: 4,
      name: "Curl & Co.",
      address: "321 Atlantic Ave, Brooklyn, NY 11201",
      phone: "(718) 555-0321",
      rating: 4.6,
      reviews: 167,
      image: "/placeholder.svg?key=salon4",
      services: ["Haircuts", "Curly Hair", "Treatments", "Styling"],
      priceRange: "$$",
      openHours: "9:00 AM - 6:00 PM",
      specialties: ["Curly Hair Specialist", "DevaCut", "Curl Treatments"],
      distance: "1.8 miles",
      nextAvailable: "Tomorrow 2:00 PM",
    },
  ]

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service])
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    }
  }

  const filteredSalons = salons.filter((salon) => {
    const matchesLocation = searchLocation === "" || salon.address.toLowerCase().includes(searchLocation.toLowerCase())
    const matchesServices =
      selectedServices.length === 0 || selectedServices.some((service) => salon.services.includes(service))
    const matchesRating = selectedRating === "" || salon.rating >= Number.parseFloat(selectedRating)

    return matchesLocation && matchesServices && matchesRating
  })

  const sortedSalons = [...filteredSalons].sort((a, b) => {
    switch (sortBy) {
      case "distance":
        return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
      case "price-low":
        return a.priceRange.length - b.priceRange.length
      case "price-high":
        return b.priceRange.length - a.priceRange.length
      default:
        return b.rating - a.rating
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Hair Salons</h1>
              <p className="text-muted-foreground">Find and book appointments with top-rated hair professionals</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:w-80">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 space-y-6`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* Services */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium">Services</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                        />
                        <label htmlFor={service} className="text-sm cursor-pointer">
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <h4 className="font-medium">Minimum Rating</h4>
                  <Select value={selectedRating} onValueChange={setSelectedRating}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                      <SelectItem value="4.0">4.0+ stars</SelectItem>
                      <SelectItem value="3.5">3.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Salons List */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">Showing {sortedSalons.length} salons</div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="distance">Nearest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Salons */}
            <div className="space-y-6">
              {sortedSalons.map((salon) => (
                <Card key={salon.id} className="hover-lift cursor-pointer">
                  <CardContent className="p-0">
                    <div className="flex gap-6 p-6">
                      <div className="w-48 h-32 flex-shrink-0">
                        <img
                          src={salon.image || "/placeholder.svg"}
                          alt={salon.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{salon.name}</h3>
                            <div className="flex items-center text-muted-foreground text-sm mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              {salon.address}
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Phone className="w-4 h-4 mr-1" />
                              {salon.phone}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span className="font-semibold">{salon.rating}</span>
                              <span className="text-muted-foreground text-sm ml-1">({salon.reviews} reviews)</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{salon.distance}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {salon.specialties.slice(0, 3).map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                          <Badge variant="outline">{salon.priceRange}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {salon.openHours}
                            </div>
                            <div className="text-green-600 font-medium">Next: {salon.nextAvailable}</div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedSalons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">No salons found matching your criteria</div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedServices([])
                    setSelectedRating("")
                    setSearchLocation("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
