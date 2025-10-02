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

// @ts-ignore
export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
    const [mode, setMode] = useState<"signin" | "signup" | "forgot">(initialMode)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedRole, setSelectedRole] = useState<UserRole>("customer")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
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
                    router.push(getDashboardPath(selectedRole))
                } else {
                    setError(result.error || "Login failed")
                }
            } else if (mode === "signup") {
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords do not match")
                    return
                }
                // Simulate signup -> login
                const result = await login(formData.email, formData.password, selectedRole)
                if (result.success) {
                    onClose()
                    router.push(getDashboardPath(selectedRole))
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
        if (error) setError(null)
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
                        {/* Account type selection */}
                        {mode === "signup" && (
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
                        )}

                        {/* Username */}
                        {mode === "signup" && (
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {mode === "signup" && (
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+234 801 234 5678"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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

                        {/* Password */}
                        {mode !== "forgot" && (
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Confirm Password */}
                        {mode === "signup" && (
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                            {isLoading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
                        </Button>
                    </form>

                    <Separator />

                    <div className="text-center text-sm">
                        {mode === "signin" ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <Button variant="link" onClick={() => setMode("signup")} className="p-0 h-auto font-semibold">
                                    Sign up
                                </Button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
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
