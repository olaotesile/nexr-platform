"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Bell, Check, Users, GitBranch, MessageSquare, Calendar, Trash2 } from "lucide-react"
import { Header } from "@/components/header"
import { useNavigation } from "@/hooks/use-navigation"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "project_invite",
      title: "Project Invitation",
      message: "Sarah Chen invited you to join 'E-commerce Platform'",
      time: "2 minutes ago",
      read: false,
      avatar: "SC",
      actionable: true,
      projectId: "ecommerce-platform",
      inviterId: "sarah-chen",
    },
    {
      id: 2,
      type: "task_assigned",
      title: "Task Assigned",
      message: "You've been assigned to 'Payment Gateway Integration' in E-commerce Platform",
      time: "1 hour ago",
      read: false,
      avatar: "MJ",
      actionable: true,
      projectId: "ecommerce-platform",
      taskId: "payment-gateway",
    },
    {
      id: 3,
      type: "comment",
      title: "New Comment",
      message: "Alex Rivera commented on your design mockup: 'Great work on the user flow!'",
      time: "3 hours ago",
      read: true,
      avatar: "AR",
      actionable: true,
      projectId: "ecommerce-platform",
      commentId: "comment-123",
    },
    {
      id: 4,
      type: "deadline",
      title: "Deadline Reminder",
      message: "E-commerce Platform is due in 3 days. Current progress: 78%",
      time: "1 day ago",
      read: true,
      avatar: null,
      actionable: true,
      projectId: "ecommerce-platform",
    },
    {
      id: 5,
      type: "milestone",
      title: "Milestone Achieved",
      message: "Congratulations! You've completed 1000+ contributions across all projects",
      time: "2 days ago",
      read: false,
      avatar: null,
      actionable: false,
    },
    {
      id: 6,
      type: "team_join",
      title: "New Team Member",
      message: "Emma Wilson joined your Brand Identity Design project",
      time: "3 days ago",
      read: true,
      avatar: "EW",
      actionable: false,
      projectId: "brand-identity-design",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "project_invite":
        return <Users className="h-4 w-4" />
      case "task_assigned":
        return <GitBranch className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "deadline":
        return <Calendar className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const { goBack } = useNavigation()

  const handleAcceptInvite = (notificationId: number, projectId: string) => {
    // Mark notification as read and redirect to project
    markAsRead(notificationId)
    // In real app, would make API call to join project
    window.location.href = `/projects/${projectId}`
  }

  const handleViewTask = (notificationId: number, projectId: string, taskId: string) => {
    markAsRead(notificationId)
    // Create a more realistic task view URL
    window.location.href = `/projects/${projectId}/tasks/${taskId}`
  }

  const handleViewComment = (notificationId: number, projectId: string) => {
    markAsRead(notificationId)
    window.location.href = `/projects/${projectId}?tab=activity`
  }

  const handleViewProject = (notificationId: number, projectId: string) => {
    markAsRead(notificationId)
    window.location.href = `/projects/${projectId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-0 shadow-lg dark:bg-gray-800 transition-all duration-300 ${
                !notification.read ? "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-600 text-white">{notification.avatar}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                      <div className="flex items-center space-x-2">
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{notification.message}</p>

                    <div className="flex items-center space-x-2">
                      {notification.type === "project_invite" && notification.actionable && (
                        <>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleAcceptInvite(notification.id, notification.projectId)}
                          >
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteNotification(notification.id)}>
                            Decline
                          </Button>
                        </>
                      )}
                      {notification.type === "task_assigned" && notification.actionable && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleViewTask(notification.id, notification.projectId, notification.taskId)}
                        >
                          View Task
                        </Button>
                      )}
                      {notification.type === "comment" && notification.actionable && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewComment(notification.id, notification.projectId)}
                        >
                          View Comment
                        </Button>
                      )}
                      {notification.type === "deadline" && notification.actionable && (
                        <Button
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                          onClick={() => handleViewProject(notification.id, notification.projectId)}
                        >
                          View Project
                        </Button>
                      )}
                      {!notification.read && (
                        <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No notifications</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
