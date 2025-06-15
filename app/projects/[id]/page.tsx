"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  GitBranch,
  Eye,
  CheckCircle,
  Clock,
  Play,
  RotateCcw,
  Terminal,
  Globe,
  Palette,
  Search,
  MoreHorizontal,
  Video,
  FileText,
  Monitor,
  Layers,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"

export default function ProjectDetail() {
  const params = useParams()
  const projectId = params.id as string

  const [activeTab, setActiveTab] = useState("overview")
  const [buildStatus, setBuildStatus] = useState<"idle" | "building" | "success" | "error">("idle")
  const [newMessage, setNewMessage] = useState("")
  const [taskFilter, setTaskFilter] = useState("all")
  const [searchTasks, setSearchTasks] = useState("")

  // Replace the existing projects object with this expanded version
  const projects = {
    "ecommerce-platform": {
      id: "ecommerce-platform",
      name: "E-commerce Platform",
      description: "Modern React-based shopping platform with real-time inventory management and payment processing",
      category: "Web Development",
      type: "software",
      progress: 78,
      status: "active",
      priority: "high",
      dueDate: "2024-02-15",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      team: [
        { name: "Sarah Chen", avatar: "SC", role: "Frontend Developer", email: "sarah@example.com", status: "online" },
        { name: "Mike Johnson", avatar: "MJ", role: "Backend Developer", email: "mike@example.com", status: "away" },
        { name: "Alex Rivera", avatar: "AR", role: "UI/UX Designer", email: "alex@example.com", status: "online" },
        { name: "You", avatar: "JD", role: "Lead Developer", email: "john@example.com", status: "online" },
      ],
    },
    "brand-identity-design": {
      id: "brand-identity-design",
      name: "Brand Identity Design",
      description:
        "Complete brand identity package for sustainable fashion startup including logo, colors, and guidelines",
      category: "Graphic Design",
      type: "design",
      progress: 45,
      status: "active",
      priority: "medium",
      dueDate: "2024-03-01",
      technologies: ["Adobe Creative Suite", "Figma", "Canva"],
      team: [
        { name: "Emma Wilson", avatar: "EW", role: "Creative Director", email: "emma@example.com", status: "online" },
        { name: "James Park", avatar: "JP", role: "Brand Strategist", email: "james@example.com", status: "offline" },
        { name: "You", avatar: "JD", role: "Art Director", email: "john@example.com", status: "online" },
      ],
    },
    "ocean-conservation-documentary": {
      id: "ocean-conservation-documentary",
      name: "Ocean Conservation Documentary",
      description: "Educational documentary about marine life conservation efforts and climate change impact",
      category: "Video Production",
      type: "video",
      progress: 92,
      status: "completed",
      priority: "high",
      dueDate: "2024-01-20",
      technologies: ["Final Cut Pro", "After Effects", "DaVinci Resolve"],
      team: [
        { name: "Maria Rodriguez", avatar: "MR", role: "Director", email: "maria@example.com", status: "online" },
        { name: "David Kim", avatar: "DK", role: "Editor", email: "david@example.com", status: "offline" },
        { name: "Lisa Zhang", avatar: "LZ", role: "Producer", email: "lisa@example.com", status: "away" },
      ],
    },
  }

  // Update the project selection logic
  const project = projects[projectId as keyof typeof projects] || projects["ecommerce-platform"]

  // Replace the tasks array with project-specific tasks
  const getProjectTasks = (projectId: string) => {
    const tasksByProject = {
      "ecommerce-platform": [
        {
          id: 1,
          title: "Set up project structure",
          description: "Initialize the project repository and basic folder structure",
          assignee: "Sarah Chen",
          status: "completed",
          priority: "high",
          dueDate: "2024-01-15",
          category: "Setup",
        },
        {
          id: 2,
          title: "Payment gateway integration",
          description: "Integrate Stripe payment processing with error handling",
          assignee: "Mike Johnson",
          status: "in-progress",
          priority: "high",
          dueDate: "2024-01-25",
          category: "Backend",
        },
      ],
      "brand-identity-design": [
        {
          id: 1,
          title: "Logo concept development",
          description: "Create initial logo concepts and variations",
          assignee: "Emma Wilson",
          status: "completed",
          priority: "high",
          dueDate: "2024-02-10",
          category: "Design",
        },
        {
          id: 2,
          title: "Color palette creation",
          description: "Develop brand color palette and guidelines",
          assignee: "You",
          status: "in-progress",
          priority: "medium",
          dueDate: "2024-02-15",
          category: "Design",
        },
      ],
      "ocean-conservation-documentary": [
        {
          id: 1,
          title: "Final editing review",
          description: "Complete final review and color correction",
          assignee: "David Kim",
          status: "completed",
          priority: "high",
          dueDate: "2024-01-18",
          category: "Post-Production",
        },
      ],
    }

    return tasksByProject[projectId as keyof typeof tasksByProject] || tasksByProject["ecommerce-platform"]
  }

  const tasks = getProjectTasks(projectId)

  // Get project-specific build/preview steps
  const getProjectSteps = (projectType: string) => {
    switch (projectType) {
      case "software":
        return [
          { name: "Installing dependencies", status: "completed", duration: "2m 15s" },
          { name: "Running tests", status: "completed", duration: "1m 30s" },
          { name: "Building application", status: "pending", duration: "—" },
          { name: "Optimizing assets", status: "pending", duration: "—" },
          { name: "Deploying to staging", status: "pending", duration: "—" },
        ]
      case "design":
        return [
          { name: "Preparing assets", status: "completed", duration: "1m 30s" },
          { name: "Generating previews", status: "completed", duration: "45s" },
          { name: "Creating mockups", status: "pending", duration: "2m 15s" },
          { name: "Exporting final files", status: "pending", duration: "—" },
          { name: "Uploading to gallery", status: "pending", duration: "—" },
        ]
      case "video":
        return [
          { name: "Loading project files", status: "completed", duration: "3m 20s" },
          { name: "Processing timeline", status: "completed", duration: "2m 45s" },
          { name: "Rendering preview", status: "pending", duration: "5m 30s" },
          { name: "Applying effects", status: "pending", duration: "—" },
          { name: "Final export", status: "pending", duration: "—" },
        ]
      default:
        return [
          { name: "Preparing files", status: "completed", duration: "1m 15s" },
          { name: "Processing content", status: "pending", duration: "2m 30s" },
          { name: "Generating preview", status: "pending", duration: "—" },
        ]
    }
  }

  const buildSteps = getProjectSteps(project.type)

  // Get project-specific tab info
  const getPreviewTabInfo = (projectType: string) => {
    switch (projectType) {
      case "software":
        return { label: "Live Build", icon: Terminal }
      case "design":
        return { label: "Design Preview", icon: Palette }
      case "video":
        return { label: "Video Preview", icon: Video }
      default:
        return { label: "Preview", icon: Eye }
    }
  }

  const previewTabInfo = getPreviewTabInfo(project.type)

  const chatMessages = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      message: "Just pushed the latest changes to the frontend. The new components are looking great!",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Alex Rivera",
      avatar: "AR",
      message:
        "Thanks Sarah! I've updated the design system with the new color palette. Check it out when you get a chance.",
      time: "1 hour ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar: "MJ",
      message: "Database migration is complete. All tables are set up and ready for testing.",
      time: "30 minutes ago",
    },
  ]

  const activityFeed = [
    {
      id: 1,
      user: "Sarah Chen",
      action: "completed task",
      target: "Set up project structure",
      time: "2 hours ago",
      type: "task",
    },
    {
      id: 2,
      user: "Alex Rivera",
      action: "uploaded new designs",
      target: "Component Library",
      time: "3 hours ago",
      type: "design",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "pushed 5 commits",
      target: "Database Schema",
      time: "4 hours ago",
      type: "commit",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "in-progress":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      case "pending":
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
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = taskFilter === "all" || task.status === taskFilter
    const matchesSearch =
      task.title.toLowerCase().includes(searchTasks.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTasks.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const startBuild = () => {
    setBuildStatus("building")

    // Simulate realistic build process with multiple steps
    const steps = getProjectSteps(project.type)
    let currentStep = 0

    const processStep = () => {
      if (currentStep < steps.length) {
        // Update step status to in-progress
        steps[currentStep].status = "in-progress"

        setTimeout(
          () => {
            // Mark current step as completed
            steps[currentStep].status = "completed"
            currentStep++

            if (currentStep < steps.length) {
              processStep()
            } else {
              setBuildStatus("success")
              // Show success message or redirect
              setTimeout(() => {
                alert(
                  `${project.type === "software" ? "Build" : "Process"} completed successfully! Your project is ready.`,
                )
              }, 500)
            }
          },
          Math.random() * 2000 + 1000,
        ) // Random delay between 1-3 seconds
      }
    }

    processStep()
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage("")
    }
  }

  // Get project-specific action button text
  const getActionButtonText = (projectType: string) => {
    switch (projectType) {
      case "software":
        return "Continue Building"
      case "design":
        return "Continue Designing"
      case "video":
        return "Continue Editing"
      default:
        return "Continue Working"
    }
  }

  // Get project-specific preview content
  const getPreviewContent = (projectType: string) => {
    switch (projectType) {
      case "software":
        return {
          title: "Live Preview",
          icon: Globe,
          description: "Your project will appear here once the build is complete",
          buttonText: "Open in New Tab",
        }
      case "design":
        return {
          title: "Design Gallery",
          icon: Layers,
          description: "Your design assets and mockups will appear here",
          buttonText: "View in Gallery",
        }
      case "video":
        return {
          title: "Video Player",
          icon: Monitor,
          description: "Your video preview will appear here once rendering is complete",
          buttonText: "Open in Player",
        }
      default:
        return {
          title: "Project Preview",
          icon: FileText,
          description: "Your project preview will appear here",
          buttonText: "View Preview",
        }
    }
  }

  const previewContent = getPreviewContent(project.type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Play className="h-4 w-4 mr-2" />
              {getActionButtonText(project.type)}
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="border-0 shadow-lg dark:bg-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Progress</h3>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tasks.filter((t) => t.status === "completed").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {tasks.filter((t) => t.status === "in-progress").length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{project.team.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date(project.dueDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Due Date</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="preview">{previewTabInfo.label}</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</Label>
                    <p className="text-gray-900 dark:text-white">{project.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Technologies</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Due Date</Label>
                    <p className="text-gray-900 dark:text-white">{new Date(project.dueDate).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityFeed.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === "commit" && <GitBranch className="h-4 w-4 text-white" />}
                          {activity.type === "task" && <CheckCircle className="h-4 w-4 text-white" />}
                          {activity.type === "design" && <Palette className="h-4 w-4 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white">
                            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                            <span className="font-medium text-purple-600 dark:text-purple-400">{activity.target}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTasks}
                  onChange={(e) => setSearchTasks(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {["all", "pending", "in-progress", "completed"].map((filter) => (
                  <Button
                    key={filter}
                    variant={taskFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTaskFilter(filter)}
                    className={taskFilter === filter ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1).replace("-", " ")}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="border-0 shadow-lg dark:bg-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Assigned to: {task.assignee}</span>
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Preview Tab (Dynamic based on project type) */}
          <TabsContent value="preview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between dark:text-white">
                    {previewTabInfo.label} Process
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={startBuild}
                        disabled={buildStatus === "building"}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {buildStatus === "building" ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Process
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {buildSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step.status === "completed"
                              ? "bg-green-500"
                              : step.status === "in-progress"
                                ? "bg-orange-500"
                                : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          {step.status === "completed" && <CheckCircle className="h-4 w-4 text-white" />}
                          {step.status === "in-progress" && <Clock className="h-4 w-4 text-white animate-spin" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{step.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{step.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <previewTabInfo.icon className="h-5 w-5" />
                    Process Logs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                    <div>$ Starting {project.type} process...</div>
                    <div>Loading project files...</div>
                    <div>✓ Files loaded successfully</div>
                    <div>Processing {project.type} assets...</div>
                    <div>✓ Assets processed</div>
                    <div>Generating preview...</div>
                    <div className="animate-pulse">Processing components...</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <previewContent.icon className="h-5 w-5" />
                  {previewContent.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {buildStatus === "success" ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-700 dark:text-green-300 font-medium">
                          {project.type === "software" ? "Build" : "Process"} completed successfully!
                        </p>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Your{" "}
                        {project.type === "software"
                          ? "application is ready for deployment"
                          : "project is ready for review"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        {previewContent.buttonText}
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
                    <previewContent.icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{previewContent.description}</p>
                    {buildStatus === "idle" && (
                      <Button onClick={startBuild} className="bg-green-600 hover:bg-green-700">
                        <Play className="h-4 w-4 mr-2" />
                        Start {project.type === "software" ? "Build" : "Process"}
                      </Button>
                    )}
                    {buildStatus === "building" && (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-green-600">Processing...</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Project Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activityFeed.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === "commit" && <GitBranch className="h-5 w-5 text-white" />}
                        {activity.type === "task" && <CheckCircle className="h-5 w-5 text-white" />}
                        {activity.type === "design" && <Palette className="h-5 w-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium text-purple-600 dark:text-purple-400">{activity.target}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
