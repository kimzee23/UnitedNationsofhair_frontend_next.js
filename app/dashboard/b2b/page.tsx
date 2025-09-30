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
import {
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  ArrowLeft,
  Settings,
  Bell,
  ShoppingCart,
  Truck,
  MessageSquare,
  Download,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function B2BDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock B2B data
  const b2bStats = {
    totalSpent: 45620.75,
    monthlyBudget: 8500.0,
    activeContracts: 3,
    totalOrders: 89,
    teamMembers: 12,
    pendingApprovals: 4,
  }

  const bulkOrders = [
    {
      id: "B2B-2025-001",
      description: "Monthly Hair Care Supplies",
      amount: 2450.0,
      quantity: 150,
      status: "Processing",
      date: "2025-01-20",
      deliveryDate: "2025-01-25",
    },
    {
      id: "B2B-2025-002",
      description: "Salon Equipment Package",
      amount: 5200.0,
      quantity: 25,
      status: "Shipped",
      date: "2025-01-18",
      deliveryDate: "2025-01-22",
    },
    {
      id: "B2B-2025-003",
      description: "Professional Treatment Kit",
      amount: 1850.0,
      quantity: 75,
      status: "Delivered",
      date: "2025-01-15",
      deliveryDate: "2025-01-20",
    },
  ]

  const contracts = [
    {
      id: "CONTRACT-001",
      supplier: "Premium Hair Solutions",
      type: "Annual Supply Agreement",
      value: 120000,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      status: "Active",
    },
    {
      id: "CONTRACT-002",
      supplier: "Professional Tools Inc",
      type: "Equipment Lease",
      value: 24000,
      startDate: "2024-06-01",
      endDate: "2026-05-31",
      status: "Active",
    },
    {
      id: "CONTRACT-003",
      supplier: "Organic Care Co",
      type: "Exclusive Distribution",
      value: 85000,
      startDate: "2025-03-01",
      endDate: "2026-02-28",
      status: "Pending",
    },
  ]

  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Procurement Manager",
      email: "john.smith@company.com",
      lastActive: "2025-01-20",
      orders: 23,
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Operations Director",
      email: "sarah.wilson@company.com",
      lastActive: "2025-01-19",
      orders: 15,
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Store Manager",
      email: "mike.johnson@company.com",
      lastActive: "2025-01-18",
      orders: 31,
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
      case "Pending":
        return "bg-yellow-500"
      case "Expired":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <ProtectedRoute allowedRoles={["b2b"]}>
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
                  <h1 className="text-2xl font-bold">B2B Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
                  <p className="text-sm text-muted-foreground">{user?.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  {b2bStats.pendingApprovals > 0 && (
                    <Badge className="ml-2 bg-red-500">{b2bStats.pendingApprovals}</Badge>
                  )}
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
              <TabsTrigger value="orders">Bulk Orders</TabsTrigger>
              <TabsTrigger value="contracts">Contracts</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
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
                        <div className="text-2xl font-bold">${b2bStats.totalSpent.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Spent</div>
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
                        <div className="text-2xl font-bold">${b2bStats.monthlyBudget.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Monthly Budget</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{b2bStats.activeContracts}</div>
                        <div className="text-sm text-muted-foreground">Active Contracts</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{b2bStats.teamMembers}</div>
                        <div className="text-sm text-muted-foreground">Team Members</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bulk Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {bulkOrders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">{order.description}</div>
                          <div className="text-sm text-muted-foreground">{order.quantity} items</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${order.amount.toLocaleString()}</div>
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
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Create Bulk Order
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Request Quote
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Team
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Bulk Orders</h2>
                <Button>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Create New Order
                </Button>
              </div>

              <div className="grid gap-6">
                {bulkOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <p className="text-muted-foreground">{order.description}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Amount</div>
                          <div className="font-semibold">${order.amount.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Quantity</div>
                          <div className="font-semibold">{order.quantity} items</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Order Date</div>
                          <div className="font-semibold">{new Date(order.date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Delivery Date</div>
                          <div className="font-semibold">{new Date(order.deliveryDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4 mr-2" />
                          Track Shipment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Contracts Tab */}
            <TabsContent value="contracts" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Contracts & Agreements</h2>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  New Contract
                </Button>
              </div>

              <div className="grid gap-6">
                {contracts.map((contract) => (
                  <Card key={contract.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{contract.id}</h3>
                          <p className="text-muted-foreground">{contract.supplier}</p>
                          <p className="text-sm text-muted-foreground">{contract.type}</p>
                        </div>
                        <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Contract Value</div>
                          <div className="font-semibold">${contract.value.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Start Date</div>
                          <div className="font-semibold">{new Date(contract.startDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">End Date</div>
                          <div className="font-semibold">{new Date(contract.endDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Contract
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        {contract.status === "Pending" && <Button size="sm">Review & Sign</Button>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Team Management</h2>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </div>

              <div className="grid gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-muted-foreground">{member.role}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Orders: {member.orders}</div>
                          <div className="text-sm text-muted-foreground">
                            Last active: {new Date(member.lastActive).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-6">
              <h2 className="text-2xl font-bold">Invoices & Billing</h2>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No invoices available</h3>
                    <p className="text-muted-foreground">Your invoices and billing information will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold">B2B Account Settings</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input id="companyName" defaultValue={user?.company || "Business Corp"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID</Label>
                      <Input id="taxId" defaultValue="12-3456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Billing Address</Label>
                      <Input id="billingAddress" defaultValue="123 Business St, City, State 12345" />
                    </div>
                    <Button>Update Company Info</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Purchasing Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="approvalLimit">Approval Limit</Label>
                      <Input id="approvalLimit" defaultValue="$5,000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <Input id="paymentTerms" defaultValue="Net 30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredCurrency">Preferred Currency</Label>
                      <Input id="preferredCurrency" defaultValue="USD" />
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
