"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                className="flex flex-col items-center gap-6"
            >
                {/* Spinner */}
                <Loader2 className="w-14 h-14 text-white animate-spin" />

                {/* Loading Text */}
                <p className="text-white text-lg md:text-xl font-semibold tracking-wide">
                    Loading, please wait...
                </p>

                {/* Skeleton shimmer preview (optional) */}
                <div className="flex flex-col gap-4 w-64">
                    <div className="h-6 bg-white/10 rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-white/10 rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-white/10 rounded-lg animate-pulse"></div>
                </div>
            </motion.div>
        </div>
    )
}
