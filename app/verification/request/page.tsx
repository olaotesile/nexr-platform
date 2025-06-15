"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, Upload, Plus, X, Send, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RequestVerification() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "contribution",
    skillsClaimed: [] as string[],
    evidence: [] as string[],
    selectedValidators: [] as string[],
    urgency: "medium",
  })
  const [newSkill, setNewSkill] = useState("")
  const [newEvidence, setNewEvidence] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock team members
  const teamMembers = [
    { id: "1", name: "Sarah Chen", avatar: "SC", expertise: ["React", "TypeScript", "Frontend"] },
    { id: "2", name: "Mike Johnson", avatar: "MJ", expertise: ["Node.js", "PostgreSQL", "Backend"] },
    { id: "3", name: "Alex Rivera", avatar: "AR", expertise: ["UI/UX", "Figma", "Design"] },
    { id: "4", name: "Emma Wilson", avatar: "EW", expertise: ["Product", "Strategy", "Management"] },
  ]

  const addSkill = () => {
    if (newSkill && !formData.skillsClaimed.includes(newSkill)) {
      setFormData((prev) => ({
        ...prev,
        skillsClaimed: [...prev.skillsClaimed, newSkill],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skillsClaimed: prev.skillsClaimed.filter((s) => s !== skill),
    }))
  }

  const addEvidence = () => {
    if (newEvidence && !formData.evidence.includes(newEvidence)) {
      setFormData((prev) => ({
        ...prev,
        evidence: [...prev.evidence, newEvidence],
      }))
      setNewEvidence("")
    }
  }

  const removeEvidence = (evidence: string) => {
    setFormData((prev) => ({
      ...prev,
      evidence: prev.evidence.filter((e) => e !== evidence),
    }))
  }

  const toggleValidator = (validatorId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedValidators: prev.selectedValidators.includes(validatorId)
        ? prev.selectedValidators.filter((id) => id !== validatorId)
        : [...prev.selectedValidators, validatorId],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    router.push("/verification?tab=validation")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/verification">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Verification
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Request Peer Verification</h1>
            <p className="text-gray-600 dark:text-gray-300">Get your work verified by trusted team members</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Contribution Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Payment Gateway Implementation"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you built, the challenges you solved, and the impact..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Verification Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="contribution">Contribution Verification</option>
                    <option value="skill">Skill Endorsement</option>
                    <option value="project">Project Review</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="urgency">Priority</Label>
                  <select
                    id="urgency"
                    value={formData.urgency}
                    onChange={(e) => setFormData((prev) => ({ ...prev, urgency: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills to Verify */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Skills to Verify</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill to verify..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skillsClaimed.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skillsClaimed.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Evidence & Documentation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add evidence (GitHub link, file, screenshot, etc.)"
                  value={newEvidence}
                  onChange={(e) => setNewEvidence(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEvidence())}
                />
                <Button type="button" onClick={addEvidence}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.evidence.length > 0 && (
                <div className="space-y-2">
                  {formData.evidence.map((evidence, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-sm">{evidence}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeEvidence(evidence)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Upload files or drag and drop</p>
                <Button type="button" variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Select Validators */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Users className="h-5 w-5" />
                Select Validators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose team members who can best validate your contribution. We recommend selecting 2-3 validators.
              </p>

              <div className="grid gap-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.selectedValidators.includes(member.id)
                        ? "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => toggleValidator(member.id)}
                  >
                    <Checkbox
                      checked={formData.selectedValidators.includes(member.id)}
                      onChange={() => toggleValidator(member.id)}
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.expertise.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-between">
            <Link href="/verification">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={
                isSubmitting || !formData.title || !formData.description || formData.selectedValidators.length === 0
              }
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Verification Request
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
