"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { CheckCircle, ArrowRight, Users, Target, Sparkles, User, Mail, Github, Linkedin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Welcome() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const [profileData, setProfileData] = useState<any>(null)

  useEffect(() => {
    // Get profile data from localStorage
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile))
    }
  }, [])

  const steps = [
    {
      title: "Profile Complete! ✅",
      description: "Your profile has been set up successfully. You're ready to start building.",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Explore the Dashboard",
      description: "Discover all the tools and features available to help you build amazing projects.",
      icon: Target,
      color: "text-blue-500",
    },
    {
      title: "Create Your First Project",
      description: "Start building something amazing and showcase your real skills.",
      icon: Sparkles,
      color: "text-purple-500",
    },
    {
      title: "Invite Collaborators",
      description: "When you're ready, invite teammates to join your projects.",
      icon: Users,
      color: "text-orange-500",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepTimer)
          return prev
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(stepTimer)
  }, [steps.length])

  const handleGetStarted = () => {
    router.push("/dashboard")
  }

  const handleSkipToProfile = () => {
    router.push("/profile/setup")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Nexr</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Welcome Animation */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Nexr, {profileData?.preferredName || "there"}! 🎉
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your account has been created successfully. Let's get you set up to start building amazing projects.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Setting up your experience</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {steps.map((step, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg dark:bg-gray-800 transition-all duration-500 ${
                  index <= currentStep ? "scale-105 shadow-xl ring-2 ring-purple-500/20" : "opacity-60"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= currentStep
                          ? "bg-gradient-to-r from-purple-600 to-pink-600"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {index <= currentStep ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <step.icon className={`h-5 w-5 ${step.color}`} />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg dark:text-white">{step.title}</CardTitle>
                      {index <= currentStep && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Complete
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="dark:text-gray-300">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Setup Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Complete Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Add your skills, bio, and profile picture</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Start a Project</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Create your first project and invite collaborators
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Connect Accounts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Link GitHub, LinkedIn, and other platforms</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-3 hover:scale-105 transition-all duration-300 shadow-lg group"
              onClick={handleGetStarted}
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 hover:scale-105 transition-all duration-300"
              onClick={handleSkipToProfile}
            >
              Set up Profile First
            </Button>
          </div>

          {/* Social Connect */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Connect your accounts to get started faster</p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
