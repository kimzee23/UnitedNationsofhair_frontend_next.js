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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowLeft,
  Settings,
  Bell,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  BarChart3,
  Package,
  Building2,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock admin data
  const adminStats = {
    totalUsers: 12450,
    totalSellers: 234,
    totalB2BClients: 45,
    totalRevenue: 245670.5,
    monthlyGrowth: 12.5,
    pendingApprovals: 8,
    reportedIssues: 3,
    activeProducts: 1250,
  }

  const recentUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      role: "customer",
      joinDate: "2025-01-20",
      status: "Active",
      orders: 5,
    },
    {
      id: 2,
      name: "Hair Care Pro",
      email: "info@haircarepro.com",
      role: "seller",
      joinDate: "2025-01-19",
      status: "Pending",
      orders: 0,
    },
    {
      id: 3,
      name: "Business Corp",
      email: "procurement@businesscorp.com",
      role: "b2b",
      joinDate: "2025-01-18",
      status: "Active",
      orders: 23,
    },
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: "Seller Application",
      applicant: "Premium Hair Solutions",
      email: "contact@premiumhair.com",
      date: "2025-01-20",
      status: "Pending Review",
    },
    {
      id: 2,
      type: "Product Listing",
      applicant: "Natural Care Co",
      product: "Organic Shampoo Set",
      date: "2025-01-19",
      status: "Pending Review",
    },
    {
      id: 3,
      type: "B2B Contract",
      applicant: "Salon Chain Inc",
      value: "$50,000",
      date: "2025-01-18",
      status: "Pending Review",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "Security",
      message: "Multiple failed login attempts detected",
      severity: "High",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Performance",
      message: "Server response time increased by 15%",
      severity: "Medium",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "Content",
      message: "Product review flagged for inappropriate content",
      severity: "Low",
      time: "6 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Suspended":
        return "bg-red-500"
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500"
      case "seller":
        return "bg-blue-500"
      case "b2b":
        return "bg-green-500"
      case "influencer":
        return "bg-pink-500"
      case "customer":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
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
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <p className="text-muted-foreground">System Administrator</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">Full Access</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Alerts
                  {systemAlerts.length > 0 && <Badge className="ml-2 bg-red-500">{systemAlerts.length}</Badge>}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
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
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">${adminStats.totalRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Revenue</div>
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
                        <div className="text-2xl font-bold">+{adminStats.monthlyGrowth}%</div>
                        <div className="text-sm text-muted-foreground">Monthly Growth</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{adminStats.pendingApprovals}</div>
                        <div className="text-sm text-muted-foreground">Pending Approvals</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent User Registrations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{user.orders} orders</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Users
                    </Button>
                  </CardContent>
                </Card>

                {/* System Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(alert.severity)}>{alert.severity}</Badge>
                            <span className="text-sm font-medium">{alert.type}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Alerts
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div
                        key={approval.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{approval.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {approval.applicant}
                            {approval.product && ` - ${approval.product}`}
                            {approval.value && ` - ${approval.value}`}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Submitted: {new Date(approval.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">User Management</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search users..." className="w-64" />
                </div>
              </div>

              <div className="grid gap-4">
                {recentUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                              <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Orders: {user.orders}</div>
                            <div className="text-sm text-muted-foreground">
                              Joined: {new Date(user.joinDate).toLocaleDateString()}
                            </div>
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
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sellers Tab */}
            <TabsContent value="sellers" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Seller Management</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search sellers..." className="w-64" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Hair Care Pro</h3>
                      <p className="text-muted-foreground text-sm mb-4">Premium hair care products</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">4.8 (89 reviews)</span>
                      </div>
                      <Badge className="bg-green-500 mb-4">Active</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View Store
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search products..." className="w-64" />
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Product management interface</h3>
                    <p className="text-muted-foreground">
                      Detailed product management features would be implemented here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Order Management</h2>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search orders..." className="w-64" />
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Order management interface</h3>
                    <p className="text-muted-foreground">
                      Comprehensive order management features would be implemented here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Platform Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">+{adminStats.monthlyGrowth}%</div>
                    <p className="text-muted-foreground">vs last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sellers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{adminStats.totalSellers}</div>
                    <p className="text-muted-foreground">registered sellers</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>B2B Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{adminStats.totalB2BClients}</div>
                    <p className="text-muted-foreground">enterprise clients</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Advanced Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                      Detailed analytics and reporting features would be implemented here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <h2 className="text-2xl font-bold">System Administration</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Server Status</span>
                      <Badge className="bg-green-500">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database</span>
                      <Badge className="bg-green-500">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Gateway</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email Service</span>
                      <Badge className="bg-green-500">Operational</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <Select defaultValue="off">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="on">On</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationStatus">New Registrations</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Update Settings</Button>
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
