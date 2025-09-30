"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DashboardNav } from "@/components/dashboard-nav"
import { useAuth } from "@/contexts/auth-context"
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Star,
  ArrowRight,
  Scissors,
  Sparkles,
  Users,
  Award,
  Heart,
  MapPin,
  Clock,
} from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import Link from "next/link"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [cartCount, setCartCount] = useState(0)

  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    // Simulate cart count from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      const cart = JSON.parse(savedCart)
      setCartCount(cart.length || 0)
    }
  }, [])

  const addToCart = (product: any) => {
    const savedCart = localStorage.getItem("cart")
    const cart = savedCart ? JSON.parse(savedCart) : []
    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
    setCartCount(cart.length)
  }

  const featuredProducts = [
    {
      id: 1,
      name: "Hydrating Curl Cream",
      price: 28.99,
      image: "/luxury-hair-curl-cream-product.jpg",
      rating: 4.8,
      reviews: 234,
      category: "Curly Hair",
    },
    {
      id: 2,
      name: "Strengthening Hair Mask",
      price: 45.99,
      image: "/premium-hair-mask-treatment.jpg",
      rating: 4.9,
      reviews: 189,
      category: "Treatment",
    },
    {
      id: 3,
      name: "Volume Boost Shampoo",
      price: 24.99,
      image: "/luxury-volume-shampoo-bottle.jpg",
      rating: 4.7,
      reviews: 156,
      category: "Fine Hair",
    },
  ]

  const topSalons = [
    {
      id: 1,
      name: "Luxe Hair Studio",
      location: "Manhattan, NY",
      rating: 4.9,
      image: "/luxury-hair-salon.png",
      specialties: ["Color", "Cuts", "Extensions"],
    },
    {
      id: 2,
      name: "Natural Crown Salon",
      location: "Brooklyn, NY",
      rating: 4.8,
      image: "/modern-natural-hair-salon.jpg",
      specialties: ["Natural Hair", "Braids", "Treatments"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">United Nation of Hair</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/products" className="text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/salons" className="text-foreground hover:text-primary transition-colors">
                Salons
              </Link>
              <Link href="/tutorials" className="text-foreground hover:text-primary transition-colors">
                Tutorials
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="hidden sm:flex">
                <Search className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {isAuthenticated ? (
                <DashboardNav />
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setAuthMode("signin")
                    setIsAuthModalOpen(true)
                  }}
                >
                  <User className="w-4 h-4" />
                </Button>
              )}

              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-border">
            <div className="px-4 py-4 space-y-4">
              <Link href="/products" className="block text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link href="/salons" className="block text-foreground hover:text-primary transition-colors">
                Salons
              </Link>
              <Link href="/tutorials" className="block text-foreground hover:text-primary transition-colors">
                Tutorials
              </Link>
              <Link href="/blog" className="block text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">Premium Hair Care Platform</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                The complete platform for
                <span className="text-gradient"> beautiful hair</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Discover premium products, expert salon services, and professional tutorials designed for every hair
                type and texture. Your journey to healthier, more beautiful hair starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                    Shop Products
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/salons">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 w-full sm:w-auto bg-transparent"
                  >
                    Find Salons
                    <MapPin className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="slide-in">
              <div className="relative">
                <img
                  src="/diverse-beautiful-hair-models-collage.jpg"
                  alt="Beautiful diverse hair styles"
                  className="rounded-2xl shadow-2xl hover-lift"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center fade-in">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Premium Products</div>
            </div>
            <div className="text-center fade-in">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Partner Salons</div>
            </div>
            <div className="text-center fade-in">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center fade-in">
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">Discover our most loved hair care essentials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover-lift cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">{product.category}</Badge>
                    <Button
                      size="sm"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${product.price}</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Salons */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Rated Salons</h2>
            <p className="text-xl text-muted-foreground">Book with the best hair professionals in your area</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {topSalons.map((salon) => (
              <Card key={salon.id} className="hover-lift cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={salon.image || "/placeholder.svg"}
                      alt={salon.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{salon.name}</h3>
                        <p className="text-muted-foreground flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {salon.location}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-semibold">{salon.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {salon.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full">
                      Book Appointment
                      <Clock className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Find More Salons
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">Everything you need for your hair care journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-muted-foreground">
                Curated selection of the finest hair care products from trusted brands worldwide.
              </p>
            </div>

            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Community</h3>
              <p className="text-muted-foreground">
                Connect with professional stylists and hair care experts for personalized advice.
              </p>
            </div>

            <div className="text-center fade-in">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Proven Results</h3>
              <p className="text-muted-foreground">
                Join millions of satisfied customers who have transformed their hair with our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get the latest hair care tips, product launches, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">United Nations of Hair</span>
              </div>
              <p className="text-muted-foreground">
                Your premier destination for professional hair care products and services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/products/shampoos" className="hover:text-primary transition-colors">
                    Shampoos
                  </Link>
                </li>
                <li>
                  <Link href="/products/conditioners" className="hover:text-primary transition-colors">
                    Conditioners
                  </Link>
                </li>
                <li>
                  <Link href="/products/treatments" className="hover:text-primary transition-colors">
                    Treatments
                  </Link>
                </li>
                <li>
                  <Link href="/products/styling" className="hover:text-primary transition-colors">
                    Styling
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/salons" className="hover:text-primary transition-colors">
                    Find Salons
                  </Link>
                </li>
                <li>
                  <Link href="/appointments" className="hover:text-primary transition-colors">
                    Book Appointments
                  </Link>
                </li>
                <li>
                  <Link href="/tutorials" className="hover:text-primary transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="/consultations" className="hover:text-primary transition-colors">
                    Consultations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-primary transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-primary transition-colors">
                    Shipping
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 United Nations of Hair. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl mx-4">
            <Card className="glass-effect">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Search className="w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search products, salons, tutorials..."
                    className="border-0 bg-transparent text-lg focus-visible:ring-0"
                    autoFocus
                  />
                  <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Popular searches: Curly hair products, Hair salons near me, Hair tutorials
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  )
}
