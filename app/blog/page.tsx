"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowLeft, Clock, Eye, Heart, Share2, Play } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "tutorials", label: "Tutorials" },
    { value: "tips", label: "Hair Tips" },
    { value: "trends", label: "Trends" },
    { value: "care", label: "Hair Care" },
    { value: "styling", label: "Styling" },
    { value: "products", label: "Product Reviews" },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for Healthy Curly Hair",
      excerpt:
        "Discover the secrets to maintaining beautiful, healthy curls with these expert-approved techniques and products.",
      image: "/placeholder.svg?key=blog1",
      category: "tips",
      author: "Sarah Johnson",
      authorImage: "/placeholder.svg?key=author1",
      publishDate: "2025-01-15",
      readTime: "5 min read",
      views: 2340,
      likes: 156,
      isVideo: false,
      isFeatured: true,
    },
    {
      id: 2,
      title: "How to Create the Perfect Beach Waves",
      excerpt: "Step-by-step tutorial on achieving effortless beach waves using simple tools and techniques.",
      image: "/placeholder.svg?key=blog2",
      category: "tutorials",
      author: "Maria Rodriguez",
      authorImage: "/placeholder.svg?key=author2",
      publishDate: "2025-01-12",
      readTime: "8 min read",
      views: 1890,
      likes: 203,
      isVideo: true,
      isFeatured: false,
    },
    {
      id: 3,
      title: "2025 Hair Color Trends You Need to Know",
      excerpt: "From copper highlights to dimensional brunettes, explore the hottest hair color trends for this year.",
      image: "/placeholder.svg?key=blog3",
      category: "trends",
      author: "Alex Chen",
      authorImage: "/placeholder.svg?key=author3",
      publishDate: "2025-01-10",
      readTime: "6 min read",
      views: 3120,
      likes: 287,
      isVideo: false,
      isFeatured: true,
    },
    {
      id: 4,
      title: "The Ultimate Guide to Hair Masks",
      excerpt:
        "Everything you need to know about hair masks: when to use them, how to apply them, and which ones work best.",
      image: "/placeholder.svg?key=blog4",
      category: "care",
      author: "Dr. Emily Watson",
      authorImage: "/placeholder.svg?key=author4",
      publishDate: "2025-01-08",
      readTime: "10 min read",
      views: 1567,
      likes: 134,
      isVideo: false,
      isFeatured: false,
    },
    {
      id: 5,
      title: "Protective Styles for Natural Hair",
      excerpt: "Explore beautiful protective styles that keep your natural hair healthy while looking fabulous.",
      image: "/placeholder.svg?key=blog5",
      category: "styling",
      author: "Keisha Williams",
      authorImage: "/placeholder.svg?key=author5",
      publishDate: "2025-01-05",
      readTime: "7 min read",
      views: 2890,
      likes: 245,
      isVideo: true,
      isFeatured: false,
    },
    {
      id: 6,
      title: "Product Review: Top 5 Leave-In Conditioners",
      excerpt: "We tested the most popular leave-in conditioners to find the best ones for different hair types.",
      image: "/placeholder.svg?key=blog6",
      category: "products",
      author: "Jessica Park",
      authorImage: "/placeholder.svg?key=author6",
      publishDate: "2025-01-03",
      readTime: "12 min read",
      views: 1234,
      likes: 98,
      isVideo: false,
      isFeatured: false,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.views - a.views
      case "liked":
        return b.likes - a.likes
      default:
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    }
  })

  const featuredPosts = blogPosts.filter((post) => post.isFeatured)

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
              <h1 className="text-3xl font-bold mb-2">Hair Care Blog</h1>
              <p className="text-muted-foreground">Expert tips, tutorials, and insights for beautiful, healthy hair</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post) => (
                <Card key={post.id} className="hover-lift cursor-pointer group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">{categories.find((c) => c.value === post.category)?.label}</Badge>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium">{post.author}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(post.publishDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {post.likes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="liked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* All Posts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">All Articles</h2>
            <div className="text-sm text-muted-foreground">Showing {sortedPosts.length} articles</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post) => (
              <Card key={post.id} className="hover-lift cursor-pointer group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    )}
                    <Badge variant="secondary" className="absolute top-3 left-3">
                      {categories.find((c) => c.value === post.category)?.label}
                    </Badge>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                      <span>•</span>
                      <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorImage || "/placeholder.svg"}
                          alt={post.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views > 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No articles found matching your criteria</div>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 py-12 px-8 bg-card rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get the latest hair care tips, tutorials, and product reviews delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
