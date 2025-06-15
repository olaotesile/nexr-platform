"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VerificationBadge } from "./verification-badge"
import {
  GitBranch,
  FileText,
  Palette,
  Code,
  Video,
  Music,
  Camera,
  Clock,
  ExternalLink,
  Shield,
  Hash,
} from "lucide-react"

interface ContributionTimelineProps {
  userId: string
  projectId?: string
}

interface TimelineContribution {
  id: string
  type: "code" | "design" | "document" | "video" | "audio" | "image"
  title: string
  description: string
  timestamp: Date
  skillTags: string[]
  verificationStatus: "verified" | "pending" | "unverified"
  verifierCount: number
  proofHash?: string
  blockchainTx?: string
  evidence: {
    type: "commit" | "file" | "link" | "screenshot"
    url: string
    description: string
  }[]
}

export function ContributionTimeline({ userId, projectId }: ContributionTimelineProps) {
  const [selectedContribution, setSelectedContribution] = useState<string | null>(null)

  // Mock data - would come from API
  const contributions: TimelineContribution[] = [
    {
      id: "1",
      type: "code",
      title: "Payment Gateway Integration",
      description: "Implemented Stripe payment processing with comprehensive error handling and webhook support",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      skillTags: ["React", "Node.js", "Payment Processing", "API Integration"],
      verificationStatus: "verified",
      verifierCount: 3,
      proofHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      blockchainTx: "0xabcdef1234567890",
      evidence: [
        {
          type: "commit",
          url: "https://github.com/user/repo/commit/abc123",
          description: "Initial payment gateway implementation",
        },
        {
          type: "commit",
          url: "https://github.com/user/repo/commit/def456",
          description: "Added webhook handling and error recovery",
        },
      ],
    },
    {
      id: "2",
      type: "design",
      title: "User Dashboard Mockups",
      description: "Created responsive dashboard designs for mobile and desktop with accessibility considerations",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      skillTags: ["Figma", "UI/UX Design", "Responsive Design", "Accessibility"],
      verificationStatus: "pending",
      verifierCount: 1,
      evidence: [
        {
          type: "file",
          url: "/designs/dashboard-mockup.fig",
          description: "Figma design file with all components",
        },
        {
          type: "screenshot",
          url: "/images/dashboard-preview.png",
          description: "Preview of responsive layouts",
        },
      ],
    },
    {
      id: "3",
      type: "document",
      title: "API Documentation",
      description: "Comprehensive API documentation with examples, authentication guides, and rate limiting info",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      skillTags: ["Technical Writing", "API Design", "Documentation"],
      verificationStatus: "verified",
      verifierCount: 2,
      proofHash: "0x9876543210fedcba",
      evidence: [
        {
          type: "link",
          url: "https://docs.example.com/api",
          description: "Published API documentation",
        },
      ],
    },
  ]

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
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <GitBranch className="h-5 w-5" />
          Verified Contribution Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

          {contributions.map((contribution, index) => {
            const IconComponent = getContributionIcon(contribution.type)
            const colorClass = getContributionColor(contribution.type)
            const isExpanded = selectedContribution === contribution.id

            return (
              <div key={contribution.id} className="relative flex gap-4 pb-6">
                {/* Timeline dot */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass} relative z-10`}>
                  <IconComponent className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Card className="border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{contribution.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{contribution.description}</p>
                        </div>
                        <VerificationBadge
                          type="contribution"
                          status={contribution.verificationStatus}
                          verifierCount={contribution.verifierCount}
                          lastVerified={contribution.timestamp}
                          details={{
                            verifiers: [],
                            proofHash: contribution.proofHash,
                            blockchainTx: contribution.blockchainTx,
                          }}
                        />
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {contribution.skillTags.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Timestamp and proof */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>{contribution.timestamp.toLocaleString()}</span>
                        </div>
                        {contribution.proofHash && (
                          <div className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            <code className="text-xs">{contribution.proofHash.slice(0, 8)}...</code>
                          </div>
                        )}
                      </div>

                      {/* Evidence preview */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">Evidence:</h5>
                        <div className="grid gap-2">
                          {contribution.evidence.slice(0, isExpanded ? undefined : 2).map((evidence, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {evidence.description}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{evidence.type}</p>
                              </div>
                              <Button size="sm" variant="ghost" className="ml-2">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        {contribution.evidence.length > 2 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedContribution(isExpanded ? null : contribution.id)}
                            className="w-full"
                          >
                            {isExpanded ? "Show Less" : `Show ${contribution.evidence.length - 2} More`}
                          </Button>
                        )}
                      </div>

                      {/* Blockchain verification */}
                      {contribution.verificationStatus === "verified" && contribution.blockchainTx && (
                        <div className="mt-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm text-green-700 dark:text-green-300">Verified on blockchain</span>
                            <Button size="sm" variant="ghost" className="ml-auto">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
