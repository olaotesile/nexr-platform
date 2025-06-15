"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { VerificationBadge } from "./verification-badge"
import { Star, Plus, MessageSquare, TrendingUp, Award, Clock, ThumbsUp } from "lucide-react"

interface SkillEndorsementSystemProps {
  userId: string
  isOwnProfile?: boolean
}

interface Skill {
  id: string
  name: string
  level: "beginner" | "intermediate" | "advanced" | "expert"
  endorsements: {
    count: number
    recentEndorsers: {
      name: string
      avatar: string
      relationship: "colleague" | "client" | "manager" | "peer"
      date: Date
      comment?: string
    }[]
  }
  verificationStatus: "verified" | "pending" | "unverified"
  evidence: {
    projects: number
    contributions: number
    certifications: number
  }
  trending: boolean
}

interface EndorsementRequest {
  skillId: string
  skillName: string
  requesterName: string
  requesterAvatar: string
  relationship: string
  message: string
  evidence: string[]
}

export function SkillEndorsementSystem({ userId, isOwnProfile = false }: SkillEndorsementSystemProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [isEndorseModalOpen, setIsEndorseModalOpen] = useState(false)
  const [endorsementComment, setEndorsementComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data - would come from API
  const skills: Skill[] = [
    {
      id: "1",
      name: "React",
      level: "expert",
      endorsements: {
        count: 24,
        recentEndorsers: [
          {
            name: "Sarah Chen",
            avatar: "SC",
            relationship: "colleague",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            comment: "Exceptional React skills, built complex components with great performance",
          },
          {
            name: "Mike Johnson",
            avatar: "MJ",
            relationship: "manager",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            comment: "Led our React migration project flawlessly",
          },
        ],
      },
      verificationStatus: "verified",
      evidence: {
        projects: 12,
        contributions: 89,
        certifications: 2,
      },
      trending: true,
    },
    {
      id: "2",
      name: "TypeScript",
      level: "advanced",
      endorsements: {
        count: 18,
        recentEndorsers: [
          {
            name: "Alex Rivera",
            avatar: "AR",
            relationship: "peer",
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          },
        ],
      },
      verificationStatus: "verified",
      evidence: {
        projects: 8,
        contributions: 45,
        certifications: 1,
      },
      trending: false,
    },
    {
      id: "3",
      name: "UI/UX Design",
      level: "intermediate",
      endorsements: {
        count: 12,
        recentEndorsers: [
          {
            name: "Emma Wilson",
            avatar: "EW",
            relationship: "client",
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            comment: "Great eye for user experience and clean design",
          },
        ],
      },
      verificationStatus: "pending",
      evidence: {
        projects: 6,
        contributions: 23,
        certifications: 0,
      },
      trending: true,
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "advanced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "intermediate":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "beginner":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getLevelProgress = (level: string) => {
    switch (level) {
      case "expert":
        return 100
      case "advanced":
        return 75
      case "intermediate":
        return 50
      case "beginner":
        return 25
      default:
        return 0
    }
  }

  const handleEndorse = async () => {
    if (!selectedSkill) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update skill endorsements (in real app, this would trigger a refetch)
    console.log("Endorsed skill:", selectedSkill.name, "with comment:", endorsementComment)

    setIsSubmitting(false)
    setIsEndorseModalOpen(false)
    setEndorsementComment("")
    setSelectedSkill(null)
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg dark:bg-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Award className="h-5 w-5" />
              Skills &amp; Endorsements
            </CardTitle>
            {isOwnProfile && (
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="border border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                      <Badge className={getLevelColor(skill.level)}>{skill.level}</Badge>
                      {skill.trending && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <VerificationBadge
                        type="skill"
                        status={skill.verificationStatus}
                        level={skill.level}
                        verifierCount={skill.endorsements.count}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Skill Level</span>
                        <span className="font-medium capitalize">{skill.level}</span>
                      </div>
                      <Progress value={getLevelProgress(skill.level)} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{skill.evidence.projects}</p>
                        <p className="text-gray-600 dark:text-gray-400">Projects</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{skill.evidence.contributions}</p>
                        <p className="text-gray-600 dark:text-gray-400">Contributions</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{skill.evidence.certifications}</p>
                        <p className="text-gray-600 dark:text-gray-400">Certifications</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{skill.endorsements.count} endorsements</span>
                    </div>
                    <div className="flex -space-x-2">
                      {skill.endorsements.recentEndorsers.slice(0, 3).map((endorser, idx) => (
                        <Avatar key={idx} className="h-6 w-6 border-2 border-white dark:border-gray-800">
                          <AvatarFallback className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            {endorser.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {skill.endorsements.count > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            +{skill.endorsements.count - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedSkill(skill)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {!isOwnProfile && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedSkill(skill)
                          setIsEndorseModalOpen(true)
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Endorse
                      </Button>
                    )}
                  </div>
                </div>

                {/* Recent endorsements preview */}
                {skill.endorsements.recentEndorsers.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Endorsements</h5>
                    <div className="space-y-2">
                      {skill.endorsements.recentEndorsers.slice(0, 2).map((endorser, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs">
                              {endorser.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{endorser.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {endorser.relationship}
                              </Badge>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {endorser.date.toLocaleDateString()}
                              </span>
                            </div>
                            {endorser.comment && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">"{endorser.comment}"</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Endorse Skill Modal */}
      <Dialog open={isEndorseModalOpen} onOpenChange={setIsEndorseModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Endorse {selectedSkill?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your endorsement will be recorded on the blockchain and contribute to this person's verified skill
                profile.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Add a comment (optional)
              </label>
              <Textarea
                placeholder="Share your experience working with this person's skills..."
                value={endorsementComment}
                onChange={(e) => setEndorsementComment(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsEndorseModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleEndorse} disabled={isSubmitting} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Endorsing...
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Endorse Skill
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
