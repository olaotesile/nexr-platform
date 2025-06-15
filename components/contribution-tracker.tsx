"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Palette, Code, Video, Music, Camera, Plus, Clock, CheckCircle } from "lucide-react"

interface Contribution {
  id: string
  type: "code" | "design" | "document" | "video" | "audio" | "image" | "other"
  title: string
  description: string
  timestamp: Date
  skillTags: string[]
  projectId: string
  verified: boolean
  autoTracked: boolean
}

interface ContributionTrackerProps {
  projectId: string
  userId: string
}

export function ContributionTracker({ projectId, userId }: ContributionTrackerProps) {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [isTracking, setIsTracking] = useState(true)

  // Mock contributions data
  useEffect(() => {
    const mockContributions: Contribution[] = [
      {
        id: "1",
        type: "code",
        title: "Payment Gateway Integration",
        description: "Implemented Stripe payment processing with error handling",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        skillTags: ["React", "Node.js", "Payment Processing"],
        projectId,
        verified: true,
        autoTracked: true,
      },
      {
        id: "2",
        type: "design",
        title: "User Dashboard Mockups",
        description: "Created responsive dashboard designs for mobile and desktop",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        skillTags: ["Figma", "UI/UX Design", "Responsive Design"],
        projectId,
        verified: false,
        autoTracked: false,
      },
      {
        id: "3",
        type: "document",
        title: "API Documentation",
        description: "Comprehensive API documentation with examples",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        skillTags: ["Technical Writing", "API Design"],
        projectId,
        verified: true,
        autoTracked: true,
      },
    ]
    setContributions(mockContributions)
  }, [projectId])

  const getContributionIcon = (type: string) => {
    switch (type) {
      case "code":
        return Code
      case "design":
        return Palette
      case "document":
        return FileText
      case "video":
        return Video
      case "audio":
        return Music
      case "image":
        return Camera
      default:
        return FileText
    }
  }

  const getContributionColor = (type: string) => {
    switch (type) {
      case "code":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
      case "design":
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
      case "document":
        return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "video":
        return "text-red-600 bg-red-100 dark:bg-red-900/30"
      case "audio":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
      case "image":
        return "text-pink-600 bg-pink-100 dark:bg-pink-900/30"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
    }
  }

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="dark:text-white">Your Contributions</CardTitle>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isTracking ? "bg-green-500" : "bg-gray-400"}`} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isTracking ? "Auto-tracking" : "Manual only"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {contributions.map((contribution) => {
          const IconComponent = getContributionIcon(contribution.type)
          const colorClass = getContributionColor(contribution.type)

          return (
            <div key={contribution.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{contribution.title}</h4>
                    <div className="flex items-center gap-2">
                      {contribution.autoTracked && (
                        <Badge variant="outline" className="text-xs">
                          Auto-tracked
                        </Badge>
                      )}
                      {contribution.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{contribution.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {contribution.skillTags.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {contribution.timestamp.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Manual Contribution
        </Button>
      </CardContent>
    </Card>
  )
}
