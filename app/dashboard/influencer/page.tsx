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
  Heart,
  Users,
  Eye,
  DollarSign,
  Camera,
  ArrowLeft,
  Settings,
  Bell,
  Plus,
  Share2,
  MessageSquare,
  Star,
  Instagram,
  Youtube,
  TicketIcon as Tiktok,
  LinkIcon,
  Calendar,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function InfluencerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock influencer data
  const influencerStats = {
    totalFollowers: 125400,
    monthlyReach: 450000,
    engagementRate: 8.5,
    totalEarnings: 12450.75,
    activeCampaigns: 3,
    completedCampaigns: 28,
    averageViews: 25000,
    totalPosts: 156,
  }

  const socialAccounts = [
    {
      platform: "Instagram",
      handle: "@hairinfluencer",
      followers: 85000,
      icon: Instagram,
      connected: true,
    },
    {
      platform: "TikTok",
      handle: "@hairinfluencer",
      followers: 32000,
      icon: Tiktok,
      connected: true,
    },
    {
      platform: "YouTube",
      handle: "Hair Influencer",
      followers: 8400,
      icon: Youtube,
      connected: false,
    },
  ]

  const activeCampaigns = [
    {
      id: 1,
      brand: "CurlCare Pro",
      product: "Hydrating Curl Cream",
      type: "Product Review",
      deadline: "2025-01-25",
      payment: 850.0,
      status: "In Progress",
      requirements: "1 Instagram post, 3 stories",
    },
    {
      id: 2,
      brand: "Natural Hair Co",
      product: "Organic Shampoo Line",
      type: "Unboxing Video",
      deadline: "2025-01-28",
      payment: 1200.0,
      status: "Pending Approval",
      requirements: "1 TikTok video, 1 Instagram reel",
    },
    {
      id: 3,
      brand: "Salon Pro Tools",
      product: "Professional Hair Dryer",
      type: "Tutorial Content",
      deadline: "2025-02-02",
      payment: 950.0,
      status: "Draft Ready",
      requirements: "1 YouTube video, 2 Instagram posts",
    },
  ]

  const recentPosts = [
    {
      id: 1,
      platform: "Instagram",
      type: "Post",
      content: "My morning hair routine with @curlcarepro ✨",
      likes: 2450,
      comments: 89,
      views: 15600,
      date: "2025-01-20",
      image: "/luxury-hair-curl-cream-product.jpg",
    },
    {
      id: 2,
      platform: "TikTok",
      type: "Video",
      content: "Quick curly hair hack that changed my life!",
      likes: 8900,
      comments: 234,
      views: 45000,
      date: "2025-01-19",
      image: "/diverse-beautiful-hair-models-collage.jpg",
    },
    {
      id: 3,
      platform: "Instagram",
      type: "Reel",
      content: "Hair transformation Tuesday! Before & after",
      likes: 3200,
      comments: 156,
      views: 28000,
      date: "2025-01-18",
      image: "/premium-hair-mask-treatment.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500"
      case "Pending Approval":
        return "bg-yellow-500"
      case "Draft Ready":
        return "bg-green-500"
      case "Completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return Instagram
      case "TikTok":
        return Tiktok
      case "YouTube":
        return Youtube
      default:
        return LinkIcon
    }
  }

  return (
    <ProtectedRoute allowedRoles={["influencer"]}>
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
                  <h1 className="text-2xl font-bold">Influencer Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-muted-foreground">Content Creator</span>
                  </div>
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
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
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
                        <div className="text-2xl font-bold">{influencerStats.totalFollowers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Followers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Eye className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{influencerStats.monthlyReach.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Monthly Reach</div>
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
                        <div className="text-2xl font-bold">{influencerStats.engagementRate}%</div>
                        <div className="text-sm text-muted-foreground">Engagement Rate</div>
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
                        <div className="text-2xl font-bold">${influencerStats.totalEarnings.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Earnings</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>Connected Social Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {socialAccounts.map((account) => {
                      const IconComponent = account.icon
                      return (
                        <div
                          key={account.platform}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-6 h-6" />
                            <div>
                              <div className="font-medium">{account.platform}</div>
                              <div className="text-sm text-muted-foreground">{account.handle}</div>
                              <div className="text-sm text-muted-foreground">
                                {account.followers.toLocaleString()} followers
                              </div>
                            </div>
                          </div>
                          <Badge className={account.connected ? "bg-green-500" : "bg-gray-500"}>
                            {account.connected ? "Connected" : "Connect"}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Active Campaigns */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeCampaigns.slice(0, 2).map((campaign) => (
                      <div key={campaign.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{campaign.brand}</div>
                            <div className="text-sm text-muted-foreground">{campaign.product}</div>
                            <div className="text-sm text-muted-foreground">{campaign.type}</div>
                          </div>
                          <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Due: {new Date(campaign.deadline).toLocaleDateString()}</span>
                          <span className="font-medium">${campaign.payment}</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Campaigns
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
                      Create New Post
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Content
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Brand Messages
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Campaign Management</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Campaigns
                </Button>
              </div>

              <div className="grid gap-6">
                {activeCampaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{campaign.brand}</h3>
                          <p className="text-muted-foreground">{campaign.product}</p>
                          <p className="text-sm text-muted-foreground">{campaign.type}</p>
                        </div>
                        <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Payment</div>
                          <div className="font-semibold">${campaign.payment}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Deadline</div>
                          <div className="font-semibold">{new Date(campaign.deadline).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Requirements</div>
                          <div className="font-semibold">{campaign.requirements}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload Content
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message Brand
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Content Library</h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Content
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post) => {
                  const IconComponent = getPlatformIcon(post.platform)
                  return (
                    <Card key={post.id}>
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post content"
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                            <IconComponent className="w-3 h-3 mr-1" />
                            {post.platform}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                          <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {post.comments}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Performance Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">+{influencerStats.engagementRate}%</div>
                    <p className="text-muted-foreground">vs last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{influencerStats.averageViews.toLocaleString()}</div>
                    <p className="text-muted-foreground">per post</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Created</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{influencerStats.totalPosts}</div>
                    <p className="text-muted-foreground">total posts</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Detailed Analytics</h3>
                    <p className="text-muted-foreground">Advanced analytics and insights would be displayed here.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earnings Tab */}
            <TabsContent value="earnings" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Earnings & Payments</h2>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">${influencerStats.totalEarnings.toLocaleString()}</div>
                    <p className="text-muted-foreground">lifetime earnings</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$3,000</div>
                    <p className="text-muted-foreground">pending payment</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Completed Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{influencerStats.completedCampaigns}</div>
                    <p className="text-muted-foreground">successful campaigns</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Payment History</h3>
                    <p className="text-muted-foreground">
                      Detailed payment history and invoices would be displayed here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <h2 className="text-2xl font-bold">Influencer Profile</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue="Hair care enthusiast sharing tips and reviews" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="niche">Content Niche</Label>
                      <Input id="niche" defaultValue="Hair Care & Beauty" />
                    </div>
                    <Button>Update Profile</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contentTypes">Preferred Content Types</Label>
                      <Input id="contentTypes" defaultValue="Reviews, Tutorials, Unboxing" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brandTypes">Preferred Brand Types</Label>
                      <Input id="brandTypes" defaultValue="Hair Care, Beauty, Wellness" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rateCard">Rate Card (per post)</Label>
                      <Input id="rateCard" defaultValue="$500 - $1,500" />
                    </div>
                    <Button>Update Preferences</Button>
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
