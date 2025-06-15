"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import {
  Search,
  Users,
  Calendar,
  ArrowLeft,
  Eye,
  UserPlus,
  Clock,
  Target,
  Code,
  Palette,
  Camera,
  Music,
  Video,
  PenTool,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function JoinProjectPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock data for available projects to join
  const availableProjects = [
    {
      id: "startup-website",
      name: "Startup Website Redesign",
      description:
        "Modern, responsive website for a fintech startup. Looking for frontend developers and UI designers.",
      category: "Web Development",
      owner: "TechStart Inc.",
      ownerAvatar: "TS",
      teamSize: 3,
      maxTeamSize: 6,
      skills: ["React", "TypeScript", "Figma", "UI/UX Design"],
      difficulty: "Intermediate",
      duration: "6-8 weeks",
      status: "recruiting",
      applications: 12,
      dueDate: "2024-03-15",
      compensation: "Paid",
      remote: true,
      description_full:
        "We're building a comprehensive website for our fintech startup and need talented developers and designers to join our team. This is a great opportunity to work with cutting-edge technologies and build something impactful.",
    },
    {
      id: "mobile-game",
      name: "2D Mobile Puzzle Game",
      description: "Indie puzzle game for iOS and Android. Seeking game developers, artists, and sound designers.",
      category: "Game Development",
      owner: "Indie Games Studio",
      ownerAvatar: "IG",
      teamSize: 2,
      maxTeamSize: 5,
      skills: ["Unity", "C#", "2D Art", "Sound Design"],
      difficulty: "Advanced",
      duration: "12-16 weeks",
      status: "recruiting",
      applications: 8,
      dueDate: "2024-05-20",
      compensation: "Revenue Share",
      remote: true,
      description_full:
        "Join our indie game development team to create an innovative puzzle game. We're looking for passionate developers and artists who want to be part of something creative and potentially profitable.",
    },
    {
      id: "documentary-film",
      name: "Climate Change Documentary",
      description:
        "Educational documentary about renewable energy solutions. Need video editors and motion graphics artists.",
      category: "Video Production",
      owner: "Green Future Media",
      ownerAvatar: "GF",
      teamSize: 4,
      maxTeamSize: 7,
      skills: ["Video Editing", "After Effects", "Motion Graphics", "Color Grading"],
      difficulty: "Intermediate",
      duration: "10-12 weeks",
      status: "recruiting",
      applications: 15,
      dueDate: "2024-04-10",
      compensation: "Paid",
      remote: false,
      description_full:
        "Help us create an impactful documentary about climate change solutions. This project aims to educate and inspire action on renewable energy adoption worldwide.",
    },
    {
      id: "music-album",
      name: "Collaborative Music Album",
      description:
        "Electronic music album featuring multiple artists. Looking for producers, vocalists, and mixing engineers.",
      category: "Music Production",
      owner: "Collective Sounds",
      ownerAvatar: "CS",
      teamSize: 5,
      maxTeamSize: 10,
      skills: ["Music Production", "Vocals", "Mixing", "Mastering"],
      difficulty: "Advanced",
      duration: "16-20 weeks",
      status: "recruiting",
      applications: 22,
      dueDate: "2024-06-30",
      compensation: "Revenue Share",
      remote: true,
      description_full:
        "Join a collaborative effort to create a groundbreaking electronic music album. We're bringing together talented musicians from around the world to create something unique.",
    },
    {
      id: "brand-identity",
      name: "Sustainable Fashion Brand",
      description:
        "Complete brand identity for eco-friendly clothing startup. Seeking graphic designers and brand strategists.",
      category: "Graphic Design",
      owner: "EcoWear",
      ownerAvatar: "EW",
      teamSize: 2,
      maxTeamSize: 4,
      skills: ["Brand Design", "Logo Design", "Typography", "Packaging Design"],
      difficulty: "Intermediate",
      duration: "8-10 weeks",
      status: "recruiting",
      applications: 18,
      dueDate: "2024-03-25",
      compensation: "Paid",
      remote: true,
      description_full:
        "Help create a compelling brand identity for a sustainable fashion startup. This project focuses on communicating environmental values through thoughtful design.",
    },
    {
      id: "photography-exhibition",
      name: "Digital Photography Exhibition",
      description: "Online photography exhibition showcasing urban landscapes. Need photographers and web developers.",
      category: "Photography",
      owner: "Urban Lens Collective",
      ownerAvatar: "UL",
      teamSize: 6,
      maxTeamSize: 12,
      skills: ["Photography", "Photo Editing", "Web Development", "Curation"],
      difficulty: "Beginner",
      duration: "6-8 weeks",
      status: "recruiting",
      applications: 25,
      dueDate: "2024-02-28",
      compensation: "Portfolio Credit",
      remote: true,
      description_full:
        "Contribute to a digital photography exhibition celebrating urban landscapes. Great opportunity for emerging photographers to showcase their work.",
    },
  ]

  const categories = [
    "all",
    "Web Development",
    "Game Development",
    "Video Production",
    "Music Production",
    "Graphic Design",
    "Photography",
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web Development":
        return <Code className="h-4 w-4" />
      case "Game Development":
        return <Target className="h-4 w-4" />
      case "Video Production":
        return <Video className="h-4 w-4" />
      case "Music Production":
        return <Music className="h-4 w-4" />
      case "Graphic Design":
        return <Palette className="h-4 w-4" />
      case "Photography":
        return <Camera className="h-4 w-4" />
      default:
        return <PenTool className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recruiting":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "full":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "starting-soon":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Intermediate":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const filteredProjects = availableProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleApplyToProject = (projectId: string) => {
    // In real app, would open application modal or redirect to application page
    alert(`Application submitted for project: ${projectId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Join a Project</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Find exciting projects to collaborate on and build your portfolio
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{filteredProjects.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available Projects</div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-lg dark:bg-gray-800 mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects by name, description, or required skills..."
                  className="pl-10 border-gray-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-purple-600 text-white">{project.ownerAvatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.owner}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">{getCategoryIcon(project.category)}</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getStatusColor(project.status)}>{project.status.replace("-", " ")}</Badge>
                  <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                  <Badge variant="outline">{project.category}</Badge>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{project.description}</p>

                {/* Skills Required */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Skills Needed</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {project.teamSize}/{project.maxTeamSize} members
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{project.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Due: {new Date(project.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{project.compensation}</span>
                  </div>
                </div>

                {/* Applications Count */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{project.applications} applications received</span>
                  <Badge variant="outline" className="text-xs">
                    {project.remote ? "Remote" : "On-site"}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      // Show project details modal or navigate to detail page
                      alert(`Viewing details for: ${project.name}`)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleApplyToProject(project.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Apply to Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Try adjusting your search terms or category filter to find projects that match your skills.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
