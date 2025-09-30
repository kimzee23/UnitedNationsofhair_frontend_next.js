"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Grid, List, Star, Heart, ShoppingCart, ArrowLeft, SlidersHorizontal } from "lucide-react"
import { AdSlot } from "@/components/ad-slot"
import Link from "next/link"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedHairTypes, setSelectedHairTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartCount(cart.length || 0)
    }
  }, [])

  const addToCart = (product: any) => {
    const savedCart = localStorage.getItem("cart")
    const cart = savedCart ? JSON.parse(savedCart) : []
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.length)
  }

  const categories = ["Shampoo", "Conditioner", "Treatment", "Styling", "Color", "Tools"]

  const hairTypes = ["Straight", "Wavy", "Curly", "Coily", "Fine", "Thick", "Damaged", "Color-Treated"]

  const products = [
    {
      id: 1,
      name: "Hydrating Curl Cream",
      brand: "CurlCare Pro",
      price: 28.99,
      originalPrice: 34.99,
      image: "/luxury-hair-curl-cream-product.jpg",
      rating: 4.8,
      reviews: 234,
      category: "Styling",
      hairType: ["Curly", "Wavy"],
      description: "Define and moisturize curls with this lightweight, non-greasy formula.",
      isNew: false,
      isBestseller: true,
    },
    {
      id: 2,
      name: "Strengthening Hair Mask",
      brand: "Repair Plus",
      price: 45.99,
      originalPrice: null,
      image: "/premium-hair-mask-treatment.jpg",
      rating: 4.9,
      reviews: 189,
      category: "Treatment",
      hairType: ["Damaged", "Color-Treated"],
      description: "Intensive weekly treatment to restore damaged hair and add shine.",
      isNew: true,
      isBestseller: false,
    },
    {
      id: 3,
      name: "Volume Boost Shampoo",
      brand: "Lift & Go",
      price: 24.99,
      originalPrice: null,
      image: "/luxury-volume-shampoo-bottle.jpg",
      rating: 4.7,
      reviews: 156,
      category: "Shampoo",
      hairType: ["Fine", "Straight"],
      description: "Gentle cleansing shampoo that adds volume without weighing hair down.",
      isNew: false,
      isBestseller: true,
    },
    {
      id: 4,
      name: "Argan Oil Hair Serum",
      brand: "Pure Essence",
      price: 32.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?key=serum1",
      rating: 4.6,
      reviews: 98,
      category: "Treatment",
      hairType: ["Dry", "Damaged"],
      description: "Nourishing serum with pure argan oil for silky, smooth hair.",
      isNew: false,
      isBestseller: false,
    },
    {
      id: 5,
      name: "Color Protection Conditioner",
      brand: "ChromaGuard",
      price: 26.99,
      originalPrice: null,
      image: "/placeholder.svg?key=cond1",
      rating: 4.8,
      reviews: 203,
      category: "Conditioner",
      hairType: ["Color-Treated"],
      description: "Extends color life while deeply conditioning treated hair.",
      isNew: true,
      isBestseller: false,
    },
    {
      id: 6,
      name: "Heat Protection Spray",
      brand: "Shield Pro",
      price: 19.99,
      originalPrice: null,
      image: "/placeholder.svg?key=spray1",
      rating: 4.5,
      reviews: 145,
      category: "Styling",
      hairType: ["All Types"],
      description: "Protects hair from heat damage up to 450°F while adding shine.",
      isNew: false,
      isBestseller: true,
    },
  ]

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleHairTypeChange = (hairType: string, checked: boolean) => {
    if (checked) {
      setSelectedHairTypes([...selectedHairTypes, hairType])
    } else {
      setSelectedHairTypes(selectedHairTypes.filter((h) => h !== hairType))
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesHairType =
      selectedHairTypes.length === 0 || product.hairType.some((type) => selectedHairTypes.includes(type))
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesHairType && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.isNew ? 1 : -1
      default:
        return b.isBestseller ? 1 : -1
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
              <h1 className="text-3xl font-bold mb-2">Hair Care Products</h1>
              <p className="text-muted-foreground">Discover premium products for every hair type and concern</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSlot size="banner" className="mb-8" />

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-80 space-y-6`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* Price Range */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium">Price Range</h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} className="w-full" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium">Category</h4>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Hair Types */}
                <div className="space-y-3">
                  <h4 className="font-medium">Hair Type</h4>
                  {hairTypes.map((hairType) => (
                    <div key={hairType} className="flex items-center space-x-2">
                      <Checkbox
                        id={hairType}
                        checked={selectedHairTypes.includes(hairType)}
                        onCheckedChange={(checked) => handleHairTypeChange(hairType, checked as boolean)}
                      />
                      <label htmlFor={hairType} className="text-sm cursor-pointer">
                        {hairType}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {sortedProducts.length} of {products.length} products
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {sortedProducts.map((product, index) => (
                <div key={product.id}>
                  <Card className="hover-lift cursor-pointer group">
                    <CardContent className="p-0">
                      {viewMode === "grid" ? (
                        <>
                          <div className="relative overflow-hidden rounded-t-lg">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {product.isNew && <Badge className="bg-green-500">New</Badge>}
                              {product.isBestseller && <Badge className="bg-orange-500">Bestseller</Badge>}
                              {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                            </div>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="p-6">
                            <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm ml-1">{product.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">({product.reviews})</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.hairType.slice(0, 2).map((type) => (
                                <Badge key={type} variant="secondary" className="text-xs">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button size="sm" onClick={() => addToCart(product)}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-4 p-6">
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {product.isNew && <Badge className="bg-green-500 text-xs">New</Badge>}
                              {product.isBestseller && <Badge className="bg-orange-500 text-xs">Bestseller</Badge>}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="text-sm text-muted-foreground">{product.brand}</div>
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                              </div>
                              <Button size="sm" variant="ghost">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm ml-1">{product.rating}</span>
                                <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {product.hairType.slice(0, 3).map((type) => (
                                  <Badge key={type} variant="secondary" className="text-xs">
                                    {type}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold">${product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                              <Button onClick={() => addToCart(product)}>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {(index + 1) % 6 === 0 && <AdSlot size="banner" className="my-6" />}
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">No products found matching your criteria</div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([])
                    setSelectedHairTypes([])
                    setPriceRange([0, 200])
                    setSearchQuery("")
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
