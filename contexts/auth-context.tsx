"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "customer" | "seller" | "b2b" | "admin" | "influencer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  phone?: string
  company?: string
  verified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole = "customer") => {
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication logic
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" }
      }

      // Mock user data based on role
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name:
          role === "admin"
            ? "Admin User"
            : role === "seller"
              ? "Seller Account"
              : role === "b2b"
                ? "B2B Partner"
                : role === "influencer"
                  ? "Influencer Profile"
                  : "Customer User",
        email,
        role,
        avatar: "/placeholder.svg?key=user-avatar",
        phone: "+1 (555) 123-4567",
        company: role === "b2b" ? "Business Corp" : undefined,
        verified: true,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))

      return { success: true }
    } catch (error) {
      return { success: false, error: "Login failed. Please try again." }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
