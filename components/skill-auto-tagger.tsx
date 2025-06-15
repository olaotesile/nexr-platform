"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Star, Plus, X, CheckCircle } from "lucide-react"

interface SkillSuggestion {
  skill: string
  confidence: number
  source: "project" | "contribution" | "ai-detected"
  evidence: string[]
}

interface SkillAutoTaggerProps {
  userId: string
  currentSkills: string[]
  onSkillsUpdate: (skills: string[]) => void
}

export function SkillAutoTagger({ userId, currentSkills, onSkillsUpdate }: SkillAutoTaggerProps) {
  const [suggestions, setSuggestions] = useState<SkillSuggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [pendingSkills, setPendingSkills] = useState<string[]>([])

  // Mock AI skill detection
  useEffect(() => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockSuggestions: SkillSuggestion[] = [
        {
          skill: "API Integration",
          confidence: 95,
          source: "project",
          evidence: ["Payment Gateway Integration", "Database API calls", "Third-party service connections"],
        },
        {
          skill: "Responsive Design",
          confidence: 88,
          source: "contribution",
          evidence: ["Mobile-first dashboard", "Cross-browser compatibility", "CSS Grid layouts"],
        },
        {
          skill: "Technical Writing",
          confidence: 82,
          source: "ai-detected",
          evidence: ["API Documentation", "Project README files", "Code comments quality"],
        },
        {
          skill: "Performance Optimization",
          confidence: 76,
          source: "project",
          evidence: ["Bundle size reduction", "Image optimization", "Lazy loading implementation"],
        },
      ]

      // Filter out skills user already has
      const newSuggestions = mockSuggestions.filter((suggestion) => !currentSkills.includes(suggestion.skill))

      setSuggestions(newSuggestions)
      setIsAnalyzing(false)
    }, 2000)
  }, [currentSkills])

  const addSkill = (skill: string) => {
    if (!pendingSkills.includes(skill)) {
      setPendingSkills([...pendingSkills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setPendingSkills(pendingSkills.filter((s) => s !== skill))
  }

  const applySkills = () => {
    const updatedSkills = [...currentSkills, ...pendingSkills]
    onSkillsUpdate(updatedSkills)
    setPendingSkills([])

    // Remove applied suggestions
    setSuggestions(suggestions.filter((s) => !pendingSkills.includes(s.skill)))
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100 dark:bg-green-900/30"
    if (confidence >= 80) return "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
    if (confidence >= 70) return "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
    return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "project":
        return Star
      case "contribution":
        return TrendingUp
      case "ai-detected":
        return Brain
      default:
        return CheckCircle
    }
  }

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <Brain className="h-5 w-5 text-purple-500" />
          AI Skill Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-6 w-6 text-purple-600 animate-pulse" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Analyzing your projects and contributions...</p>
            <Progress value={75} className="w-full max-w-xs mx-auto" />
          </div>
        ) : (
          <>
            {suggestions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Suggested Skills</h4>
                {suggestions.map((suggestion, index) => {
                  const SourceIcon = getSourceIcon(suggestion.source)
                  const isSelected = pendingSkills.includes(suggestion.skill)

                  return (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-white">{suggestion.skill}</h5>
                            <div
                              className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(suggestion.confidence)}`}
                            >
                              {suggestion.confidence}% confidence
                            </div>
                            <SourceIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <p className="mb-1">Evidence:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {suggestion.evidence.map((evidence, idx) => (
                                <li key={idx}>{evidence}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          onClick={() => (isSelected ? removeSkill(suggestion.skill) : addSkill(suggestion.skill))}
                          className={isSelected ? "bg-purple-600 hover:bg-purple-700" : ""}
                        >
                          {isSelected ? (
                            <>
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {pendingSkills.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium text-gray-900 dark:text-white">Skills to Add ({pendingSkills.length})</h5>
                  <Button onClick={applySkills} className="bg-purple-600 hover:bg-purple-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Apply Changes
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pendingSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {suggestions.length === 0 && !isAnalyzing && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">
                  Great! Your skills are up to date. Keep working on projects to discover new skills.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
