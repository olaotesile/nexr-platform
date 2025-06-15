"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, Settings, Shield, Globe, Trash2, Save, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Form states
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    teamInvites: true,
    weeklyDigest: false,
    marketingEmails: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,
    allowDirectMessages: true,
    showActivity: true,
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
    alert(`${section} settings saved successfully!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="self-start">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger
              value="notifications"
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3"
            >
              <Bell className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3">
              <Shield className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Account</span>
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="dark:text-white text-lg sm:text-xl">Notification Preferences</CardTitle>
                <CardDescription className="dark:text-gray-300 text-sm">
                  Choose how you want to be notified about activity on Nexr
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Email Notifications</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Push Notifications</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Project Updates</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Get notified about project progress and updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.projectUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, projectUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Team Invites</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Get notified when you're invited to join a team
                      </p>
                    </div>
                    <Switch
                      checked={notifications.teamInvites}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, teamInvites: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Weekly Digest</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Receive a weekly summary of your activity
                      </p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Marketing Emails</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Receive updates about new features and tips
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleSave("Notification")}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="dark:text-white text-lg sm:text-xl">Privacy Settings</CardTitle>
                <CardDescription className="dark:text-gray-300 text-sm">
                  Control who can see your information and activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base font-medium">Profile Visibility</Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant={privacy.profileVisibility === "public" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPrivacy({ ...privacy, profileVisibility: "public" })}
                        className="w-full sm:w-auto"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Public
                      </Button>
                      <Button
                        variant={privacy.profileVisibility === "private" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPrivacy({ ...privacy, profileVisibility: "private" })}
                        className="w-full sm:w-auto"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Private
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Show Email Address</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Allow others to see your email address
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Show Location</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Display your location on your profile
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showLocation}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showLocation: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Allow Direct Messages</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Let other users send you direct messages
                      </p>
                    </div>
                    <Switch
                      checked={privacy.allowDirectMessages}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDirectMessages: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm sm:text-base font-medium">Show Activity</Label>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Display your recent activity to others
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showActivity}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showActivity: checked })}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleSave("Privacy")}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="dark:text-white text-lg sm:text-xl">Account Settings</CardTitle>
                <CardDescription className="dark:text-gray-300 text-sm">
                  Manage your account security and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-sm sm:text-base">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-sm sm:text-base">
                      New Password
                    </Label>
                    <Input id="new-password" type="password" placeholder="Enter new password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm sm:text-base">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                  </div>
                </div>

                <Button
                  onClick={() => handleSave("Password")}
                  disabled={isLoading}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 shadow-lg dark:bg-gray-800 border-red-200 dark:border-red-800">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-red-600 dark:text-red-400 text-lg sm:text-xl">Danger Zone</CardTitle>
                <CardDescription className="dark:text-gray-300 text-sm">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">Delete Account</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
