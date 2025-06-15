"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  Target,
  Users,
  Send,
  Lightbulb,
  BarChart3,
  MessageSquare,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"

export default function AIInsightsPage() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message:
        "Hello! I'm NexrAI, your intelligent project assistant. I can help you with insights about your projects, team performance, and recommendations for improvement. What would you like to know?",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    },
  ])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get("tab")
    if (tab === "chat") {
      setActiveTab("chat")
    }
  }, [])

  const aiResponses = {
    productivity:
      "Based on your recent activity, your team's productivity has increased 23% this week! Here are some ways to maintain this momentum:\n\n• Continue the current sprint pace\n• Consider taking on 2-3 additional tasks\n• Schedule regular check-ins to maintain team sync\n• Celebrate small wins to keep morale high",
    focus:
      "This week, I recommend focusing on:\n\n1. **E-commerce Platform** - You're 78% complete and ahead of schedule\n2. **Payment Gateway Integration** - Critical path item due soon\n3. **Team knowledge sharing** - Sarah Chen could mentor newer members\n\nWould you like me to create a detailed action plan for any of these?",
    team: "Your team dynamics look great! Here's what I've observed:\n\n• **Sarah Chen** is highly active (156 contributions this week)\n• **Mike Johnson** excels at backend tasks\n• **Alex Rivera** provides excellent design feedback\n\nConsider pairing Sarah with newer team members for knowledge transfer.",
    deadlines:
      "Looking at your current deadlines:\n\n✅ **On Track**: E-commerce Platform (due Feb 15)\n⚠️ **Attention Needed**: Brand Identity Design (due Mar 1)\n✅ **Ahead of Schedule**: Documentary Film\n\nThe Brand Identity Design project could benefit from additional design resources.",
    default:
      "I can help you with insights about:\n\n• Project progress and deadlines\n• Team productivity and collaboration\n• Task prioritization and planning\n• Performance optimization\n• Resource allocation\n\nWhat specific area would you like to explore?",
  }

  const getAIResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("productivity") || lowerQuestion.includes("performance")) {
      return aiResponses.productivity
    } else if (
      lowerQuestion.includes("focus") ||
      lowerQuestion.includes("priority") ||
      lowerQuestion.includes("week")
    ) {
      return aiResponses.focus
    } else if (lowerQuestion.includes("team") || lowerQuestion.includes("collaboration")) {
      return aiResponses.team
    } else if (lowerQuestion.includes("deadline") || lowerQuestion.includes("schedule")) {
      return aiResponses.deadlines
    } else {
      return aiResponses.default
    }
  }

  const insights = [
    {
      id: 1,
      type: "productivity",
      title: "Productivity Boost Opportunity",
      description:
        "Your team's velocity has increased 23% this week. Consider taking on additional tasks to maintain momentum.",
      impact: "high",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      actionable: true,
      category: "Performance",
    },
    {
      id: 2,
      type: "deadline",
      title: "Deadline Risk Assessment",
      description: "E-commerce Platform is 78% complete with 5 days remaining. You're on track to finish early.",
      impact: "medium",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      actionable: false,
      category: "Timeline",
    },
    {
      id: 3,
      type: "collaboration",
      title: "Team Collaboration Insight",
      description:
        "Sarah Chen has been highly active. Consider pairing her with newer team members for knowledge transfer.",
      impact: "medium",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      actionable: true,
      category: "Team",
    },
    {
      id: 4,
      type: "optimization",
      title: "Workflow Optimization",
      description:
        "Your design review process takes 2.3 days on average. Consider implementing async feedback to reduce this by 40%.",
      impact: "high",
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      actionable: true,
      category: "Process",
    },
  ]

  const recommendations = [
    {
      title: "Focus on E-commerce Platform",
      description: "You're 78% complete and ahead of schedule",
      priority: "high",
      timeframe: "This week",
    },
    {
      title: "Increase sprint capacity",
      description: "Consider adding 2-3 more tasks to your current sprint",
      priority: "medium",
      timeframe: "Next sprint",
    },
    {
      title: "Schedule team sync",
      description: "Organize knowledge sharing session with Sarah Chen",
      priority: "medium",
      timeframe: "This week",
    },
    {
      title: "Optimize design process",
      description: "Implement async feedback to reduce review time",
      priority: "low",
      timeframe: "Next month",
    },
  ]

  const handleAskAI = async () => {
    if (!question.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: "user",
      message: question,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: "ai",
        message: getAIResponse(question),
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
      setQuestion("")
    }, 2000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/10"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
      case "low":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/10"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/10"
    }
  }

  const handleSetWeeklyGoals = () => {
    // Simulate setting weekly goals
    const goals = [
      "Complete payment integration for E-commerce Platform",
      "Review and validate 5 team member contributions",
      "Improve test coverage to 90%",
      "Optimize component performance",
    ]

    // In a real app, this would save to backend
    localStorage.setItem("weeklyGoals", JSON.stringify(goals))

    // Add a success message or redirect
    alert("Weekly goals set successfully! Check your dashboard for updates.")
  }

  const handleScheduleTeamSync = () => {
    // Simulate scheduling team sync
    const syncDetails = {
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 2 days from now
      time: "10:00 AM",
      attendees: ["Sarah Chen", "Mike Johnson", "Alex Rivera"],
      agenda: ["Project progress review", "Upcoming milestones", "Blocker discussions"],
    }

    localStorage.setItem("teamSync", JSON.stringify(syncDetails))
    alert(`Team sync scheduled for ${syncDetails.date} at ${syncDetails.time}`)
  }

  const handleGenerateReport = () => {
    // Simulate report generation
    const reportData = {
      period: "Last 7 days",
      tasksCompleted: 12,
      codeQuality: "94%",
      teamVelocity: "+23%",
      upcomingDeadlines: 2,
      generatedAt: new Date().toISOString(),
    }

    localStorage.setItem("weeklyReport", JSON.stringify(reportData))

    // In a real app, this would generate and download a PDF
    alert("Weekly report generated! Check your downloads folder.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">NexrAI Insights</h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered insights and recommendations for your projects
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Main Insights */}
              <div className="lg:col-span-3 space-y-6">
                {/* Quick Recommendations */}
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Priority Recommendations
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      AI-generated action items based on your current projects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <div key={index} className={`border-l-4 p-4 rounded-r-lg ${getPriorityColor(rec.priority)}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{rec.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{rec.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {rec.priority} priority
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {rec.timeframe}
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Take Action
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Insights */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Detailed Analysis</h2>
                  <div className="grid gap-4">
                    {insights.map((insight) => (
                      <Card key={insight.id} className="border-0 shadow-lg dark:bg-gray-800">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 ${insight.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              <insight.icon className={`h-6 w-6 ${insight.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
                                  <Badge variant="outline" className="text-xs">
                                    {insight.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                                  {insight.actionable && (
                                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                      Act Now
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Summary Sidebar */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Performance Overview</CardTitle>
                    <CardDescription className="dark:text-gray-300">This week's metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</span>
                        <span className="font-semibold text-gray-900 dark:text-white">12/15</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Team Velocity</span>
                        <span className="font-semibold text-green-600">+23%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">On-time Delivery</span>
                        <span className="font-semibold text-gray-900 dark:text-white">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Code Quality</span>
                        <span className="font-semibold text-blue-600">Excellent</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" onClick={handleSetWeeklyGoals}>
                      <Target className="h-4 w-4 mr-2" />
                      Set Weekly Goals
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={handleScheduleTeamSync}>
                      <Users className="h-4 w-4 mr-2" />
                      Schedule Team Sync
                    </Button>
                    <Button className="w-full justify-start" variant="outline" onClick={handleGenerateReport}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Brain className="h-5 w-5 text-purple-500" />
                      Chat with NexrAI
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Ask questions about your projects, get recommendations, and receive insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Chat Messages */}
                    <div
                      ref={chatContainerRef}
                      className="h-64 sm:h-80 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border"
                    >
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div className="flex items-start space-x-3 max-w-[80%]">
                            {msg.type === "ai" && (
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Brain className="h-4 w-4 text-white" />
                              </div>
                            )}
                            <div
                              className={`p-4 rounded-lg ${
                                msg.type === "user"
                                  ? "bg-purple-600 text-white"
                                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line">{msg.message}</p>
                              <p
                                className={`text-xs mt-2 ${
                                  msg.type === "user" ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                            {msg.type === "user" && (
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-xs font-bold">JD</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                              <Brain className="h-4 w-4 text-white" />
                            </div>
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask me anything about your projects..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAskAI()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleAskAI}
                        disabled={isLoading || !question.trim()}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isLoading ? <Clock className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Sidebar */}
              <div className="space-y-4">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm dark:text-white">Quick Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      "How can I improve productivity?",
                      "What should I focus on this week?",
                      "How is my team performing?",
                      "Any deadline concerns?",
                      "Optimize my workflow",
                      "Team collaboration tips",
                    ].map((q, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start text-xs"
                        onClick={() => {
                          setQuestion(q)
                          setTimeout(() => handleAskAI(), 100)
                        }}
                      >
                        {q}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm dark:text-white">AI Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Project analysis
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Team insights
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Performance optimization
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Deadline tracking
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Project Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Analytics dashboard coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Team Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Team analytics coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
