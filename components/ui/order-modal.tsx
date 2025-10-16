"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type OrderItem = {
    id: string
    product_id: string
    product_name: string
    unit_price: number
    quantity: number
    subtotal: number
}

interface OrderModalProps {
    open: boolean
    onClose: () => void
    orderId: string
}

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED"

export default function OrderModal({ open, onClose, orderId }: OrderModalProps) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [order, setOrder] = useState<{
        id: string
        status: OrderStatus
        items: OrderItem[]
        total_amount: number
        created_at: string
    } | null>(null)

    // Fetch order details
    useEffect(() => {
        if (!open || !orderId) return

        const fetchOrder = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/${orderId}/`, {
                    credentials: "include",
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.message || "Failed to fetch order")
                setOrder(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [open, orderId])

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg max-w-xl w-full p-6 relative shadow-lg">
                <button
                    className="absolute top-4 right-4 text-gray-500"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h1 className="text-2xl font-bold mb-4">Order Details</h1>

                {loading && <p>Loading order...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {order && (
                    <>
                        <div className="mb-4">
                            <p><span className="font-semibold">Order ID:</span> {order.id}</p>
                            <p><span className="font-semibold">Created At:</span> {new Date(order.created_at).toLocaleString()}</p>
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                <span
                                    className={
                                        order.status === "PAID" || order.status === "DELIVERED"
                                            ? "text-green-600"
                                            : order.status === "CANCELLED"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                    }
                                >
                  {order.status}
                </span>
                            </p>
                        </div>

                        <div className="mb-4 border-t pt-2">
                            <h2 className="text-lg font-semibold mb-2">Items</h2>
                            <ul className="space-y-2">
                                {order.items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="flex justify-between items-center border-b pb-1"
                                    >
                                        <span>{item.product_name} × {item.quantity}</span>
                                        <span>${item.subtotal}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-right font-bold mt-2">
                                Total: ${order.total_amount}
                            </p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={onClose}>Close</Button>
                            <Button
                                onClick={() => window.location.reload()}
                                disabled={loading}
                            >
                                Refresh Status
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
