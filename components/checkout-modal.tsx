"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { X, CreditCard, Shield, Lock, ShoppingBag, Loader2 } from "lucide-react"

type CartItem = {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
}

interface CheckoutModalProps {
    open: boolean
    onClose: () => void
    cart: CartItem[]
}

export default function CheckoutModal({ open, onClose, cart }: CheckoutModalProps) {
    const router = useRouter()
    const { isAuthenticated, user } = useAuth()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [provider, setProvider] = useState<"PAYSTACK" | "PAYPAL">("PAYSTACK")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [open])

    if (!open) return null

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

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
        setError(null)

        try {
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

            const payRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/${orderId}/init/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ provider }),
            })

            const payData = await payRes.json()
            if (!payRes.ok) throw new Error(payData.message || "Payment init failed")

            if (payData.authorization_url) {
                window.location.href = payData.authorization_url
            } else if (payData.approval_url) {
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

    const formatCardNumber = (value: string) => {
        return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }

    const formatExpiry = (value: string) => {
        return value.replace(/\//g, '').replace(/(\d{2})(\d{2})/, '$1/$2')
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div
                className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-2xl max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <ShoppingBag className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Checkout</h1>
                            <p className="text-sm text-gray-400">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors duration-200 group"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <h3 className="font-semibold text-white mb-3">Order Summary</h3>
                        <div className="space-y-2">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-gray-300">
                                        {item.name} × {item.quantity}
                                    </span>
                                    <span className="text-white font-medium">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 mt-3 pt-3">
                            <div className="flex justify-between items-center font-semibold">
                                <span className="text-white">Total</span>
                                <span className="text-purple-400 text-lg">${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Provider Selection */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-white">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setProvider("PAYSTACK")}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                    provider === "PAYSTACK"
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-gray-700 bg-gray-800/50 hover:border-purple-500/50"
                                }`}
                            >
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <span className="text-white text-xs font-bold">PS</span>
                                    </div>
                                    <span className="text-white text-sm font-medium">Paystack</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setProvider("PAYPAL")}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                    provider === "PAYPAL"
                                        ? "border-purple-500 bg-purple-500/10"
                                        : "border-gray-700 bg-gray-800/50 hover:border-purple-500/50"
                                }`}
                            >
                                <div className="text-center">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <span className="text-white text-xs font-bold">PP</span>
                                    </div>
                                    <span className="text-white text-sm font-medium">PayPal</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Card Details */}
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-white">Card Number</label>
                            <div className="relative">
                                <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <Input
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    maxLength={19}
                                    className="bg-gray-800 border-gray-700 text-white pl-10 focus:border-purple-500 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-white">Expiry Date</label>
                                <Input
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                    maxLength={5}
                                    className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/20"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-white">CVV</label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <Input
                                        placeholder="123"
                                        value={cvv}
                                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                        maxLength={3}
                                        className="bg-gray-800 border-gray-700 text-white pl-10 focus:border-purple-500 focus:ring-purple-500/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span>Your payment is secured with SSL encryption</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-purple-500/20">
                    <Button
                        size="lg"
                        disabled={isSubmitting}
                        onClick={handlePayment}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-purple-500/25 border-0"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processing Payment...
                            </>
                        ) : (
                            <>
                                <Lock className="w-5 h-5 mr-2" />
                                Pay ${totalAmount.toFixed(2)} with {provider}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}