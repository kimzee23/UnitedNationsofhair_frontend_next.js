"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ArrowLeft, Play, Eye, BookOpen, Video, Star } from "lucide-react"
import Link from "next/link"

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "styling", label: "Styling" },
    { value: "cutting", label: "Cutting" },
    { value: "coloring", label: "Coloring" },
    { value: "care", label: "Hair Care" },
    { value: "braiding", label: "Braiding" },
    { value: "curling", label: "Curling" },
    { value: "straightening", label: "Straightening" },
  ]

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ]

  const types = [
    { value: "all", label: "All Types" },
    { value: "video", label: "Video" },
    { value: "article", label: "Article" },
    { value: "step-by-step", label: "Step-by-Step" },
  ]

  const tutorials = [
    {
      id: 1,
      title: "Perfect Beach Waves in 10 Minutes",
      description: "Learn how to create effortless beach waves using just a curling iron and texturizing spray.",
      image: "/placeholder.svg?key=tutorial1",
      category: "styling",
      level: "beginner",
      type: "video",
      duration: "10 min",
      instructor: "Sarah Johnson",
      instructorImage: "/placeholder.svg?key=instructor1",
      rating: 4.8,
      views: 15420,
      difficulty: "Easy",
      tools: ["Curling Iron", "Texturizing Spray", "Heat Protectant"],
      isPremium: false,
    },
    {
      id: 2,
      title: "French Braid Masterclass",
      description: "Master the art of French braiding with this comprehensive step-by-step tutorial.",
      image: "/placeholder.svg?key=tutorial2",
      category: "braiding",
      level: "intermediate",
      type: "video",
      duration: "25 min",
      instructor: "Maria Rodriguez",
      instructorImage: "/placeholder.svg?key=instructor2",
      rating: 4.9,
      views: 8930,
      difficulty: "Medium",
      tools: ["Hair Ties", "Bobby Pins", "Brush"],
      isPremium: true,
    },
    {
      id: 3,
      title: "DIY Hair Mask for Damaged Hair",
      description: "Create nourishing hair masks at home using natural ingredients for healthier hair.",
      image: "/placeholder.svg?key=tutorial3",
      category: "care",
      level: "beginner",
      type: "article",
      duration: "5 min read",
      instructor: "Dr. Emily Watson",
      instructorImage: "/placeholder.svg?key=instructor3",
      rating: 4.7,
      views: 12340,
      difficulty: "Easy",
      tools: ["Avocado", "Honey", "Coconut Oil"],
      isPremium: false,
    },
    {
      id: 4,
      title: "Balayage Technique for Beginners",
      description: "Learn the basics of balayage highlighting technique with professional tips and tricks.",
      image: "/placeholder.svg?key=tutorial4",
      category: "coloring",
      level: "advanced",
      type: "video",
      duration: "45 min",
      instructor: "Alex Chen",
      instructorImage: "/placeholder.svg?key=instructor4",
      rating: 4.6,
      views: 6780,
      difficulty: "Hard",
      tools: ["Bleach", "Foils", "Brush", "Gloves"],
      isPremium: true,
    },
    {
      id: 5,
      title: "Layered Haircut Step-by-Step",
      description: "Professional cutting techniques for creating beautiful layered hairstyles at home.",
      image: "/placeholder.svg?key=tutorial5",
      category: "cutting",
      level: "intermediate",
      type: "step-by-step",
      duration: "30 min",
      instructor: "Jessica Park",
      instructorImage: "/placeholder.svg?key=instructor5",
      rating: 4.5,
      views: 9870,
      difficulty: "Medium",
      tools: ["Scissors", "Comb", "Clips", "Mirror"],
      isPremium: false,
    },
    {
      id: 6,
      title: "Keratin Treatment at Home",
      description: "Professional keratin treatment techniques you can do yourself for smoother hair.",
      image: "/placeholder.svg?key=tutorial6",
      category: "straightening",
      level: "advanced",
      type: "video",
      duration: "60 min",
      instructor: "Michael Brown",
      instructorImage: "/placeholder.svg?key=instructor6",
      rating: 4.4,
      views: 5430,
      difficulty: "Hard",
      tools: ["Keratin Treatment", "Flat Iron", "Blow Dryer"],
      isPremium: true,
    },
  ]

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tutorial.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || tutorial.level === selectedLevel
    const matchesType = selectedType === "all" || tutorial.type === selectedType

    return matchesSearch && matchesCategory && matchesLevel && matchesType
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
      case "article":
        return <BookOpen className="w-4 h-4" />
      case "step-by-step":
        return <BookOpen className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

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
              <h1 className="text-3xl font-bold mb-2">Hair Tutorials</h1>
              <p className="text-muted-foreground">
                Learn from professional stylists with step-by-step tutorials and expert techniques
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tutorials..."
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
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
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

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-muted-foreground">Showing {filteredTutorials.length} tutorials</div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover-lift cursor-pointer group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={tutorial.image || "/placeholder.svg"}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play button for videos */}
                  {tutorial.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
                    {tutorial.isPremium && <Badge className="bg-yellow-500">Premium</Badge>}
                  </div>

                  {/* Duration */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {tutorial.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {getTypeIcon(tutorial.type)}
                      {categories.find((c) => c.value === tutorial.category)?.label}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{tutorial.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tutorial.description}</p>

                  {/* Tools needed */}
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Tools needed:</div>
                    <div className="flex flex-wrap gap-1">
                      {tutorial.tools.slice(0, 3).map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                      {tutorial.tools.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tutorial.tools.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Instructor and stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={tutorial.instructorImage || "/placeholder.svg"}
                        alt={tutorial.instructor}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">{tutorial.instructor}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {tutorial.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {tutorial.views > 1000 ? `${(tutorial.views / 1000).toFixed(1)}k` : tutorial.views}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">No tutorials found matching your criteria</div>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all")
                setSelectedLevel("all")
                setSelectedType("all")
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <section className="mt-16 py-12 px-8 bg-card rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Learn More?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our premium membership to access exclusive tutorials, one-on-one sessions with professional stylists,
            and advanced techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Start Free Trial</Button>
            <Button size="lg" variant="outline">
              View All Tutorials
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
