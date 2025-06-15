"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Simple redirect logic without complex state management
    const checkAuthAndRedirect = () => {
      try {
        if (typeof window !== "undefined") {
          const userProfile = localStorage.getItem("userProfile")

          if (userProfile) {
            router.replace("/dashboard")
          } else {
            router.replace("/auth/signup")
          }
        }
      } catch (error) {
        // Fallback to signup if there's any error
        router.replace("/auth/signup")
      }
    }

    // Small delay to ensure proper hydration
    const timer = setTimeout(checkAuthAndRedirect, 50)

    return () => clearTimeout(timer)
  }, [router])

  // Simple loading state - no complex conditional rendering
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <img src="/images/nexr-logo.png" alt="Nexr" className="h-20 w-auto mx-auto mb-4 animate-pulse" />
        <p className="text-gray-600 dark:text-gray-300">Loading Nexr...</p>
      </div>
    </div>
  )
}
