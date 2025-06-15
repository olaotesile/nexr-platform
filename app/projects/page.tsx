"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Users,
  Calendar,
  Target,
  Eye,
  Clock,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Play,
  Star,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedProjects(newExpanded)
  }

  // Clean projects data without blockchain references
  const projects = [
    {
      id: "ecommerce-platform",
      name: "E-commerce Platform",
      description: "Modern React-based shopping platform with real-time inventory management and payment processing",
      progress: 78,
      status: "in-progress",
      priority: "high",
      category: "Web Development",
      dueDate: "2024-02-15",
      team: [
        { name: "Sarah Chen", avatar: "SC", role: "Frontend Lead", verified: true },
        { name: "Mike Johnson", avatar: "MJ", role: "Backend Dev", verified: true },
        { name: "Alex Rivera", avatar: "AR", role: "UI Designer", verified: false },
        { name: "You", avatar: "JD", role: "Full-Stack", verified: true },
      ],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      lastActivity: "2 hours ago",
      contributions: {
        total: 156,
        verified: 142,
        pending: 14,
      },
      milestones: [
        { name: "Authentication System", completed: true, verified: true },
        { name: "Payment Integration", completed: true, verified: true },
        { name: "Product Catalog", completed: false, verified: false },
        { name: "Order Management", completed: false, verified: false },
      ],
      teamRating: 4.8,
    },
    {
      id: "brand-identity-design",
      name: "Brand Identity Design",
      description:
        "Complete brand identity package for sustainable fashion startup including logo, colors, and guidelines",
      progress: 45,
      status: "in-progress",
      priority: "medium",
      category: "Graphic Design",
      dueDate: "2024-03-01",
      team: [
        { name: "Emma Wilson", avatar: "EW", role: "Lead Designer", verified: true },
        { name: "James Park", avatar: "JP", role: "Brand Strategist", verified: true },
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Canva"],
      lastActivity: "5 hours ago",
      contributions: {
        total: 89,
        verified: 76,
        pending: 13,
      },
      milestones: [
        { name: "Logo Design", completed: true, verified: true },
        { name: "Color Palette", completed: true, verified: false },
        { name: "Typography", completed: false, verified: false },
        { name: "Brand Guidelines", completed: false, verified: false },
      ],
      teamRating: 4.6,
    },
    {
      id: "ocean-conservation-documentary",
      name: "Ocean Conservation Documentary",
      description: "Educational documentary about marine life conservation efforts and climate change impact",
      progress: 92,
      status: "completed",
      priority: "high",
      category: "Video Production",
      dueDate: "2024-01-20",
      team: [
        { name: "Maria Rodriguez", avatar: "MR", role: "Director", verified: true },
        { name: "David Kim", avatar: "DK", role: "Editor", verified: true },
        { name: "Lisa Zhang", avatar: "LZ", role: "Producer", verified: true },
      ],
      technologies: ["Final Cut Pro", "After Effects", "DaVinci Resolve"],
      lastActivity: "1 day ago",
      contributions: {
        total: 234,
        verified: 234,
        pending: 0,
      },
      milestones: [
        { name: "Pre-production", completed: true, verified: true },
        { name: "Filming", completed: true, verified: true },
        { name: "Post-production", completed: true, verified: true },
        { name: "Distribution", completed: true, verified: true },
      ],
      teamRating: 4.9,
    },
    {
      id: "indie-rock-album",
      name: "Indie Rock Album",
      description: "Recording and producing a 10-track indie rock album with original compositions",
      progress: 67,
      status: "in-progress",
      priority: "medium",
      category: "Music Production",
      dueDate: "2024-04-15",
      team: [
        { name: "Jake Thompson", avatar: "JT", role: "Producer", verified: true },
        { name: "Sophie Miller", avatar: "SM", role: "Sound Engineer", verified: false },
      ],
      technologies: ["Pro Tools", "Logic Pro", "Ableton Live"],
      lastActivity: "3 hours ago",
      contributions: {
        total: 67,
        verified: 52,
        pending: 15,
      },
      milestones: [
        { name: "Songwriting", completed: true, verified: true },
        { name: "Recording", completed: false, verified: false },
        { name: "Mixing", completed: false, verified: false },
        { name: "Mastering", completed: false, verified: false },
      ],
      teamRating: 4.4,
    },
    {
      id: "tech-startup-marketing",
      name: "Tech Startup Marketing Campaign",
      description: "Comprehensive digital marketing strategy for AI-powered productivity app launch",
      progress: 34,
      status: "in-progress",
      priority: "high",
      category: "Marketing",
      dueDate: "2024-03-30",
      team: [
        { name: "Rachel Green", avatar: "RG", role: "Marketing Lead", verified: true },
        { name: "Tom Wilson", avatar: "TW", role: "Content Creator", verified: false },
        { name: "Anna Lee", avatar: "AL", role: "Social Media", verified: true },
      ],
      technologies: ["Google Ads", "Facebook Ads", "HubSpot", "Canva"],
      lastActivity: "1 hour ago",
      contributions: {
        total: 45,
        verified: 32,
        pending: 13,
      },
      milestones: [
        { name: "Market Research", completed: true, verified: true },
        { name: "Campaign Strategy", completed: false, verified: false },
        { name: "Content Creation", completed: false, verified: false },
        { name: "Launch Execution", completed: false, verified: false },
      ],
      teamRating: 4.2,
    },
    {
      id: "2d-puzzle-game",
      name: "2D Puzzle Game",
      description: "Mobile puzzle game with unique mechanics and hand-drawn art style",
      progress: 56,
      status: "in-progress",
      priority: "medium",
      category: "Game Development",
      dueDate: "2024-05-01",
      team: [
        { name: "Chris Brown", avatar: "CB", role: "Game Developer", verified: true },
        { name: "Maya Patel", avatar: "MP", role: "Artist", verified: true },
      ],
      technologies: ["Unity", "C#", "Photoshop", "Aseprite"],
      lastActivity: "4 hours ago",
      contributions: {
        total: 78,
        verified: 65,
        pending: 13,
      },
      milestones: [
        { name: "Game Design", completed: true, verified: true },
        { name: "Core Mechanics", completed: true, verified: false },
        { name: "Art Assets", completed: false, verified: false },
        { name: "Level Design", completed: false, verified: false },
      ],
      teamRating: 4.5,
    },
  ].map((project) => ({ ...project, progress: Math.min(project.progress, 99) }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "paused":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
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
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-blue-500"
    return "bg-orange-500"
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Manage and track all your creative projects in one place
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Link href="/join-project">
                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Join Project
                </Button>
              </Link>
              <Link href="/projects/new">
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="border-0 shadow-sm dark:bg-gray-800/50">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects by name, description, or category..."
                    className="pl-10 border-gray-200 dark:border-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                  <Filter className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex gap-2">
                    {["all", "in-progress", "completed", "review", "paused"].map((status) => (
                      <Button
                        key={status}
                        variant={filterStatus === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus(status)}
                        className={`whitespace-nowrap ${filterStatus === status ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjects.has(project.id)
            return (
              <Card
                key={project.id}
                className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <CardTitle className="text-base sm:text-lg dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                          {project.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                        <Badge className={getStatusColor(project.status)} variant="secondary">
                          {project.status.replace("-", " ")}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)} variant="secondary">
                          {project.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleProject(project.id)}
                      className="flex-shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>

                  <CardDescription className="dark:text-gray-300 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(project.progress)}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 truncate">
                        {new Date(project.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{project.team.length} members</span>
                    </div>
                  </div>

                  {/* Team Avatars */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-1 sm:-space-x-2">
                      {project.team.slice(0, 3).map((member, idx) => (
                        <div key={idx} className="relative">
                          <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white dark:border-gray-800 hover:scale-110 transition-transform">
                            <AvatarFallback className="text-xs bg-purple-600 text-white">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {member.verified && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-gray-800">
                              <CheckCircle className="h-2 w-2 text-white m-0.5" />
                            </div>
                          )}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            +{project.team.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{project.teamRating}</span>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                      {/* Contributions */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                          <div className="text-sm sm:text-base font-bold text-green-700 dark:text-green-300">
                            {project.contributions.verified}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-400">Verified</div>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                          <div className="text-sm sm:text-base font-bold text-orange-700 dark:text-orange-300">
                            {project.contributions.pending}
                          </div>
                          <div className="text-xs text-orange-600 dark:text-orange-400">Pending</div>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                          <div className="text-sm sm:text-base font-bold text-blue-700 dark:text-blue-300">
                            {project.contributions.total}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">Total</div>
                        </div>
                      </div>

                      {/* Milestones */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Milestones
                        </h4>
                        <div className="space-y-1">
                          {project.milestones.map((milestone, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  milestone.completed
                                    ? milestone.verified
                                      ? "bg-green-500"
                                      : "bg-orange-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              />
                              <span
                                className={`flex-1 ${
                                  milestone.completed
                                    ? "text-gray-900 dark:text-white"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {milestone.name}
                              </span>
                              {milestone.completed && milestone.verified && (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>

                      {/* Last Activity */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Updated {project.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <Button variant="outline" className="w-full text-xs sm:text-sm">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/projects/${project.id}?tab=build`} className="flex-1">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-xs sm:text-sm">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Build
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Target className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto px-4">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search terms or filters to find what you're looking for."
                : "Get started by creating your first project or joining an existing team."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <Link href="/projects/new">
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </Link>
              <Link href="/join-project">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Users className="h-4 w-4 mr-2" />
                  Join Project
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
