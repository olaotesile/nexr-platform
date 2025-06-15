"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/header"
import {
  ArrowLeft,
  Github,
  Figma,
  Globe,
  Camera,
  Music,
  Video,
  Code,
  CheckCircle,
  ExternalLink,
  Settings,
  Zap,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function IntegrationsPage() {
  const router = useRouter()
  const [integrations, setIntegrations] = useState([
    {
      id: "github",
      name: "GitHub",
      description: "Connect your GitHub repositories to automatically track code contributions",
      icon: Github,
      category: "Development",
      connected: true,
      lastSync: "2 minutes ago",
      status: "active",
      features: ["Commit tracking", "Repository analysis", "Code quality metrics", "Collaboration insights"],
      connectedAccount: "johndoe",
      repoCount: 12,
    },
    {
      id: "figma",
      name: "Figma",
      description: "Sync your Figma designs and track design contributions automatically",
      icon: Figma,
      category: "Design",
      connected: false,
      lastSync: null,
      status: "disconnected",
      features: ["Design file tracking", "Version history", "Component usage", "Team collaboration"],
      connectedAccount: null,
      repoCount: 0,
    },
    {
      id: "dribbble",
      name: "Dribbble",
      description: "Showcase your design portfolio and track engagement metrics",
      icon: Globe,
      category: "Design",
      connected: true,
      lastSync: "1 hour ago",
      status: "active",
      features: ["Portfolio sync", "Like tracking", "View analytics", "Shot management"],
      connectedAccount: "john_designer",
      repoCount: 24,
    },
    {
      id: "behance",
      name: "Behance",
      description: "Import your Behance projects and showcase your creative work",
      icon: Camera,
      category: "Design",
      connected: false,
      lastSync: null,
      status: "disconnected",
      features: ["Project import", "View tracking", "Appreciation metrics", "Portfolio showcase"],
      connectedAccount: null,
      repoCount: 0,
    },
    {
      id: "soundcloud",
      name: "SoundCloud",
      description: "Connect your music tracks and monitor play counts and engagement",
      icon: Music,
      category: "Music",
      connected: true,
      lastSync: "30 minutes ago",
      status: "active",
      features: ["Track upload sync", "Play count tracking", "Comment monitoring", "Follower analytics"],
      connectedAccount: "johnmusic",
      repoCount: 8,
    },
    {
      id: "youtube",
      name: "YouTube",
      description: "Track your video content performance and audience engagement",
      icon: Video,
      category: "Video",
      connected: false,
      lastSync: null,
      status: "disconnected",
      features: ["Video upload tracking", "View analytics", "Subscriber growth", "Engagement metrics"],
      connectedAccount: null,
      repoCount: 0,
    },
    {
      id: "vscode",
      name: "VS Code",
      description: "Track your coding activity and productivity metrics in real-time",
      icon: Code,
      category: "Development",
      connected: true,
      lastSync: "Live",
      status: "active",
      features: ["Real-time coding", "Language tracking", "Project time", "Productivity insights"],
      connectedAccount: "Local IDE",
      repoCount: 5,
    },
  ])

  const handleToggleIntegration = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              connected: !integration.connected,
              status: !integration.connected ? "active" : "disconnected",
              lastSync: !integration.connected ? "Just now" : null,
            }
          : integration,
      ),
    )
  }

  const handleRefreshSync = (integrationId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === integrationId ? { ...integration, lastSync: "Just now" } : integration,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "syncing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const connectedIntegrations = integrations.filter((i) => i.connected)
  const availableIntegrations = integrations.filter((i) => !i.connected)

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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Integrations</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Connect your tools to automatically track and verify your work
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{connectedIntegrations.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Connected</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {connectedIntegrations.reduce((sum, i) => sum + i.repoCount, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Synced</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {connectedIntegrations.filter((i) => i.status === "active").length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Syncs</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg dark:bg-gray-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{availableIntegrations.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Integrations */}
        {connectedIntegrations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Connected Integrations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {connectedIntegrations.map((integration) => (
                <Card key={integration.id} className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <integration.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <CardTitle className="dark:text-white">{integration.name}</CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400">@{integration.connectedAccount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(integration.status)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {integration.status}
                        </Badge>
                        <Switch
                          checked={integration.connected}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{integration.description}</p>

                    {/* Sync Status */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Last sync:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{integration.lastSync}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRefreshSync(integration.id)}
                          className="h-6 w-6 p-0"
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Project Count */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Projects synced:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{integration.repoCount}</span>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features</h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.slice(0, 3).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {integration.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{integration.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Integrations */}
        {availableIntegrations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Integrations</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {availableIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <integration.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <CardTitle className="dark:text-white">{integration.name}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {integration.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{integration.description}</p>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features</h4>
                      <div className="space-y-1">
                        {integration.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Zap className="h-3 w-3 text-purple-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connect Button */}
                    <Button
                      onClick={() => handleToggleIntegration(integration.id)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect {integration.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <Card className="border-0 shadow-lg dark:bg-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              How Integrations Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">1. Connect Your Tools</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Link your GitHub, Figma, or other creative tools to Nexr
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">2. Automatic Sync</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your work is automatically tracked and synced to your Nexr profile
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">3. Get Verified</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your contributions are verified and added to your portfolio
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
