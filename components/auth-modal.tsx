"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { X, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, ArrowLeft, Key } from "lucide-react"
import { useRouter } from "next/navigation"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    initialMode?: "signin" | "signup" | "forgot" | "otp"
}

interface ApiResponse {
    success: boolean
    message?: string
    error?: string
    data?: any
}

export function AuthModal({ isOpen, onClose, initialMode = "signin" }: AuthModalProps) {
    const [mode, setMode] = useState<"signin" | "signup" | "forgot" | "otp">(initialMode)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [socialLoading, setSocialLoading] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        otp: "",
    })

    const { login } = useAuth() // Removed setTokens since it doesn't exist
    const router = useRouter()

    if (!isOpen) return null

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

    const handleApiCall = async (url: string, data: any): Promise<ApiResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                return {
                    success: false,
                    error: result.error || result.message || "Something went wrong",
                }
            }

            return {
                success: true,
                message: result.message,
                data: result,
            }
        } catch (error: any) {
            return {
                success: false,
                error: error.message || "Network error occurred",
            }
        }
    }

    const handleSocialLogin = async (provider: "google" | "facebook" | "apple") => {
        setSocialLoading(provider)
        setError(null)

        try {
            // Redirect to the social login endpoint
            const socialLoginUrl = `${API_BASE_URL}/api/v1/auth/${provider}/`
            window.location.href = socialLoginUrl
        } catch (error: any) {
            setError(`Failed to start ${provider} login: ${error.message}`)
        } finally {
            setSocialLoading(null)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        const result = await handleApiCall("/users/signup/", {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
        })

        if (result.success) {
            setSuccess(result.message || "Registration successful! Please check your email to verify your account.")
            setTimeout(() => {
                setMode("signin")
                setSuccess(null)
            }, 3000)
        } else {
            setError(result.error || "Registration failed")
        }

        setIsLoading(false)
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)

        // Use the login function from auth context
        const result = await login(formData.email, formData.password)

        if (result.success) {
            setSuccess("Login successful!")
            setTimeout(() => {
                onClose()
                // Get user role from the result or default to customer
                const userRole = (result as any).role || (result as any).data?.role || "customer"
                router.push(getDashboardPath(userRole))
            }, 1000)
        } else {
            setError(result.error || "Login failed")
        }

        setIsLoading(false)
    }

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        const result = await handleApiCall("/users/forgot-password/", {
            email: formData.email,
        })

        if (result.success) {
            setSuccess(result.message || "Password reset link sent to your email.")
        } else {
            setError(result.error || "Failed to send reset link")
        }

        setIsLoading(false)
    }

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        const result = await handleApiCall("/users/request-otp/", {
            email: formData.email,
        })

        if (result.success) {
            setSuccess(result.message || "OTP sent to your email.")
            setMode("otp")
        } else {
            setError(result.error || "Failed to send OTP")
        }

        setIsLoading(false)
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        const result = await handleApiCall("/users/verify-otp", {
            email: formData.email,
            otp: formData.otp,
        })

        if (result.success && result.data) {
            // Since setTokens doesn't exist in your auth context, we'll use the login function
            // or redirect to login page after successful OTP verification
            setSuccess("OTP verified successfully! You can now sign in.")

            setTimeout(() => {
                setMode("signin")
                setSuccess(null)
                // Clear OTP fields
                setFormData(prev => ({ ...prev, otp: "" }))
            }, 2000)
        } else {
            setError(result.error || "Invalid OTP")
        }

        setIsLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        switch (mode) {
            case "signup":
                await handleSignUp(e)
                break
            case "signin":
                await handleSignIn(e)
                break
            case "forgot":
                await handleForgotPassword(e)
                break
            case "otp":
                await handleVerifyOTP(e)
                break
        }
    }

    const getDashboardPath = (role: string) => {
        switch (role) {
            case "VENDOR":
                return "/vendor-dashboard"
            case "INFLUENCER":
                return "/blog"
            case "ADMIN":
                return "/admin"
            default:
                return "/dashboard"
        }
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (error) setError(null)
        if (success) setSuccess(null)
    }

    const resetForm = () => {
        setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            otp: "",
        })
        setError(null)
        setSuccess(null)
    }

    const handleModeChange = (newMode: typeof mode) => {
        setMode(newMode)
        resetForm()
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    // Social login button component
    const SocialButton = ({
                              provider,
                              icon,
                              label
                          }: {
        provider: "google" | "facebook" | "apple"
        icon: React.ReactNode
        label: string
    }) => (
        <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-3 border-2"
            onClick={() => handleSocialLogin(provider)}
            disabled={!!socialLoading}
        >
            {socialLoading === provider ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                icon
            )}
            Continue with {label}
        </Button>
    )

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-md glass-effect relative">
                <CardHeader className="relative">
                    {mode !== "signin" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleModeChange("signin")}
                            className="absolute left-2 top-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={handleClose} className="absolute right-2 top-2">
                        <X className="w-4 h-4" />
                    </Button>
                    <CardTitle className="text-center">
                        {mode === "signin" && "Welcome Back"}
                        {mode === "signup" && "Create Account"}
                        {mode === "forgot" && "Reset Password"}
                        {mode === "otp" && "Verify OTP"}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Success Message */}
                    {success && (
                        <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-500">{success}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-destructive/20 border border-destructive/30 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-destructive" />
                            <span className="text-sm text-destructive">{error}</span>
                        </div>
                    )}

                    {/* Social Login Buttons - Only show on signin/signup */}
                    {(mode === "signin" || mode === "signup") && (
                        <div className="space-y-3">
                            <SocialButton
                                provider="google"
                                icon={
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                }
                                label="Google"
                            />

                            <SocialButton
                                provider="facebook"
                                icon={
                                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                }
                                label="Facebook"
                            />

                            <SocialButton
                                provider="apple"
                                icon={
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                }
                                label="Apple"
                            />
                        </div>
                    )}

                    {/* Separator with "or" text */}
                    {(mode === "signin" || mode === "signup") && (
                        <div className="relative">
                            <Separator />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-background px-2 text-sm text-muted-foreground">or</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* OTP Input */}
                        {mode === "otp" && (
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter OTP Code</Label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="otp"
                                        placeholder="Enter 6-digit OTP"
                                        value={formData.otp}
                                        onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        className="pl-10 text-center text-lg tracking-widest"
                                        required
                                        maxLength={6}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Enter the 6-digit code sent to your email
                                </p>
                            </div>
                        )}

                        {/* Username - Only for signup */}
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
                                        minLength={3}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Phone - Only for signup */}
                        {mode === "signup" && (
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
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

                        {/* Email - For all modes except OTP */}
                        {mode !== "otp" && (
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
                        )}

                        {/* Password - For signin and signup */}
                        {(mode === "signin" || mode === "signup") && (
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
                                        minLength={6}
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

                        {/* Confirm Password - Only for signup */}
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
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                "Please wait..."
                            ) : mode === "signin" ? (
                                "Sign In"
                            ) : mode === "signup" ? (
                                "Create Account"
                            ) : mode === "forgot" ? (
                                "Send Reset Link"
                            ) : (
                                "Verify OTP"
                            )}
                        </Button>
                    </form>

                    {/* Additional Links */}
                    <div className="space-y-4">
                        <Separator />

                        <div className="text-center space-y-2">
                            {mode === "signin" && (
                                <>
                                    <div className="text-sm">
                                        Don&apos;t have an account?{" "}
                                        <Button variant="link" onClick={() => handleModeChange("signup")} className="p-0 h-auto font-semibold">
                                            Sign up
                                        </Button>
                                    </div>
                                    <div className="text-sm">
                                        Forgot your password?{" "}
                                        <Button variant="link" onClick={() => handleModeChange("forgot")} className="p-0 h-auto font-semibold">
                                            Reset it here
                                        </Button>
                                    </div>
                                    <div className="text-sm">
                                        Login with OTP?{" "}
                                        <Button variant="link" onClick={() => handleModeChange("otp")} className="p-0 h-auto font-semibold">
                                            Get OTP
                                        </Button>
                                    </div>
                                </>
                            )}

                            {mode === "signup" && (
                                <div className="text-sm">
                                    Already have an account?{" "}
                                    <Button variant="link" onClick={() => handleModeChange("signin")} className="p-0 h-auto font-semibold">
                                        Sign in
                                    </Button>
                                </div>
                            )}

                            {(mode === "forgot" || mode === "otp") && (
                                <div className="text-sm">
                                    Remember your password?{" "}
                                    <Button variant="link" onClick={() => handleModeChange("signin")} className="p-0 h-auto font-semibold">
                                        Sign in
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}