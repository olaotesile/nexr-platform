"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ArrowRight, User, Linkedin, Github, Twitter, Upload, Sparkles, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    username: "",
    displayName: "",
    preferredName: "",
    bio: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    twitter: "",
    skills: [] as string[],
    avatar: "",
  })

  const [newSkill, setNewSkill] = useState("")

  const totalSteps = 4

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      setProgress(((currentStep + 1) / totalSteps) * 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setProgress(((currentStep - 1) / totalSteps) * 100)
    }
  }

  const handleComplete = () => {
    // Store profile data in localStorage for now (will be replaced with backend)
    localStorage.setItem("userProfile", JSON.stringify(profileData))
    // Redirect directly to dashboard instead of welcome page
    router.push("/dashboard")
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profileData.username && profileData.displayName
      case 2:
        return profileData.bio
      case 3:
        return true // Social links are optional
      case 4:
        return profileData.preferredName
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/images/nexr-logo.png" alt="Nexr" className="h-12 w-auto" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Complete Your Profile</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Let's set up your profile to help others discover your work and skills
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-2xl dark:bg-gray-800">
            <CardContent className="p-8">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Basic Information</h2>
                    <p className="text-gray-600 dark:text-gray-300">Tell us about yourself</p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-purple-600 text-white text-2xl">
                          {profileData.displayName ? profileData.displayName.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        onClick={() => {
                          /* Handle avatar upload */
                        }}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="username">Username *</Label>
                      <Input
                        id="username"
                        placeholder="creativepro"
                        value={profileData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">This will be your unique identifier on Nexr</p>
                    </div>
                    <div>
                      <Label htmlFor="displayName">Display Name *</Label>
                      <Input
                        id="displayName"
                        placeholder="Creative Professional"
                        value={profileData.displayName}
                        onChange={(e) => handleInputChange("displayName", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="New York, NY"
                        value={profileData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: About & Skills */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">About & Skills</h2>
                    <p className="text-gray-600 dark:text-gray-300">Share your story and expertise</p>
                  </div>

                  <div>
                    <Label htmlFor="bio">About You *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">{profileData.bio.length}/500 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="skills"
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      />
                      <Button onClick={addSkill} disabled={!newSkill.trim()}>
                        Add
                      </Button>
                    </div>
                    {profileData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {profileData.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-red-500"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Social Links */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Connect Your Accounts</h2>
                    <p className="text-gray-600 dark:text-gray-300">Link your professional profiles (optional)</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="linkedin" className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        LinkedIn Profile
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="https://linkedin.com/in/creativepro"
                        value={profileData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Profile
                      </Label>
                      <Input
                        id="github"
                        placeholder="https://github.com/creativepro"
                        value={profileData.github}
                        onChange={(e) => handleInputChange("github", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        Twitter Profile
                      </Label>
                      <Input
                        id="twitter"
                        placeholder="https://twitter.com/creativepro"
                        value={profileData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Personal Website</Label>
                      <Input
                        id="website"
                        placeholder="https://creativepro.dev"
                        value={profileData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Preferred Name */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Almost Done!</h2>
                    <p className="text-gray-600 dark:text-gray-300">What should we call you?</p>
                  </div>

                  <div>
                    <Label htmlFor="preferredName">Preferred Name *</Label>
                    <Input
                      id="preferredName"
                      placeholder="Alex"
                      value={profileData.preferredName}
                      onChange={(e) => handleInputChange("preferredName", e.target.value)}
                      className="mt-1 text-center text-lg"
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      We'll use this name to greet you: "Welcome back, {profileData.preferredName || "Name"}!"
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Profile Preview</h3>
                    <div className="flex items-center justify-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-purple-600 text-white">
                          {profileData.displayName ? profileData.displayName.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {profileData.displayName || "Display Name"}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          @{profileData.username || "username"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} disabled={!canProceed()} className="bg-purple-600 hover:bg-purple-700">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Complete Setup
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
