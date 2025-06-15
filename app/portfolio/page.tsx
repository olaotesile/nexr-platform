"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Star,
  Eye,
  Download,
  Share,
  ExternalLink,
  Calendar,
  Users,
  GitBranch,
  Grid,
  List,
  Award,
  Target,
  Zap,
} from "lucide-react"
import { Header } from "@/components/header"

export default function Portfolio() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Mock portfolio data
  const portfolioProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Modern React-based shopping platform with real-time inventory management",
      category: "Web Development",
      status: "completed",
      role: "Lead Developer",
      duration: "6 months",
      team: ["Sarah Chen", "Mike Johnson", "Alex Rivera"],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      achievements: ["Increased conversion rate by 35%", "Reduced load time by 60%"],
      metrics: {
        contributions: 156,
        commits: 89,
        linesOfCode: 12500,
        impact: "High",
      },
      images: ["/placeholder.svg?height=300&width=400"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/johndoe/ecommerce",
      featured: true,
    },
    {
      id: 2,
      name: "Brand Identity Design",
      description: "Complete brand identity package for sustainable fashion startup",
      category: "Graphic Design",
      status: "completed",
      role: "Creative Director",
      duration: "3 months",
      team: ["Emma Wilson", "James Park"],
      technologies: ["Adobe Creative Suite", "Figma", "Canva"],
      achievements: ["Won Design Excellence Award", "Featured in Design Magazine"],
      metrics: {
        contributions: 89,
        commits: 45,
        deliverables: 25,
        impact: "Medium",
      },
      images: ["/placeholder.svg?height=300&width=400"],
      behanceUrl: "https://behance.net/project",
      featured: false,
    },
    {
      id: 3,
      name: "Documentary Film",
      description: "Environmental documentary about ocean conservation efforts",
      category: "Video Production",
      status: "completed",
      role: "Producer",
      duration: "8 months",
      team: ["Lisa Rodriguez", "Tom Anderson", "Maya Patel"],
      technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      achievements: ["Film Festival Selection", "1M+ views on YouTube"],
      metrics: {
        contributions: 234,
        commits: 167,
        runtime: "45 minutes",
        impact: "High",
      },
      images: ["/placeholder.svg?height=300&width=400"],
      youtubeUrl: "https://youtube.com/watch?v=example",
      featured: true,
    },
    {
      id: 4,
      name: "Mobile Game",
      description: "2D puzzle game with unique mechanics and beautiful art style",
      category: "Game Development",
      status: "in-progress",
      role: "Game Developer",
      duration: "4 months",
      team: ["Chris Wong", "Zoe Taylor", "Ben Foster"],
      technologies: ["Unity", "C#", "Photoshop", "Aseprite"],
      achievements: ["Beta testing with 500+ users", "4.8/5 rating"],
      metrics: {
        contributions: 145,
        commits: 78,
        levels: 50,
        impact: "Medium",
      },
      images: ["/placeholder.svg?height=300&width=400"],
      featured: false,
    },
  ]

  const skills = [
    { name: "React", level: 95, category: "Frontend", projects: 8 },
    { name: "Node.js", level: 88, category: "Backend", projects: 6 },
    { name: "TypeScript", level: 92, category: "Language", projects: 7 },
    { name: "Adobe Creative Suite", level: 85, category: "Design", projects: 4 },
    { name: "Python", level: 80, category: "Language", projects: 3 },
    { name: "Figma", level: 90, category: "Design", projects: 5 },
  ]

  const achievements = [
    {
      title: "Project Pioneer",
      description: "Completed first project",
      icon: Target,
      earned: true,
      date: "Jan 2024",
    },
    {
      title: "Team Leader",
      description: "Led 5+ successful projects",
      icon: Users,
      earned: true,
      date: "Feb 2024",
    },
    {
      title: "Code Master",
      description: "Made 1000+ contributions",
      icon: GitBranch,
      earned: true,
      date: "Mar 2024",
    },
    {
      title: "Innovation Award",
      description: "Created groundbreaking solution",
      icon: Award,
      earned: false,
      date: null,
    },
  ]

  const filteredProjects = portfolioProjects.filter((project) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "featured") return project.featured
    return project.category.toLowerCase().replace(/\s+/g, "-") === selectedFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-green-600 dark:text-green-400"
      case "Medium":
        return "text-yellow-600 dark:text-yellow-400"
      case "Low":
        return "text-gray-600 dark:text-gray-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Portfolio</h1>
            <p className="text-gray-600 dark:text-gray-300">Showcase your best work and achievements</p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Portfolio
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed Projects</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1,247</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Team Collaborations</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Awards & Recognition</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Portfolio Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-2 flex-wrap">
                {["all", "featured", "web-development", "graphic-design", "video-production", "game-development"].map(
                  (filter) => (
                    <Button
                      key={filter}
                      variant={selectedFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter)}
                      className={selectedFilter === filter ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {filter
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </Button>
                  ),
                )}
              </div>
              <div className="flex gap-1 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Projects */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-6"}>
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group"
                >
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  <div className="relative">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        {project.liveUrl && (
                          <Button size="sm" variant="secondary">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg dark:text-white">{project.name}</CardTitle>
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </div>
                        <Badge variant="outline" className="mb-2 text-xs">
                          {project.category}
                        </Badge>
                        <CardDescription className="dark:text-gray-300">{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Role and Duration */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{project.role}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">{project.duration}</span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Key Achievements</p>
                      <div className="space-y-1">
                        {project.achievements.slice(0, 2).map((achievement, idx) => (
                          <p key={idx} className="text-xs text-green-600 dark:text-green-400 flex items-center">
                            <Trophy className="h-3 w-3 mr-1" />
                            {achievement}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Contributions</p>
                        <p className="font-medium text-gray-900 dark:text-white">{project.metrics.contributions}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Impact</p>
                        <p className={`font-medium ${getImpactColor(project.metrics.impact)}`}>
                          {project.metrics.impact}
                        </p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Zap className="h-5 w-5" />
                  Top Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.slice(0, 6).map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <span className="text-gray-600 dark:text-gray-400">{skill.projects} projects</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center space-x-3 ${!achievement.earned ? "opacity-60" : ""}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned
                          ? "bg-gradient-to-r from-green-500 to-emerald-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <achievement.icon className={`h-5 w-5 ${achievement.earned ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                      {achievement.earned && achievement.date && (
                        <p className="text-xs text-green-600 dark:text-green-400">Earned {achievement.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
