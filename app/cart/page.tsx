"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"

type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
}

export default function CartPage() {
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const loadCart = async () => {
            try {
                // Check if user is logged in
                const res = await fetch("/api/v1/auth/me", { credentials: "include" })
                if (res.ok) {
                    setLoggedIn(true)
                    const data = await fetch("/api/v1/cart", {
                        credentials: "include",
                    }).then((r) => r.json())
                    setCart(data.items || [])
                } else {
                    // Guest → fallback to localStorage
                    const savedCart = localStorage.getItem("cart")
                    setCart(savedCart ? JSON.parse(savedCart) : [])
                }
            } catch {
                // Guest fallback
                const savedCart = localStorage.getItem("cart")
                setCart(savedCart ? JSON.parse(savedCart) : [])
            }
            setLoading(false)
        }

        loadCart()
    }, [])

    const updateQuantity = async (id: string, qty: number) => {
        if (qty <= 0) return
        const newCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
        )
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))

        if (loggedIn) {
            await fetch(`/api/v1/cart/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: qty }),
                credentials: "include",
            })
        }
    }

    const removeItem = async (id: string) => {
        const newCart = cart.filter((item) => item.id !== id)
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))

        if (loggedIn) {
            await fetch(`/api/v1/cart/${id}`, {
                method: "DELETE",
                credentials: "include",
            })
        }
    }

    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

    if (loading) return <p className="p-8">Loading cart...</p>

    if (cart.length === 0)
        return <p className="p-8 text-center text-gray-500">Your cart is empty</p>

    return (
        <div className="max-w-5xl mx-auto pt-24 pb-16 px-4">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            )}
                            <div>
                                <h2 className="font-semibold">{item.name}</h2>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>

                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Cart total */}
            <div className="mt-8 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Checkout
                </Button>
            </div>
        </div>
    )
}
