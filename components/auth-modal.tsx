"use client"

import type React from "react"

import { useState } from "react"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "signin" | "signup"
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
  })

  const { login } = useAuth()
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (mode === "signin") {
        const result = await login(formData.email, formData.password, selectedRole)
        if (result.success) {
          onClose()
          // Redirect to appropriate dashboard
          const dashboardPath = getDashboardPath(selectedRole)
          router.push(dashboardPath)
        } else {
          setError(result.error || "Login failed")
        }
      } else if (mode === "signup") {
        // For demo purposes, we'll simulate signup and then login
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          return
        }

        const result = await login(formData.email, formData.password, selectedRole)
        if (result.success) {
          onClose()
          const dashboardPath = getDashboardPath(selectedRole)
          router.push(dashboardPath)
        } else {
          setError(result.error || "Signup failed")
        }
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getDashboardPath = (role: UserRole) => {
    switch (role) {
      case "seller":
        return "/dashboard/seller"
      case "b2b":
        return "/dashboard/b2b"
      case "admin":
        return "/dashboard/admin"
      case "influencer":
        return "/dashboard/influencer"
      default:
        return "/dashboard"
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError(null) // Clear error when user starts typing
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-effect">
        <CardHeader className="relative">
          <Button variant="ghost" size="sm" onClick={onClose} className="absolute right-2 top-2">
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-center">
            {mode === "signin" && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "forgot" && "Reset Password"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/20 border border-destructive/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection for Sign In */}
            {mode === "signin" && (
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="seller">Seller</SelectItem>
                    <SelectItem value="b2b">B2B Partner</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="influencer">Influencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="b2b">B2B Partner</SelectItem>
                      <SelectItem value="influencer">Influencer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Please wait..."
              ) : (
                <>
                  {mode === "signin" && "Sign In"}
                  {mode === "signup" && "Create Account"}
                  {mode === "forgot" && "Send Reset Link"}
                </>
              )}
            </Button>
          </form>

          {mode === "signin" && (
            <div className="text-center">
              <Button variant="link" onClick={() => setMode("forgot")} className="text-sm">
                Forgot your password?
              </Button>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button variant="outline" className="w-full bg-transparent">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continue with Facebook
            </Button>
          </div>

          <div className="text-center text-sm">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <Button variant="link" onClick={() => setMode("signup")} className="p-0 h-auto font-semibold">
                  Sign up
                </Button>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setMode("signin")} className="p-0 h-auto font-semibold">
                  Sign in
                </Button>
              </>
            ) : (
              <>
                Remember your password?{" "}
                <Button variant="link" onClick={() => setMode("signin")} className="p-0 h-auto font-semibold">
                  Sign in
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
