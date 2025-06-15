"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import {
  Search,
  Users,
  Star,
  MapPin,
  Code,
  Palette,
  Camera,
  Music,
  ArrowLeft,
  UserPlus,
  Eye,
  MessageCircle,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Mock data for creatives (only shown after search)
  const allCreatives = [
    {
      id: "sarah-chen",
      name: "Sarah Chen",
      username: "@sarahdesigns",
      avatar: "SC",
      location: "San Francisco, CA",
      category: "UI/UX Designer",
      bio: "Passionate about creating beautiful, user-centered digital experiences. 5+ years in product design.",
      skills: ["UI Design", "UX Research", "Figma", "Prototyping", "Design Systems"],
      followers: 1240,
      following: 890,
      projects: 23,
      rating: 4.9,
      isFollowing: false,
      recentWork: [
        { title: "E-commerce Mobile App", image: "/placeholder.svg?height=200&width=300" },
        { title: "SaaS Dashboard", image: "/placeholder.svg?height=200&width=300" },
        { title: "Brand Identity", image: "/placeholder.svg?height=200&width=300" },
      ],
      joinedDate: "2022-03-15",
      verified: true,
    },
    {
      id: "mike-johnson",
      name: "Mike Johnson",
      username: "@mikecodes",
      avatar: "MJ",
      location: "New York, NY",
      category: "Full-Stack Developer",
      bio: "Building scalable web applications with React, Node.js, and cloud technologies. Open source contributor.",
      skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
      followers: 2100,
      following: 450,
      projects: 31,
      rating: 4.8,
      isFollowing: true,
      recentWork: [
        { title: "Social Media Platform", image: "/placeholder.svg?height=200&width=300" },
        { title: "API Gateway", image: "/placeholder.svg?height=200&width=300" },
        { title: "Real-time Chat App", image: "/placeholder.svg?height=200&width=300" },
      ],
      joinedDate: "2021-08-22",
      verified: true,
    },
    {
      id: "emma-wilson",
      name: "Emma Wilson",
      username: "@emmacreates",
      avatar: "EW",
      location: "London, UK",
      category: "Graphic Designer",
      bio: "Creative visual storyteller specializing in brand identity and digital marketing materials.",
      skills: ["Adobe Creative Suite", "Branding", "Print Design", "Illustration", "Typography"],
      followers: 890,
      following: 320,
      projects: 18,
      rating: 4.7,
      isFollowing: false,
      recentWork: [
        { title: "Restaurant Branding", image: "/placeholder.svg?height=200&width=300" },
        { title: "Magazine Layout", image: "/placeholder.svg?height=200&width=300" },
        { title: "Logo Collection", image: "/placeholder.svg?height=200&width=300" },
      ],
      joinedDate: "2023-01-10",
      verified: false,
    },
    {
      id: "alex-rivera",
      name: "Alex Rivera",
      username: "@alexshoots",
      avatar: "AR",
      location: "Los Angeles, CA",
      category: "Photographer",
      bio: "Professional photographer capturing moments that tell stories. Specializing in portraits and events.",
      skills: ["Portrait Photography", "Event Photography", "Photo Editing", "Lightroom", "Photoshop"],
      followers: 3200,
      following: 180,
      projects: 45,
      rating: 4.9,
      isFollowing: false,
      recentWork: [
        { title: "Wedding Portfolio", image: "/placeholder.svg?height=200&width=300" },
        { title: "Corporate Headshots", image: "/placeholder.svg?height=200&width=300" },
        { title: "Street Photography", image: "/placeholder.svg?height=200&width=300" },
      ],
      joinedDate: "2020-11-05",
      verified: true,
    },
    {
      id: "david-kim",
      name: "David Kim",
      username: "@davidmusic",
      avatar: "DK",
      location: "Nashville, TN",
      category: "Music Producer",
      bio: "Award-winning music producer and sound engineer. Creating unique soundscapes for artists worldwide.",
      skills: ["Music Production", "Sound Engineering", "Pro Tools", "Mixing", "Mastering"],
      followers: 1560,
      following: 670,
      projects: 28,
      rating: 4.8,
      isFollowing: true,
      recentWork: [
        { title: "Indie Rock Album", image: "/placeholder.svg?height=200&width=300" },
        { title: "Podcast Intro Music", image: "/placeholder.svg?height=200&width=300" },
        { title: "Commercial Jingle", image: "/placeholder.svg?height=200&width=300" },
      ],
      joinedDate: "2022-07-18",
      verified: true,
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "UI/UX Designer":
        return <Palette className="h-4 w-4" />
      case "Full-Stack Developer":
        return <Code className="h-4 w-4" />
      case "Graphic Designer":
        return <Palette className="h-4 w-4" />
      case "Photographer":
        return <Camera className="h-4 w-4" />
      case "Music Producer":
        return <Music className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    // Simulate search delay
    setTimeout(() => {
      const results = allCreatives.filter(
        (creative) =>
          creative.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creative.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creative.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
          creative.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
          creative.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  const handleFollow = (creativeId: string) => {
    setSearchResults((prev) =>
      prev.map((creative) =>
        creative.id === creativeId ? { ...creative, isFollowing: !creative.isFollowing } : creative,
      ),
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6 sm:mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Search Creatives</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Find talented creators and view their work
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="border-0 shadow-lg dark:bg-gray-800 mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, username, skills, or category..."
                  className="pl-10 border-gray-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <>
            {isSearching ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Searching for creatives...</p>
              </div>
            ) : (
              <>
                {searchResults.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Found {searchResults.length} creative{searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {searchResults.map((creative) => (
                        <Card
                          key={creative.id}
                          className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group"
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                    {creative.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{creative.name}</h3>
                                    {creative.verified && (
                                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{creative.username}</p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={creative.isFollowing ? "outline" : "default"}
                                onClick={() => handleFollow(creative.id)}
                                className={creative.isFollowing ? "" : "bg-purple-600 hover:bg-purple-700"}
                              >
                                <UserPlus className="h-4 w-4 mr-2" />
                                {creative.isFollowing ? "Following" : "Follow"}
                              </Button>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(creative.category)}
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {creative.category}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>{creative.location}</span>
                              </div>

                              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{creative.bio}</p>

                              {/* Skills */}
                              <div className="flex flex-wrap gap-1">
                                {creative.skills.slice(0, 3).map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {creative.skills.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{creative.skills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">{creative.projects}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {creative.followers.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                              </div>
                              <div className="flex items-center justify-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-semibold text-gray-900 dark:text-white">{creative.rating}</span>
                              </div>
                            </div>

                            {/* Recent Work Preview */}
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Recent Work</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {creative.recentWork.map((work, idx) => (
                                  <div
                                    key={idx}
                                    className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group-hover:scale-105 transition-transform"
                                  >
                                    <img
                                      src={work.image || "/placeholder.svg"}
                                      alt={work.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <Link href={`/profile/${creative.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </Button>
                              </Link>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 sm:py-16">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Search className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No creatives found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                      No creatives match your search for "{searchQuery}". Try different keywords or check your spelling.
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        setSearchResults([])
                        setHasSearched(false)
                      }}
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Initial State - No Search Yet */}
        {!hasSearched && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Search for Creatives
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto px-4">
              Enter a name, username, skill, or category in the search bar above to find talented creatives on Nexr.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
