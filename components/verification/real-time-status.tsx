"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Users, Zap, Bell } from "lucide-react"

interface RealTimeStatusProps {
  userId: string
}

interface VerificationStatus {
  type: "contribution" | "skill" | "project" | "peer_review"
  id: string
  title: string
  status: "pending" | "in_progress" | "completed" | "failed"
  progress: number
  requiredVerifications: number
  currentVerifications: number
  estimatedCompletion?: Date
  priority: "low" | "medium" | "high"
  lastActivity: Date
}

export function RealTimeVerificationStatus({ userId }: RealTimeStatusProps) {
  const [verificationStatuses, setVerificationStatuses] = useState<VerificationStatus[]>([])
  const [isConnected, setIsConnected] = useState(true)

  // Mock real-time data - in real app this would be WebSocket/SSE
  useEffect(() => {
    const mockStatuses: VerificationStatus[] = [
      {
        type: "contribution",
        id: "1",
        title: "Payment Gateway Implementation",
        status: "in_progress",
        progress: 66,
        requiredVerifications: 3,
        currentVerifications: 2,
        estimatedCompletion: new Date(Date.now() + 2 * 60 * 60 * 1000),
        priority: "high",
        lastActivity: new Date(Date.now() - 15 * 60 * 1000),
      },
      {
        type: "skill",
        id: "2",
        title: "React Expertise Endorsement",
        status: "pending",
        progress: 20,
        requiredVerifications: 5,
        currentVerifications: 1,
        priority: "medium",
        lastActivity: new Date(Date.now() - 45 * 60 * 1000),
      },
      {
        type: "project",
        id: "3",
        title: "E-commerce Platform Verification",
        status: "completed",
        progress: 100,
        requiredVerifications: 3,
        currentVerifications: 3,
        priority: "high",
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ]

    setVerificationStatuses(mockStatuses)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVerificationStatuses((prev) =>
        prev.map((status) => {
          if (status.status === "in_progress" && Math.random() > 0.7) {
            const newProgress = Math.min(status.progress + Math.floor(Math.random() * 10), 100)
            const newVerifications = Math.min(
              status.currentVerifications + (newProgress > status.progress + 5 ? 1 : 0),
              status.requiredVerifications,
            )

            return {
              ...status,
              progress: newProgress,
              currentVerifications: newVerifications,
              status: newProgress === 100 ? "completed" : status.status,
              lastActivity: new Date(),
            }
          }
          return status
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          text: "Completed",
        }
      case "in_progress":
        return {
          icon: Clock,
          color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
          text: "In Progress",
        }
      case "pending":
        return {
          icon: Clock,
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          text: "Pending",
        }
      case "failed":
        return {
          icon: AlertCircle,
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          text: "Failed",
        }
      default:
        return {
          icon: Clock,
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
          text: "Unknown",
        }
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-orange-500"
      case "low":
        return "border-l-gray-500"
      default:
        return "border-l-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contribution":
        return "🔧"
      case "skill":
        return "⭐"
      case "project":
        return "📁"
      case "peer_review":
        return "👥"
      default:
        return "📋"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
            <h3 className="font-semibold text-gray-900 dark:text-white">Verification Status</h3>
            <Badge variant="secondary" className="text-xs">
              {verificationStatuses.length} active
            </Badge>
          </div>
          <Button size="sm" variant="ghost">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {verificationStatuses.length === 0 ? (
            <div className="text-center py-6">
              <CheckCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">No active verifications</p>
            </div>
          ) : (
            verificationStatuses.map((verification) => {
              const statusConfig = getStatusConfig(verification.status)
              const StatusIcon = statusConfig.icon

              return (
                <Card
                  key={verification.id}
                  className={`border-l-4 ${getPriorityColor(verification.priority)} bg-gray-50 dark:bg-gray-700/50`}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{getTypeIcon(verification.type)}</span>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white">{verification.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                            {verification.type.replace("_", " ")}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig.text}
                      </Badge>
                    </div>

                    {verification.status !== "completed" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 dark:text-gray-400">
                            {verification.currentVerifications} of {verification.requiredVerifications} verifications
                          </span>
                          <span className="font-medium">{verification.progress}%</span>
                        </div>
                        <Progress value={verification.progress} className="h-1.5" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {verification.currentVerifications}/{verification.requiredVerifications}
                          </span>
                        </div>
                        {verification.estimatedCompletion && verification.status === "in_progress" && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              ~{Math.ceil((verification.estimatedCompletion.getTime() - Date.now()) / (1000 * 60 * 60))}
                              h
                            </span>
                          </div>
                        )}
                      </div>
                      <span>{formatTimeAgo(verification.lastActivity)}</span>
                    </div>

                    {verification.status === "in_progress" && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                        <Zap className="h-3 w-3" />
                        <span>Active verification in progress</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {verificationStatuses.filter((v) => v.status === "completed").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Completed</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {verificationStatuses.filter((v) => v.status === "in_progress").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">In Progress</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {verificationStatuses.filter((v) => v.status === "pending").length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Pending</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
