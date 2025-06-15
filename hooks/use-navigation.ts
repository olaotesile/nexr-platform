"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useNavigation() {
  const router = useRouter()
  const [previousPath, setPreviousPath] = useState<string>("/dashboard")

  useEffect(() => {
    // Store the current path as previous when component mounts
    const currentPath = window.location.pathname
    const stored = sessionStorage.getItem("previousPath")
    if (stored && stored !== currentPath) {
      setPreviousPath(stored)
    }

    // Store current path for next navigation
    sessionStorage.setItem("previousPath", currentPath)
  }, [])

  const goBack = () => {
    if (previousPath && previousPath !== window.location.pathname) {
      router.push(previousPath)
    } else {
      router.push("/dashboard")
    }
  }

  return { goBack, previousPath }
}
