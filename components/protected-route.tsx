"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { AlertCircle, Lock } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requireAuth?: boolean
}

export function ProtectedRoute({
  children,
  allowedRoles = ["customer", "seller", "b2b", "admin", "influencer"],
  requireAuth = true,
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && requireAuth) {
      if (!isAuthenticated) {
        setAuthError("Please sign in to access this page")
        setShowAuthModal(true)
      } else if (user && !allowedRoles.includes(user.role)) {
        setAuthError(`Access denied. This page is only available for ${allowedRoles.join(", ")} accounts.`)
      } else {
        setAuthError(null)
      }
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!requireAuth) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Authentication Required</h2>
            <p className="text-muted-foreground">Please sign in to access this page</p>
            <Button onClick={() => setShowAuthModal(true)} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="signin" />
      </div>
    )
  }

  if (user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-semibold">Access Denied</h2>
            <p className="text-muted-foreground">{authError}</p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
