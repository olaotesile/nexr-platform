"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowLeft,
  Plus,
  X,
  Users,
  Target,
  Settings,
  Bell,
  Sparkles,
  Brain,
  CheckCircle,
  Clock,
  Globe,
  MessageSquare,
  ListTodo,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewProject() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [generateTasks, setGenerateTasks] = useState(false)
  const [generatedTasks, setGeneratedTasks] = useState<any[]>([])
  const [isGeneratingTasks, setIsGeneratingTasks] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "medium",
    dueDate: "",
    isPublic: true,
    technologies: [] as string[],
    teamMembers: [] as string[],
  })
  const [newTech, setNewTech] = useState("")
  const [newMember, setNewMember] = useState("")

  const categories = [
    "Web Development",
    "Mobile App",
    "Desktop Software",
    "AI/ML Project",
    "Data Science",
    "Game Development",
    "Music Production",
    "Video Production",
    "Graphic Design",
    "UI/UX Design",
    "Photography",
    "Writing & Content",
    "Marketing Campaign",
    "Business Strategy",
    "Research Project",
    "Art & Illustration",
    "Architecture",
    "Fashion Design",
    "Product Design",
    "Event Planning",
    "Education & Training",
    "Non-Profit Initiative",
    "Startup Venture",
    "Other",
  ]

  const suggestedTechnologies = [
    // Development
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    // Design
    "Figma",
    "Adobe Creative Suite",
    "Sketch",
    "Canva",
    "Blender",
    "Cinema 4D",
    "After Effects",
    "Premiere Pro",
    // Music & Audio
    "Pro Tools",
    "Logic Pro",
    "Ableton Live",
    "FL Studio",
    "Audacity",
    // Writing & Content
    "WordPress",
    "Notion",
    "Google Workspace",
    "Grammarly",
    "Hemingway Editor",
    // Marketing
    "HubSpot",
    "Mailchimp",
    "Google Analytics",
    "Facebook Ads",
    "Instagram",
    "TikTok",
    // Business
    "Slack",
    "Trello",
    "Asana",
    "Zoom",
    "Microsoft Office",
    "Salesforce",
    // Other Tools
    "GitHub",
    "Git",
    "Jira",
    "Confluence",
    "Miro",
    "FigJam",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addTechnology = (tech: string) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const addTeamMember = () => {
    if (newMember && !formData.teamMembers.includes(newMember)) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, newMember],
      }))
      setNewMember("")
    }
  }

  const removeTeamMember = (member: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m !== member),
    }))
  }

  const generateAITasks = async () => {
    setIsGeneratingTasks(true)

    // Simulate AI task generation
    setTimeout(() => {
      const mockTasks = [
        {
          id: 1,
          title: "Set up project structure",
          description: "Initialize the project repository and basic folder structure",
          assignee: formData.teamMembers[0] || "Project Lead",
          priority: "high",
          estimatedHours: 4,
          category: "Setup",
        },
        {
          id: 2,
          title: "Design system creation",
          description: "Create design tokens, color palette, and component library",
          assignee: formData.teamMembers.find((m) => m.includes("design")) || formData.teamMembers[1] || "Designer",
          priority: "high",
          estimatedHours: 16,
          category: "Design",
        },
        {
          id: 3,
          title: "Database schema design",
          description: "Design and implement the database structure",
          assignee:
            formData.teamMembers.find((m) => m.includes("backend")) || formData.teamMembers[0] || "Backend Developer",
          priority: "medium",
          estimatedHours: 8,
          category: "Backend",
        },
        {
          id: 4,
          title: "User authentication system",
          description: "Implement user registration, login, and session management",
          assignee: formData.teamMembers[0] || "Developer",
          priority: "high",
          estimatedHours: 12,
          category: "Backend",
        },
        {
          id: 5,
          title: "Frontend components",
          description: "Build reusable UI components based on design system",
          assignee:
            formData.teamMembers.find((m) => m.includes("frontend")) || formData.teamMembers[1] || "Frontend Developer",
          priority: "medium",
          estimatedHours: 20,
          category: "Frontend",
        },
        {
          id: 6,
          title: "Testing setup",
          description: "Set up unit tests, integration tests, and CI/CD pipeline",
          assignee: formData.teamMembers[formData.teamMembers.length - 1] || "QA Engineer",
          priority: "medium",
          estimatedHours: 10,
          category: "Testing",
        },
      ]

      setGeneratedTasks(mockTasks)
      setIsGeneratingTasks(false)
    }, 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate project creation
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to the new project page
      router.push("/projects/1")
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.description && formData.category
      case 2:
        return formData.technologies.length > 0
      case 3:
        return true
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center">
                <img src="/images/nexr-logo.png" alt="Nexr" className="h-12 w-auto" />
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link href="/projects" className="text-purple-600 dark:text-purple-400 font-medium">
                  Projects
                </Link>
                <Link
                  href="/team"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Team
                </Link>
                <Link
                  href="/portfolio"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <Link href="/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-purple-600 text-white">JD</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Project</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Set up your project and start collaborating with your team
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-purple-600" : "bg-gray-200 dark:bg-gray-700"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Project Details</span>
            <span>Technologies</span>
            <span>Team & Settings</span>
            <span>AI Task Planning</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-0 shadow-lg dark:bg-gray-800 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                {currentStep === 1 && (
                  <>
                    <Target className="h-5 w-5" />
                    Project Details
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Globe className="h-5 w-5" />
                    Technologies & Stack
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <Users className="h-5 w-5" />
                    Team & Settings
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <ListTodo className="h-5 w-5" />
                    AI Task Planning
                  </>
                )}
              </CardTitle>
              <CardDescription className="dark:text-gray-300">
                {currentStep === 1 && "Tell us about your project and what you're building"}
                {currentStep === 2 && "Select the technologies and tools you'll be using"}
                {currentStep === 3 && "Invite team members and configure project settings"}
                {currentStep === 4 && "Let AI generate and delegate tasks for your team"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Project Details */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-gray-200">
                      Project Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your project name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="dark:text-gray-200">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe what you're building and its purpose"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="dark:text-gray-200">
                        Category *
                      </Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="dark:text-gray-200">
                        Priority
                      </Label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate" className="dark:text-gray-200">
                      Due Date (Optional)
                    </Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </>
              )}

              {/* Step 2: Technologies */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="dark:text-gray-200 mb-3 block">Add Technologies</Label>
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Enter technology name"
                          value={newTech}
                          onChange={(e) => setNewTech(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology(newTech))}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <Button type="button" onClick={() => addTechnology(newTech)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="dark:text-gray-200 mb-3 block">Suggested Technologies</Label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {suggestedTechnologies.map((tech) => (
                          <Button
                            key={tech}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addTechnology(tech)}
                            disabled={formData.technologies.includes(tech)}
                            className="text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {formData.technologies.length > 0 && (
                      <div>
                        <Label className="dark:text-gray-200 mb-3 block">Selected Technologies</Label>
                        <div className="flex flex-wrap gap-2">
                          {formData.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                              {tech}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => removeTechnology(tech)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Suggestion */}
                  <Card className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">AI Suggestion</h4>
                          <p className="text-sm text-purple-700 dark:text-purple-200">
                            Based on your project description, I recommend adding React, Node.js, and PostgreSQL to your
                            tech stack for a robust web application.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Step 3: Team & Settings */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="dark:text-gray-200 mb-3 block">Invite Team Members (Optional)</Label>
                      <div className="flex gap-2 mb-4">
                        <Input
                          placeholder="Enter email address"
                          value={newMember}
                          onChange={(e) => setNewMember(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTeamMember())}
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <Button type="button" onClick={addTeamMember}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {formData.teamMembers.length > 0 && (
                      <div>
                        <Label className="dark:text-gray-200 mb-3 block">Invited Members</Label>
                        <div className="space-y-2">
                          {formData.teamMembers.map((member) => (
                            <div
                              key={member}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-purple-600 text-white text-xs">
                                    {member.split("@")[0].slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-gray-900 dark:text-white">{member}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button type="button" variant="ghost" size="sm">
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTeamMember(member)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* AI Task Generation */}
                  {formData.teamMembers.length > 0 && (
                    <Card className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                              AI Task Generation
                            </h4>
                            <p className="text-sm text-purple-700 dark:text-purple-200 mb-3">
                              I can automatically generate and delegate tasks based on your project description and team
                              members' skills.
                            </p>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="generateTasks"
                                checked={generateTasks}
                                onChange={(e) => setGenerateTasks(e.target.checked)}
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                              />
                              <Label htmlFor="generateTasks" className="text-sm text-purple-900 dark:text-purple-100">
                                Generate AI-powered task breakdown and assignments
                              </Label>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="isPublic"
                        checked={formData.isPublic}
                        onChange={(e) => setFormData((prev) => ({ ...prev, isPublic: e.target.checked }))}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="isPublic" className="dark:text-gray-200">
                        Make this project public
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                      Public projects can be discovered by other users and contribute to your portfolio
                    </p>
                  </div>
                </>
              )}

              {/* Step 4: AI Task Planning */}
              {currentStep === 4 && (
                <>
                  {!generateTasks ? (
                    <div className="text-center py-8">
                      <ListTodo className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        AI Task Generation Disabled
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        You can enable AI task generation in the previous step to automatically create and delegate
                        tasks.
                      </p>
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>
                        Go Back to Enable AI Tasks
                      </Button>
                    </div>
                  ) : generatedTasks.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Ready to Generate AI Tasks
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Let AI analyze your project and create a comprehensive task breakdown with smart team
                        assignments.
                      </p>
                      <Button
                        type="button"
                        onClick={generateAITasks}
                        disabled={isGeneratingTasks}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isGeneratingTasks ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            Generating Tasks...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate AI Tasks
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">Generated Task Breakdown</h4>
                        <Badge variant="secondary">{generatedTasks.length} tasks</Badge>
                      </div>

                      <div className="space-y-3">
                        {generatedTasks.map((task) => (
                          <Card key={task.id} className="border border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h5 className="font-medium text-gray-900 dark:text-white">{task.title}</h5>
                                    <Badge
                                      className={
                                        task.priority === "high"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                          : task.priority === "medium"
                                            ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                                      }
                                    >
                                      {task.priority}
                                    </Badge>
                                    <Badge variant="outline">{task.category}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{task.description}</p>
                                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Assigned to: {task.assignee}</span>
                                    <span>Est. {task.estimatedHours}h</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <p className="text-sm text-green-700 dark:text-green-200">
                            Tasks have been intelligently assigned based on team member skills and project requirements.
                            You can modify assignments after project creation.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>
            <div className="flex gap-2">
              {currentStep < 4 ? (
                <Button type="button" onClick={nextStep} disabled={!canProceed()}>
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isLoading || (generateTasks && generatedTasks.length === 0)}
                >
                  {isLoading ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Creating Project...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Create Project
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
