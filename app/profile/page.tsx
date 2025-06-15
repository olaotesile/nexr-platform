"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  MapPin,
  LinkIcon,
  Calendar,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Target,
  GitBranch,
  Users,
  Heart,
  MessageSquare,
  Share,
  Eye,
  Star,
  Trophy,
  Code,
  Palette,
  Music,
  Video,
  Camera,
  PenTool,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { PortfolioExport } from "@/components/portfolio-export"
import { SkillAutoTagger } from "@/components/skill-auto-tagger"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  website: z.string().url({
    message: "Website must be a valid URL.",
  }),
  github: z.string().url({
    message: "GitHub URL must be a valid URL.",
  }),
  linkedin: z.string().url({
    message: "LinkedIn URL must be a valid URL.",
  }),
  twitter: z.string().url({
    message: "Twitter URL must be a valid URL.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "At least one skill is required.",
  }),
})

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(null)

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "John Doe",
      bio: "Passionate about creating beautiful, functional applications that solve real-world problems. Full-stack developer with a love for clean code and innovative design.",
      location: "San Francisco, CA",
      website: "https://johndoe.dev",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      skills: [
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "PostgreSQL",
        "AWS",
        "Docker",
        "Figma",
        "UI/UX Design",
        "Project Management",
      ],
    },
  })

  useEffect(() => {
    // Get profile data from localStorage and set as default values
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        const profile = JSON.parse(storedProfile)
        form.reset({
          name: profile.displayName || "John Doe",
          bio: profile.bio || "Passionate about creating beautiful, functional applications...",
          location: profile.location || "San Francisco, CA",
          website: profile.website || "https://johndoe.dev",
          github: profile.github || "https://github.com/johndoe",
          linkedin: profile.linkedin || "https://linkedin.com/in/johndoe",
          twitter: profile.twitter || "https://twitter.com/johndoe",
          skills: profile.skills || ["React", "TypeScript", "Node.js", "Python"],
        })
      }
    }
  }, [form])

  const userValues = form.getValues()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userProfile")
      if (stored) {
        setProfileData(JSON.parse(stored))
      }
    }
  }, [])

  const user = {
    ...userValues,
    username: profileData?.username || "johndoe",
    avatar: profileData?.displayName ? profileData.displayName.charAt(0).toUpperCase() : "JD",
    joinDate: "January 2023",
    email: "john@example.com",
    stats: {
      projects: 24,
      contributions: 1247,
      followers: 892,
      following: 156,
    },
  }

  const projects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Modern React-based shopping platform",
      category: "Web Development",
      image: "/placeholder.svg?height=200&width=300",
      likes: 45,
      views: 1200,
      technologies: ["React", "Node.js", "PostgreSQL"],
      status: "completed",
    },
    {
      id: 2,
      name: "Brand Identity Design",
      description: "Complete brand package for startup",
      category: "Graphic Design",
      image: "/placeholder.svg?height=200&width=300",
      likes: 32,
      views: 890,
      technologies: ["Figma", "Adobe Creative Suite"],
      status: "in-progress",
    },
    {
      id: 3,
      name: "Mobile Banking App",
      description: "Secure mobile banking solution",
      category: "Mobile Development",
      image: "/placeholder.svg?height=200&width=300",
      likes: 67,
      views: 1500,
      technologies: ["React Native", "Firebase"],
      status: "completed",
    },
    {
      id: 4,
      name: "Music Production Suite",
      description: "Digital audio workstation interface",
      category: "Music Production",
      image: "/placeholder.svg?height=200&width=300",
      likes: 28,
      views: 650,
      technologies: ["Electron", "Web Audio API"],
      status: "in-progress",
    },
  ]

  const activities = [
    {
      id: 1,
      type: "project_completed",
      message: "Completed E-commerce Platform project",
      time: "2 hours ago",
      icon: Trophy,
    },
    {
      id: 2,
      type: "contribution",
      message: "Made 15 contributions to Brand Identity Design",
      time: "1 day ago",
      icon: GitBranch,
    },
    {
      id: 3,
      type: "collaboration",
      message: "Started collaborating with Sarah Chen on Mobile Banking App",
      time: "3 days ago",
      icon: Users,
    },
    {
      id: 4,
      type: "achievement",
      message: "Reached 1000+ total contributions milestone",
      time: "1 week ago",
      icon: Star,
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web Development":
        return Code
      case "Graphic Design":
        return Palette
      case "Music Production":
        return Music
      case "Video Production":
        return Video
      case "Photography":
        return Camera
      case "Mobile Development":
        return Code
      default:
        return PenTool
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    form.handleSubmit((data) => {
      console.log(data)
      setIsEditing(false)
    })()
  }

  const handleCancel = () => {
    form.reset()
    setIsEditing(false)
  }

  const handleSkillsUpdate = (newSkills: string[]) => {
    form.setValue("skills", newSkills)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 mx-auto sm:mx-0">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-purple-600 text-white text-xl sm:text-2xl lg:text-4xl">
                {user.avatar}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              {isEditing ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((data) => {
                      console.log(data)
                      setIsEditing(false)
                    })}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Bio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="Website" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="GitHub URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="LinkedIn URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input placeholder="Twitter URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
                    <Button onClick={handleEdit} size="sm">
                      Edit
                    </Button>
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      size="sm"
                      className={
                        isFollowing
                          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          : "bg-purple-600 hover:bg-purple-700"
                      }
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {isEditing ? null : (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed text-sm sm:text-base">
                    {user.bio}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href={user.website} className="text-purple-600 dark:text-purple-400 hover:underline">
                        {user.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {user.joinDate}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                    <a
                      href={user.github}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={user.linkedin}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={user.twitter}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Stats - Better Mobile Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{user.stats.projects}</div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2">
                <GitBranch className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.contributions}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Contributions</div>
            </div>
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.followers}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {user.stats.following}
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Following</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm">
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs sm:text-sm">
              Skills
            </TabsTrigger>
            <TabsTrigger value="export" className="text-xs sm:text-sm">
              Export
            </TabsTrigger>
            <TabsTrigger value="about" className="text-xs sm:text-sm">
              About
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Featured Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {projects.slice(0, 4).map((project) => {
                        const IconComponent = getCategoryIcon(project.category)
                        return (
                          <Link key={project.id} href={`/projects/${project.id}`}>
                            <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                  <Badge variant="outline" className="text-xs">
                                    {project.category}
                                  </Badge>
                                </div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                  <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1">
                                      <Heart className="h-4 w-4" />
                                      <span>{project.likes}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Eye className="h-4 w-4" />
                                      <span>{project.views}</span>
                                    </div>
                                  </div>
                                  <Badge
                                    className={
                                      project.status === "completed"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                        : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    }
                                  >
                                    {project.status}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <activity.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                const IconComponent = getCategoryIcon(project.category)
                return (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <Card className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <IconComponent className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{project.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{project.views}</span>
                            </div>
                            {/* Add verification indicator */}
                            <div className="flex items-center space-x-1">
                              <Shield className="h-4 w-4 text-green-500" />
                              <span className="text-green-600 dark:text-green-400">Verified</span>
                            </div>
                          </div>
                          <Badge
                            className={
                              project.status === "completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Current Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-sm">
                            {skill}
                          </Badge>
                          {/* Add skill verification level */}
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            L3
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <SkillAutoTagger
                  userId={user.username}
                  currentSkills={user.skills}
                  onSkillsUpdate={handleSkillsUpdate}
                />
              </div>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <PortfolioExport userId={user.username} userProfile={user} />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">About</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bio</h4>
                    <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">{user.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Website</h4>
                    <a href={user.website} className="text-purple-600 dark:text-purple-400 hover:underline">
                      {user.website}
                    </a>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Member Since</h4>
                    <p className="text-gray-600 dark:text-gray-300">{user.joinDate}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-300">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-gray-400" />
                    <a href={user.github} className="text-purple-600 dark:text-purple-400 hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-5 w-5 text-gray-400" />
                    <a href={user.linkedin} className="text-purple-600 dark:text-purple-400 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Twitter className="h-5 w-5 text-gray-400" />
                    <a href={user.twitter} className="text-purple-600 dark:text-purple-400 hover:underline">
                      Twitter Profile
                    </a>
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
