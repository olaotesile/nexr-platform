"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, X, Star, AlertTriangle, FileText } from "lucide-react"

interface PeerConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  contribution: {
    id: string
    title: string
    description: string
    contributor: {
      name: string
      avatar: string
      reputation: number
    }
    type: "code" | "design" | "document" | "video" | "audio"
    evidence: string[]
    skillsClaimed: string[]
  }
  onConfirm: (confirmation: {
    verified: boolean
    skillsConfirmed: string[]
    comments: string
    rating: number
  }) => void
}

export function PeerConfirmationModal({ isOpen, onClose, contribution, onConfirm }: PeerConfirmationModalProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleConfirm = async (verified: boolean) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onConfirm({
      verified,
      skillsConfirmed: selectedSkills,
      comments,
      rating,
    })

    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Verify Contribution
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contributor Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={contribution.contributor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{contribution.contributor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{contribution.contributor.name}</h4>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {contribution.contributor.reputation} reputation
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contribution Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{contribution.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">{contribution.description}</p>

              <div>
                <h5 className="font-medium mb-2">Skills Claimed:</h5>
                <div className="flex flex-wrap gap-2">
                  {contribution.skillsClaimed.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {selectedSkills.includes(skill) && <CheckCircle className="h-3 w-3 mr-1" />}
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Click to confirm which skills this contribution demonstrates
                </p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Evidence:</h5>
                <div className="space-y-2">
                  {contribution.evidence.map((evidence, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm">{evidence}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardContent className="p-4">
              <h5 className="font-medium mb-3">Rate the quality of this contribution:</h5>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="ghost" size="sm" onClick={() => setRating(star)} className="p-1">
                    <Star
                      className={`h-6 w-6 ${star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardContent className="p-4">
              <h5 className="font-medium mb-3">Additional Comments (Optional):</h5>
              <Textarea
                placeholder="Provide feedback or additional context for your verification..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">Verification Responsibility</p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                Your verification will be recorded on the blockchain and affects both your and the contributor's
                reputation. Please verify only contributions you can genuinely assess.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={() => handleConfirm(false)} variant="outline" disabled={isSubmitting} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cannot Verify
            </Button>
            <Button
              onClick={() => handleConfirm(true)}
              disabled={isSubmitting || selectedSkills.length === 0 || rating === 0}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isSubmitting ? "Verifying..." : "Verify Contribution"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
