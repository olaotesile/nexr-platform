"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import {
  Plus,
  Users,
  GitBranch,
  Trophy,
  CheckCircle,
  Sparkles,
  Brain,
  Target,
  ArrowRight,
  Code,
  Eye,
  Calendar,
  Play,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Dashboard() {
  const [profileData, setProfileData] = useState<any>(null)
  const [isProjectExpanded, setIsProjectExpanded] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile")
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile))
    }
  }, [])

  // Mock data for the current project
  const currentProject = {
    id: 1,
    name: "E-commerce Platform",
    description: "Modern React-based shopping platform with real-time inventory management and payment processing",
    progress: 78,
    status: "active",
    priority: "high",
    dueDate: "Feb 15, 2024",
    team: [
      { name: "Sarah Chen", avatar: "SC", role: "Frontend" },
      { name: "Mike Johnson", avatar: "MJ", role: "Backend" },
      { name: "Alex Rivera", avatar: "AR", role: "Design" },
      { name: "You", avatar: "JD", role: "Lead Developer" },
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    lastActivity: "2 hours ago",
    contributions: 156,
    commits: 89,
    totalTasks: 45,
    completedTasks: 35,
  }

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this month",
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Total Contributions",
      value: "1,247",
      change: "+89 this week",
      icon: GitBranch,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 new",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Completed Projects",
      value: "8",
      change: "+1 this week",
      icon: Trophy,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {profileData?.preferredName || "there"}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Mobile Layout: Reordered */}
        <div className="block lg:hidden space-y-6 mb-8">
          {/* Quick Actions - Mobile First */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-4 space-y-3">
              <Link href="/projects/new">
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white h-11">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
              <Link href="/projects/join">
                <Button variant="outline" className="w-full justify-start h-11">
                  <Code className="h-4 w-4 mr-2" />
                  Join Existing Project
                </Button>
              </Link>
              <Link href="/verification">
                <Button variant="outline" className="w-full justify-start h-11">
                  <Shield className="h-4 w-4 mr-2" />
                  Verification Center
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Stats Grid - Mobile Second */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-3">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate">{stat.title}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                      <div
                        className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Current Project - Mobile Third (Collapsed) */}
          <div>
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="pb-3 p-4 cursor-pointer" onClick={() => setIsProjectExpanded(!isProjectExpanded)}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg dark:text-white truncate">{currentProject.name}</CardTitle>
                      <Badge className={getStatusColor(currentProject.status)} size="sm">
                        {currentProject.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {currentProject.progress}% complete
                      </span>
                      {isProjectExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                <Progress value={currentProject.progress} className="h-2 mt-2" />
              </CardHeader>

              {isProjectExpanded && (
                <CardContent className="space-y-3 p-4 pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">Due:</span>
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {currentProject.dueDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {currentProject.completedTasks}/{currentProject.totalTasks}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">Verified:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">142/156</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">Team:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {currentProject.team.length} members
                      </span>
                    </div>
                  </div>

                  {/* Team and Technologies */}
                  <div className="flex flex-col gap-3">
                    <div className="flex -space-x-2">
                      {currentProject.team.map((member, idx) => (
                        <Avatar key={idx} className="h-7 w-7 border-2 border-white dark:border-gray-800">
                          <AvatarFallback className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentProject.technologies.slice(0, 3).map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {currentProject.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{currentProject.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col gap-2">
                      <Link href={`/projects/${currentProject.id}`}>
                        <Button variant="outline" className="w-full h-10">
                          <Eye className="h-4 w-4 mr-2" />
                          View Project
                        </Button>
                      </Link>
                      <Link href={`/projects/${currentProject.id}?tab=preview`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-10">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Building
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* NexrAI Assistant - Mobile Last */}
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardHeader className="p-4 pb-3">
              <CardTitle className="flex items-center gap-2 dark:text-white text-base">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                NexrAI Assistant
              </CardTitle>
              <CardDescription className="dark:text-gray-300 text-sm">
                AI-powered insights and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 pt-0">
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  "Based on your current projects, I recommend focusing on the E-commerce Platform deployment this week.
                  You're 78% complete and ahead of schedule!"
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/ai-insights">
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 h-9">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Get AI Insights
                    </Button>
                  </Link>
                  <Link href="/ai-insights?tab=chat">
                    <Button size="sm" variant="outline" className="w-full h-9">
                      <Brain className="h-4 w-4 mr-2" />
                      Chat with AI
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop Layout: Original */}
        <div className="hidden lg:block">
          {/* Top Row: Current Project and Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Current Project - Takes 2 columns for priority */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Current Project</h2>
                <Link href="/projects">
                  <Button variant="outline" className="hover:scale-105 transition-transform">
                    View All Projects
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <Card className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {currentProject.name}
                        </CardTitle>
                        <Badge className={getStatusColor(currentProject.status)}>{currentProject.status}</Badge>
                        <Badge className={getPriorityColor(currentProject.priority)}>{currentProject.priority}</Badge>
                      </div>
                      <CardDescription className="dark:text-gray-300 text-sm leading-relaxed">
                        {currentProject.description}
                      </CardDescription>
                    </div>
                    <Link href={`/projects/${currentProject.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Progress Section */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">{currentProject.progress}%</span>
                    </div>
                    <Progress value={currentProject.progress} className="h-2" />
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Due:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{currentProject.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {currentProject.completedTasks}/{currentProject.totalTasks}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Verified:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">142/156</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">Team:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {currentProject.team.length} members
                      </span>
                    </div>
                  </div>

                  {/* Team and Technologies Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {currentProject.team.map((member, idx) => (
                        <Avatar
                          key={idx}
                          className="h-7 w-7 border-2 border-white dark:border-gray-800 hover:scale-110 transition-transform"
                        >
                          <AvatarFallback className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {currentProject.technologies.slice(0, 2).map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {currentProject.technologies.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{currentProject.technologies.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Continue Building Button */}
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <Link href={`/projects/${currentProject.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Project
                        </Button>
                      </Link>
                      <Link href={`/projects/${currentProject.id}?tab=preview`} className="flex-1">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Building
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions and AI Assistant */}
            <div className="space-y-6">
              {/* Project Actions */}
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardContent className="p-6 space-y-3">
                  <Link href="/projects/new">
                    <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Project
                    </Button>
                  </Link>
                  <Link href="/projects/join">
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Join Existing Project
                    </Button>
                  </Link>
                  <Link href="/verification">
                    <Button variant="outline" className="w-full justify-start h-11">
                      <Shield className="h-4 w-4 mr-2" />
                      Verification Center
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* NexrAI Assistant */}
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    NexrAI Assistant
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    AI-powered insights and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      "Based on your current projects, I recommend focusing on the E-commerce Platform deployment this
                      week. You're 78% complete and ahead of schedule!"
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link href="/ai-insights">
                        <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Get AI Insights
                        </Button>
                      </Link>
                      <Link href="/ai-insights?tab=chat">
                        <Button size="sm" variant="outline" className="w-full">
                          <Brain className="h-4 w-4 mr-2" />
                          Chat with AI
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Grid - Desktop */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
