"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingBag,
  Calendar,
  Heart,
  Star,
  MapPin,
  Clock,
  Settings,
  Bell,
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?key=user-avatar",
    memberSince: "2023-06-15",
    loyaltyPoints: 1250,
    nextRewardAt: 1500,
  }

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2025-01-20",
      status: "Delivered",
      total: 89.97,
      items: 3,
      image: "/luxury-hair-curl-cream-product.jpg",
    },
    {
      id: "ORD-002",
      date: "2025-01-15",
      status: "Processing",
      total: 45.99,
      items: 1,
      image: "/premium-hair-mask-treatment.jpg",
    },
    {
      id: "ORD-003",
      date: "2025-01-10",
      status: "Delivered",
      total: 124.98,
      items: 4,
      image: "/luxury-volume-shampoo-bottle.jpg",
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      salon: "Luxe Hair Studio",
      service: "Haircut & Style",
      date: "2025-01-25",
      time: "2:00 PM",
      stylist: "Maria Rodriguez",
      price: 85,
      image: "/luxury-hair-salon.png",
    },
    {
      id: 2,
      salon: "Natural Crown Salon",
      service: "Color Touch-up",
      date: "2025-02-02",
      time: "11:00 AM",
      stylist: "Alex Chen",
      price: 120,
      image: "/modern-natural-hair-salon.jpg",
    },
  ]

  const favoriteProducts = [
    {
      id: 1,
      name: "Hydrating Curl Cream",
      brand: "CurlCare Pro",
      price: 28.99,
      image: "/luxury-hair-curl-cream-product.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Strengthening Hair Mask",
      brand: "Repair Plus",
      price: 45.99,
      image: "/premium-hair-mask-treatment.jpg",
      inStock: true,
    },
    {
      id: 3,
      name: "Volume Boost Shampoo",
      brand: "Lift & Go",
      price: 24.99,
      image: "/luxury-volume-shampoo-bottle.jpg",
      inStock: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500"
      case "Processing":
        return "bg-yellow-500"
      case "Shipped":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h1>
                <p className="text-muted-foreground">Member since {new Date(user.memberSince).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Appointments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground">Favorites</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{user.loyaltyPoints}</div>
                      <div className="text-sm text-muted-foreground">Loyalty Points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Loyalty Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Progress to next reward</span>
                    <span className="text-sm text-muted-foreground">
                      {user.loyaltyPoints} / {user.nextRewardAt} points
                    </span>
                  </div>
                  <Progress value={(user.loyaltyPoints / user.nextRewardAt) * 100} />
                  <p className="text-sm text-muted-foreground">
                    Earn {user.nextRewardAt - user.loyaltyPoints} more points to unlock a $15 reward!
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt="Order"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {order.items} items • ${order.total}
                        </div>
                        <div className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.slice(0, 2).map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-medium">{appointment.salon}</div>
                          <div className="text-sm text-muted-foreground">{appointment.service}</div>
                        </div>
                        <Badge variant="outline">${appointment.price}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">with {appointment.stylist}</div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt="Order"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-lg">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="text-muted-foreground mb-2">
                          {order.items} items • Total: ${order.total}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {order.status === "Delivered" && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-6 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                          <img
                            src={appointment.image || "/placeholder.svg"}
                            alt={appointment.salon}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{appointment.salon}</h3>
                            <p className="text-muted-foreground">{appointment.service}</p>
                            <p className="text-sm text-muted-foreground">with {appointment.stylist}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          ${appointment.price}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteProducts.map((product) => (
                    <div key={product.id} className="p-4 border border-border rounded-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">{product.brand}</div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${product.price}</span>
                          <Badge variant={product.inStock ? "default" : "secondary"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" disabled={!product.inStock}>
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="text-muted-foreground">{user.name}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <div className="text-muted-foreground">{user.email}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <div className="text-muted-foreground">{user.phone}</div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Privacy Settings</span>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Methods</span>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Shipping Addresses</span>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
