"use client"

import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, LayoutDashboard, ShoppingBag, Building2, Shield, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function DashboardNav() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

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

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "seller":
        return <ShoppingBag className="w-4 h-4" />
      case "b2b":
        return <Building2 className="w-4 h-4" />
      case "admin":
        return <Shield className="w-4 h-4" />
      case "influencer":
        return <Star className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "seller":
        return "bg-blue-500"
      case "b2b":
        return "bg-green-500"
      case "admin":
        return "bg-purple-500"
      case "influencer":
        return "bg-pink-500"
      default:
        return "bg-gray-500"
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={getDashboardPath(user.role)}>
        <Button variant="outline" size="sm">
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <Badge className={`${getRoleColor(user.role)} text-xs`}>
                  {getRoleIcon(user.role)}
                  <span className="ml-1 capitalize">{user.role}</span>
                </Badge>
              </div>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={getDashboardPath(user.role)}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
