"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PeerConfirmationModal } from "./peer-confirmation-modal"
import { Users, CheckCircle, Clock, MessageSquare, Star, Eye } from "lucide-react"

interface TeamValidationInterfaceProps {
  projectId: string
  currentUserId: string
}

interface ValidationRequest {
  id: string
  type: "skill_endorsement" | "contribution_verification" | "peer_review"
  requester: {
    id: string
    name: string
    avatar: string
    reputation: number
  }
  title: string
  description: string
  skillsClaimed?: string[]
  evidence: string[]
  timestamp: Date
  urgency: "low" | "medium" | "high"
  status: "pending" | "completed" | "expired"
}

export function TeamValidationInterface({ projectId, currentUserId }: TeamValidationInterfaceProps) {
  const [activeTab, setActiveTab] = useState("pending")
  const [selectedRequest, setSelectedRequest] = useState<ValidationRequest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock data - would come from API
  const validationRequests: ValidationRequest[] = [
    {
      id: "1",
      type: "contribution_verification",
      requester: {
        id: "user1",
        name: "Sarah Chen",
        avatar: "SC",
        reputation: 4.8,
      },
      title: "Frontend Component Library",
      description: "Built reusable React components with TypeScript and Storybook documentation",
      skillsClaimed: ["React", "TypeScript", "Component Design", "Documentation"],
      evidence: [
        "GitHub repository with 50+ components",
        "Storybook documentation site",
        "Unit tests with 95% coverage",
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      urgency: "high",
      status: "pending",
    },
    {
      id: "2",
      type: "skill_endorsement",
      requester: {
        id: "user2",
        name: "Mike Johnson",
        avatar: "MJ",
        reputation: 4.6,
      },
      title: "Backend Architecture Skills",
      description: "Seeking endorsement for microservices architecture and database optimization skills",
      skillsClaimed: ["Microservices", "PostgreSQL", "Redis", "Docker"],
      evidence: ["System architecture diagrams", "Performance optimization results", "Code review feedback"],
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      urgency: "medium",
      status: "pending",
    },
    {
      id: "3",
      type: "peer_review",
      requester: {
        id: "user3",
        name: "Alex Rivera",
        avatar: "AR",
        reputation: 4.9,
      },
      title: "UX Research Methodology",
      description: "Conducted user interviews and usability testing for mobile app redesign",
      skillsClaimed: ["User Research", "Usability Testing", "Data Analysis"],
      evidence: [
        "Research plan and methodology",
        "Interview transcripts and analysis",
        "Usability test results and recommendations",
      ],
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      urgency: "low",
      status: "pending",
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      case "low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contribution_verification":
        return CheckCircle
      case "skill_endorsement":
        return Star
      case "peer_review":
        return Eye
      default:
        return MessageSquare
    }
  }

  const handleValidationClick = (request: ValidationRequest) => {
    setSelectedRequest(request)
    setIsModalOpen(true)
  }

  const handleValidationComplete = (result: any) => {
    // Handle validation result
    console.log("Validation completed:", result)
    setSelectedRequest(null)
  }

  const pendingRequests = validationRequests.filter((r) => r.status === "pending")
  const completedRequests = validationRequests.filter((r) => r.status === "completed")

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-white">
            <Users className="h-5 w-5" />
            Team Validation Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingRequests.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({completedRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 mt-6">
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Pending Validations</h3>
                  <p className="text-gray-600 dark:text-gray-300">All team validation requests have been processed.</p>
                </div>
              ) : (
                pendingRequests.map((request) => {
                  const TypeIcon = getTypeIcon(request.type)

                  return (
                    <Card key={request.id} className="border border-gray-200 dark:border-gray-700">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={`/placeholder.svg`} />
                            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                              {request.requester.avatar}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{request.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">by {request.requester.name}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <TypeIcon className="h-3 w-3" />
                                  {request.type.replace("_", " ")}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{request.description}</p>

                            {request.skillsClaimed && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Skills to validate:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {request.skillsClaimed.map((skill, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4" />
                                  <span>{request.requester.reputation}</span>
                                </div>
                                <span>{request.timestamp.toLocaleString()}</span>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => handleValidationClick(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleValidationClick(request)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Validate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-6">
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Completed Validations Yet</h3>
                <p className="text-gray-600 dark:text-gray-300">Completed validations will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Peer Confirmation Modal */}
      {selectedRequest && (
        <PeerConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contribution={{
            id: selectedRequest.id,
            title: selectedRequest.title,
            description: selectedRequest.description,
            contributor: selectedRequest.requester,
            type: "code", // This would be determined from the request
            evidence: selectedRequest.evidence,
            skillsClaimed: selectedRequest.skillsClaimed || [],
          }}
          onConfirm={handleValidationComplete}
        />
      )}
    </div>
  )
}
