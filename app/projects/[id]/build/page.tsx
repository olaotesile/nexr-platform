"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Code,
  GitBranch,
  Play,
  Save,
  Eye,
  Brain,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Zap,
  FileText,
  Terminal,
  Fingerprint,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function ProjectBuildPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("code")
  const [code, setCode] = useState(`import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleAddToCart = async () => {
    setIsLoading(true)
    // Add to cart logic
    await addToCart(product.id)
    setIsLoading(false)
  }
  
  return (
    <div className="border rounded-lg p-4">
      <img src={product.image || "/placeholder.svg"} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <Button onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </div>
  )
}`)

  const [contributions, setContributions] = useState([
    {
      id: 1,
      type: "code",
      description: "Added ProductCard component with responsive design",
      timestamp: new Date(Date.now() - 300000),
      verified: true,
      hash: "0xabc123...",
      skillsDetected: ["React", "TypeScript", "Responsive Design"],
      linesOfCode: 45,
      complexity: 7.2,
    },
    {
      id: 2,
      type: "code",
      description: "Implemented shopping cart state management",
      timestamp: new Date(Date.now() - 600000),
      verified: false,
      hash: "0xdef456...",
      skillsDetected: ["React Context", "State Management", "TypeScript"],
      linesOfCode: 89,
      complexity: 8.5,
    },
  ])

  const [aiSuggestions, setAiSuggestions] = useState([
    {
      id: 1,
      type: "performance",
      message: "Consider using React.memo for ProductCard to prevent unnecessary re-renders",
      priority: "medium",
    },
    {
      id: 2,
      type: "security",
      message: "Add input validation for product data to prevent XSS attacks",
      priority: "high",
    },
    {
      id: 3,
      type: "accessibility",
      message: "Add alt text and ARIA labels for better screen reader support",
      priority: "medium",
    },
  ])

  const [realTimeStats, setRealTimeStats] = useState({
    linesWritten: 1247,
    testsWritten: 89,
    codeQuality: 94,
    performance: 87,
    security: 92,
    accessibility: 78,
  })

  const handleSaveCode = () => {
    // Simulate real-time analysis
    const newContribution = {
      id: contributions.length + 1,
      type: "code",
      description: "Updated ProductCard component implementation",
      timestamp: new Date(),
      verified: false,
      hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
      skillsDetected: ["React", "TypeScript", "Error Handling"],
      linesOfCode: code.split("\n").length,
      complexity: Math.random() * 10,
    }

    setContributions([newContribution, ...contributions])

    // Simulate AI analysis
    setTimeout(() => {
      setAiSuggestions([
        {
          id: aiSuggestions.length + 1,
          type: "improvement",
          message: "Great error handling! Consider adding loading states for better UX",
          priority: "low",
        },
        ...aiSuggestions,
      ])
    }, 2000)
  }

  const handleRunTests = () => {
    // Simulate test execution
    alert("Running tests... All 23 tests passed! ✅")
  }

  const handleRequestVerification = () => {
    // Simulate verification request
    alert("Verification request sent to team members. They will be notified to review your work.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4">
            <Link href={`/projects/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Build Mode</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                E-commerce Platform - Real-time development environment
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveCode} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save & Analyze
            </Button>
            <Button onClick={handleRequestVerification} variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Request Verification
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="code">Code Editor</TabsTrigger>
                <TabsTrigger value="preview">Live Preview</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="ai">AI Assistant</TabsTrigger>
              </TabsList>

              {/* Code Editor */}
              <TabsContent value="code">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Code className="h-5 w-5" />
                      ProductCard.tsx
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Auto-tracking enabled
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg resize-none"
                        placeholder="Write your code here..."
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Lines: {code.split("\n").length}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Auto-save: ON
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Live Preview */}
              <TabsContent value="preview">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Eye className="h-5 w-5" />
                      Live Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="border rounded-lg p-4 max-w-sm">
                        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <h3 className="font-semibold mb-2">Sample Product</h3>
                        <p className="text-lg font-bold mb-3">$29.99</p>
                        <Button className="w-full">Add to Cart</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tests */}
              <TabsContent value="tests">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Terminal className="h-5 w-5" />
                      Test Suite
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button onClick={handleRunTests} className="bg-blue-600 hover:bg-blue-700">
                        <Play className="h-4 w-4 mr-2" />
                        Run Tests
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Tests
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>ProductCard renders correctly</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Add to cart button works</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Loading state displays correctly</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        <span>Error handling test - pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Assistant */}
              <TabsContent value="ai">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Brain className="h-5 w-5" />
                      NexrAI Code Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiSuggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          suggestion.priority === "high"
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : suggestion.priority === "medium"
                              ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                              : "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                className={
                                  suggestion.priority === "high"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                    : suggestion.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                }
                              >
                                {suggestion.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {suggestion.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.message}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white text-sm">
                  <Zap className="h-4 w-4" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Code Quality</span>
                    <span className="font-medium">{realTimeStats.codeQuality}%</span>
                  </div>
                  <Progress value={realTimeStats.codeQuality} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Performance</span>
                    <span className="font-medium">{realTimeStats.performance}%</span>
                  </div>
                  <Progress value={realTimeStats.performance} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Security</span>
                    <span className="font-medium">{realTimeStats.security}%</span>
                  </div>
                  <Progress value={realTimeStats.security} className="h-1" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-center mt-4">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{realTimeStats.linesWritten}</div>
                    <div className="text-gray-500">Lines</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{realTimeStats.testsWritten}</div>
                    <div className="text-gray-500">Tests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Contributions */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white text-sm">
                  <GitBranch className="h-4 w-4" />
                  Recent Contributions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {contributions.slice(0, 3).map((contribution) => (
                  <div key={contribution.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-900 dark:text-white line-clamp-2">{contribution.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            className={
                              contribution.verified
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            }
                          >
                            {contribution.verified ? "Verified" : "Pending"}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Fingerprint className="h-3 w-3 text-gray-400" />
                            <code className="text-xs text-gray-500">{contribution.hash}</code>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {contribution.skillsDetected.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Activity */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white text-sm">
                  <Users className="h-4 w-4" />
                  Team Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-purple-600 text-white text-xs">SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 dark:text-white">Sarah verified your cart component</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-purple-600 text-white text-xs">MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 dark:text-white">Mike pushed API updates</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
