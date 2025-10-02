"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function CheckoutPage() {
    const router = useRouter()
    const { isAuthenticated, user } = useAuth()

    const [cart, setCart] = useState<any[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [provider, setProvider] = useState<"PAYSTACK" | "PAYPAL">("PAYSTACK")

    // Load cart
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) setCart(JSON.parse(savedCart))
    }, [])

    const handlePayment = async () => {
        if (!isAuthenticated) {
            setError("Please sign in before proceeding to payment.")
            return
        }
        if (cart.length === 0) {
            setError("Your cart is empty.")
            return
        }

        setIsSubmitting(true)
        try {
            // Create Order
            const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    userId: user?.id,
                    items: cart.map(p => ({
                        productId: p.id,
                        quantity: p.quantity || 1,
                        price: p.price,
                    })),
                    payment: { provider, status: "INITIATED" },
                }),
            })

            const orderData = await orderRes.json()
            if (!orderRes.ok) throw new Error(orderData.message || "Failed to create order")

            const orderId = orderData.orderId

            // 2️Initialize Payment
            const payRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/${orderId}/init/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ provider }),
            })

            const payData = await payRes.json()
            if (!payRes.ok) throw new Error(payData.message || "Payment init failed")

            // Redirect to Gateway
            if (payData.authorization_url) {
                // Paystack checkout
                window.location.href = payData.authorization_url
            } else if (payData.approval_url) {
                // PayPal checkout
                window.location.href = payData.approval_url
            } else {
                throw new Error("No redirect URL from payment init")
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto pt-24 px-4">
            <h1 className="text-2xl font-bold mb-6">Checkout / Payment</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Provider Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Payment Provider</label>
                <select
                    className="w-full border rounded-md px-3 py-2"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value as "PAYSTACK" | "PAYPAL")}
                >
                    <option value="PAYSTACK">Paystack</option>
                    <option value="PAYPAL">PayPal</option>
                </select>
            </div>

            {/* Fake card form (not used directly) */}
            <Input placeholder="Card Number" className="mb-4" />
            <Input placeholder="Expiry MM/YY" className="mb-4" />
            <Input placeholder="CVV" className="mb-4" />

            <Button size="lg" disabled={isSubmitting} onClick={handlePayment}>
                {isSubmitting ? "Processing..." : `Pay with ${provider}`}
            </Button>
        </div>
    )
}
