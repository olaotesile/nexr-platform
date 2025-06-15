"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContributionTimeline } from "@/components/verification/contribution-timeline"
import { SkillEndorsementSystem } from "@/components/verification/skill-endorsement-system"
import { TeamValidationInterface } from "@/components/verification/team-validation-interface"
import { WorkSampleAuth } from "@/components/verification/work-sample-auth"
import { RealTimeVerificationStatus } from "@/components/verification/real-time-status"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Award, Users, FileCheck, Download, ExternalLink, Fingerprint } from "lucide-react"

export default function VerificationCenter() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock work samples for demonstration
  const workSamples = [
    {
      id: "1",
      title: "E-commerce Payment Gateway",
      description: "Complete Stripe integration with webhook handling and error recovery",
      type: "code" as const,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      author: { name: "John Doe", id: "user1" },
      verification: {
        status: "verified" as const,
        proofHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
        blockchainTx: "0xabcdef1234567890fedcba0987654321",
        verifiers: ["Sarah Chen", "Mike Johnson", "Alex Rivera"],
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      authenticity: {
        digitalSignature: "0x9876543210fedcba0123456789abcdef",
        checksums: {
          md5: "d41d8cd98f00b204e9800998ecf8427e",
          sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        },
        metadata: {
          originalFilename: "payment-gateway.zip",
          fileSize: 2048576,
          lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          creationTool: "VS Code",
        },
      },
      evidence: [
        {
          type: "commit" as const,
          url: "https://github.com/user/repo/commit/abc123",
          description: "Initial payment gateway implementation",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          type: "file" as const,
          url: "/files/test-results.pdf",
          description: "Comprehensive test suite results",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      ],
    },
    {
      id: "2",
      title: "Mobile App UI Design System",
      description: "Complete design system with components, tokens, and documentation",
      type: "design" as const,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      author: { name: "John Doe", id: "user1" },
      verification: {
        status: "pending" as const,
        verifiers: ["Emma Wilson"],
        timestamp: undefined,
      },
      authenticity: {
        digitalSignature: "0x1234567890abcdef9876543210fedcba",
        checksums: {
          md5: "098f6bcd4621d373cade4e832627b4f6",
          sha256: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
        },
        metadata: {
          originalFilename: "design-system.fig",
          fileSize: 15728640,
          lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          creationTool: "Figma",
        },
      },
      evidence: [
        {
          type: "file" as const,
          url: "/designs/ui-system.fig",
          description: "Figma design system file",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Verification Center</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Manage your verified contributions, skills, and peer validations
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verified Works</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Endorsed Skills</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Peer Validations</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.9</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trust Score</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="validation">Team Validation</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ContributionTimeline userId="user1" />
              </div>
              <div className="space-y-6">
                <RealTimeVerificationStatus userId="user1" />

                {/* Blockchain Proof Card */}
                <Card className="border-0 shadow-lg dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Fingerprint className="h-5 w-5" />
                      Blockchain Proofs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Latest Proof</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Verified
                        </Badge>
                      </div>
                      <code className="text-xs text-green-600 dark:text-green-400 block mb-2">
                        0x1a2b3c4d5e6f7890...
                      </code>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Chain
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        All your verified work is cryptographically secured
                      </p>
                      <Button size="sm" variant="outline">
                        View All Proofs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contributions" className="space-y-6">
            <div className="grid gap-6">
              <ContributionTimeline userId="user1" />

              {/* Work Samples with Authentication */}
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <FileCheck className="h-5 w-5" />
                    Authenticated Work Samples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workSamples.map((sample) => (
                    <WorkSampleAuth key={sample.id} workSample={sample} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillEndorsementSystem userId="user1" isOwnProfile={true} />
          </TabsContent>

          <TabsContent value="validation" className="space-y-6">
            <TeamValidationInterface projectId="project1" currentUserId="user1" />
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="border-0 shadow-lg dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Award className="h-5 w-5" />
                  Verification Certificates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Certificate Examples */}
                <div className="grid gap-4">
                  <Card className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-800 dark:text-green-200">
                            React Expert Certification
                          </h4>
                          <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                            Verified through 24 peer endorsements and 12 project contributions
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-green-600 dark:text-green-400">
                            <span>Issued: Dec 15, 2024</span>
                            <span>Blockchain ID: 0xabc123...</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                            Full-Stack Development Certificate
                          </h4>
                          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                            Comprehensive verification across frontend, backend, and database skills
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-blue-600 dark:text-blue-400">
                            <span>Issued: Nov 28, 2024</span>
                            <span>Blockchain ID: 0xdef456...</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Cross-Platform Verification */}
                <Card className="border-2 border-dashed border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Cross-Platform Verification
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Your verified skills can be validated on any platform that supports our verification API
                    </p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        LinkedIn Integration
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        GitHub Verification
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
