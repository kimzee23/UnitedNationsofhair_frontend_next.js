"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  }, [isOpen])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }

    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
  }

  const handleCheckout = async () => {
    setIsLoading(true)
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    // Clear cart and close
    setCartItems([])
    localStorage.removeItem("cart")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Shopping Cart ({cartItems.length})
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex flex-col h-full p-0">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-4">Add some products to get started</p>
                  <Button onClick={onClose}>Continue Shopping</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">${item.price}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity || 1}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-border">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Separator />
                    <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isLoading}>
                      {isLoading ? "Processing..." : "Checkout"}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
