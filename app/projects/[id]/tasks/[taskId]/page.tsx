"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, MessageSquare, Paperclip, Play, Flag, Shield, GitBranch, Code } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function TaskDetailPage({ params }: { params: { id: string; taskId: string } }) {
  const [taskStatus, setTaskStatus] = useState("in-progress")
  const [comment, setComment] = useState("")

  const task = {
    id: params.taskId,
    title: "Implement Shopping Cart State Management",
    description:
      "Create a React Context for managing shopping cart state across the application. Include add, remove, update quantity, and clear cart functionality.",
    priority: "high",
    status: "in-progress",
    assignee: {
      name: "Alex Chen",
      avatar: "AC",
      username: "alexchen",
    },
    reporter: {
      name: "Sarah Chen",
      avatar: "SC",
      username: "sarahchen",
    },
    estimatedHours: 8,
    actualHours: 5.5,
    dueDate: "2024-01-20",
    tags: ["React", "State Management", "TypeScript"],
    attachments: [
      { name: "cart-wireframes.pdf", size: "2.3 MB" },
      { name: "api-spec.json", size: "1.1 MB" },
    ],
    subtasks: [
      { id: 1, title: "Create CartContext", completed: true },
      { id: 2, title: "Implement cart actions", completed: true },
      { id: 3, title: "Add TypeScript interfaces", completed: false },
      { id: 4, title: "Write unit tests", completed: false },
    ],
    comments: [
      {
        id: 1,
        author: "Sarah Chen",
        avatar: "SC",
        content: "Great progress on the context setup! Make sure to add proper TypeScript types.",
        timestamp: "2 hours ago",
        verified: true,
      },
      {
        id: 2,
        author: "Mike Johnson",
        avatar: "MJ",
        content: "I've updated the API endpoints. The cart data structure is now finalized.",
        timestamp: "4 hours ago",
        verified: false,
      },
    ],
    verificationRequests: [
      {
        id: 1,
        requester: "Alex Chen",
        skill: "React Context",
        status: "pending",
        reviewers: ["Sarah Chen", "Mike Johnson"],
      },
    ],
  }

  const handleStatusChange = (newStatus: string) => {
    setTaskStatus(newStatus)
    // In real app, would make API call
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      // Add comment logic
      setComment("")
    }
  }

  const handleRequestVerification = () => {
    // Request verification logic
    alert("Verification request sent to team members!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4">
            <Link href={`/projects/${params.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Project
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Task #{task.id} • E-commerce Platform
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/projects/${params.id}/build`}>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Code className="h-4 w-4 mr-2" />
                Start Coding
              </Button>
            </Link>
            <Button onClick={handleRequestVerification} variant="outline">
              <Shield className="h-4 w-4 mr-2" />
              Request Verification
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Details */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    </div>
                    <CardTitle className="dark:text-white">{task.title}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={taskStatus === "in-progress" ? "default" : "outline"}
                      onClick={() => handleStatusChange("in-progress")}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant={taskStatus === "completed" ? "default" : "outline"}
                      onClick={() => handleStatusChange("completed")}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">{task.description}</p>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Subtasks Progress</span>
                    <span>
                      {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length}
                    </span>
                  </div>
                  <Progress
                    value={(task.subtasks.filter((st) => st.completed).length / task.subtasks.length) * 100}
                    className="h-2"
                  />
                </div>

                {/* Subtasks */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Subtasks</h4>
                  <div className="space-y-2">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            subtask.completed ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {subtask.completed && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span
                          className={`text-sm ${
                            subtask.completed
                              ? "line-through text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Skills & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                {task.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {task.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <Paperclip className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{attachment.name}</span>
                          <span className="text-xs text-gray-500">({attachment.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <MessageSquare className="h-5 w-5" />
                  Comments ({task.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button onClick={handleAddComment} disabled={!comment.trim()}>
                    Add Comment
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">{comment.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          {comment.verified && <Shield className="h-3 w-3 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Info */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white text-sm">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Assignee</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {task.assignee.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900 dark:text-white">{task.assignee.name}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Reporter</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {task.reporter.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900 dark:text-white">{task.reporter.name}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Due Date</span>
                    <span className="text-sm text-gray-900 dark:text-white">{task.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Estimated</span>
                    <span className="text-sm text-gray-900 dark:text-white">{task.estimatedHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Time Spent</span>
                    <span className="text-sm text-gray-900 dark:text-white">{task.actualHours}h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verification Requests */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white text-sm">
                  <Shield className="h-4 w-4" />
                  Verification Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {task.verificationRequests.map((request) => (
                  <div key={request.id} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">{request.skill}</span>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>
                    <div className="text-xs text-purple-600 dark:text-purple-300">
                      Reviewers: {request.reviewers.join(", ")}
                    </div>
                  </div>
                ))}
                <Button onClick={handleRequestVerification} className="w-full" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Request New Verification
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/projects/${params.id}/build`}>
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <Code className="h-4 w-4 mr-2" />
                    Start Coding
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Create Branch
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
