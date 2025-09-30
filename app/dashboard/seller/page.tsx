"use client"

import { useState } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  Settings,
  Bell,
  BarChart3,
  MessageSquare,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function SellerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock seller data
  const sellerStats = {
    totalSales: 15420.5,
    monthlyRevenue: 3240.75,
    totalProducts: 24,
    totalOrders: 156,
    averageRating: 4.8,
    totalReviews: 89,
  }

  const recentOrders = [
    {
      id: "ORD-2025-001",
      customer: "Sarah Johnson",
      product: "Hydrating Curl Cream",
      amount: 28.99,
      status: "Processing",
      date: "2025-01-20",
    },
    {
      id: "ORD-2025-002",
      customer: "Mike Chen",
      product: "Volume Boost Shampoo",
      amount: 24.99,
      status: "Shipped",
      date: "2025-01-19",
    },
    {
      id: "ORD-2025-003",
      customer: "Emma Davis",
      product: "Strengthening Hair Mask",
      amount: 45.99,
      status: "Delivered",
      date: "2025-01-18",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Hydrating Curl Cream",
      price: 28.99,
      stock: 45,
      sales: 234,
      rating: 4.8,
      image: "/luxury-hair-curl-cream-product.jpg",
      status: "Active",
    },
    {
      id: 2,
      name: "Volume Boost Shampoo",
      price: 24.99,
      stock: 12,
      sales: 189,
      rating: 4.7,
      image: "/luxury-volume-shampoo-bottle.jpg",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Strengthening Hair Mask",
      price: 45.99,
      stock: 0,
      sales: 156,
      rating: 4.9,
      image: "/premium-hair-mask-treatment.jpg",
      status: "Out of Stock",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500"
      case "Shipped":
        return "bg-blue-500"
      case "Delivered":
        return "bg-green-500"
      case "Active":
        return "bg-green-500"
      case "Low Stock":
        return "bg-yellow-500"
      case "Out of Stock":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["seller"]}>
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
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
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
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${sellerStats.totalSales.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Sales</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${sellerStats.monthlyRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{sellerStats.totalProducts}</div>
                        <div className="text-sm text-muted-foreground">Products</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{sellerStats.totalOrders}</div>
                        <div className="text-sm text-muted-foreground">Total Orders</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">{order.customer}</div>
                          <div className="text-sm text-muted-foreground">{order.product}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${order.amount}</div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Orders
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Product
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Customer Messages
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Manage Inventory
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Your Products</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="grid gap-6">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{product.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Price: ${product.price}</span>
                                <span>Stock: {product.stock}</span>
                                <span>Sales: {product.sales}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-2xl font-bold">Order Management</h2>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-lg">{order.id}</div>
                          <div className="text-muted-foreground">Customer: {order.customer}</div>
                          <div className="text-muted-foreground">Product: {order.product}</div>
                          <div className="text-sm text-muted-foreground">
                            Date: {new Date(order.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-lg">${order.amount}</div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Update Status
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Sales Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">+23%</div>
                    <p className="text-muted-foreground">vs last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Best Selling Product</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold">Hydrating Curl Cream</div>
                    <p className="text-muted-foreground">234 units sold</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold">{sellerStats.averageRating}</span>
                    </div>
                    <p className="text-muted-foreground">{sellerStats.totalReviews} reviews</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                    <p className="text-muted-foreground">
                      Customer reviews will appear here once you start receiving them.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold">Seller Settings</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" defaultValue="Hair Care Pro" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeDescription">Store Description</Label>
                      <Textarea id="storeDescription" defaultValue="Premium hair care products for all hair types" />
                    </div>
                    <Button>Update Store Info</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input id="paypalEmail" type="email" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Bank Account</Label>
                      <Input id="bankAccount" defaultValue="****-****-****-1234" />
                    </div>
                    <Button>Update Payment Info</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
