"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Shield,
  Download,
  Share,
  ExternalLink,
  CheckCircle,
  Fingerprint,
  Calendar,
  Star,
  Copy,
  QrCode,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function CertificatePage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)

  const certificate = {
    id: params.id,
    title: "React Expert Certification",
    recipient: {
      name: "Alex Chen",
      username: "alexchen",
      avatar: "AC",
    },
    project: {
      name: "E-commerce Platform",
      id: "ecommerce-platform",
    },
    skills: [
      { name: "React", level: "Expert", verifications: 15 },
      { name: "TypeScript", level: "Advanced", verifications: 12 },
      { name: "State Management", level: "Expert", verifications: 8 },
      { name: "Performance Optimization", level: "Advanced", verifications: 6 },
    ],
    blockchain: {
      hash: "0x1a2b3c4d5e6f7890abcdef1234567890fedcba09876543210",
      network: "Ethereum",
      blockNumber: 18945672,
      timestamp: "2024-01-15T14:30:00Z",
      gasUsed: "0.0023 ETH",
    },
    verifiers: [
      { name: "Sarah Chen", avatar: "SC", role: "Senior Developer", trustScore: 4.9 },
      { name: "Mike Johnson", avatar: "MJ", role: "Tech Lead", trustScore: 4.8 },
      { name: "Emma Wilson", avatar: "EW", role: "Engineering Manager", trustScore: 4.7 },
    ],
    metrics: {
      totalContributions: 156,
      verifiedContributions: 142,
      codeQuality: 94,
      teamRating: 4.8,
      projectSuccess: 98,
    },
    issuedDate: "2024-01-15",
    expiryDate: "2025-01-15",
    certificateUrl: `https://nexr.dev/certificates/${params.id}`,
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(certificate.certificateUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPDF = () => {
    // In real app, would generate and download PDF
    alert("Certificate PDF downloaded!")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${certificate.title} - ${certificate.recipient.name}`,
        text: `Check out this verified skill certificate from Nexr`,
        url: certificate.certificateUrl,
      })
    } else {
      handleCopyUrl()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/verification">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Verification
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Skill Certificate</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Blockchain-verified professional certification
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Certificate Card */}
        <Card className="border-0 shadow-2xl dark:bg-gray-800 mb-8 overflow-hidden">
          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{certificate.title}</h2>
                  <p className="text-purple-100">Issued by Nexr Platform</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-100">Certificate ID</div>
                <div className="font-mono text-sm">{certificate.id}</div>
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Recipient Info */}
            <div className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="bg-purple-600 text-white text-2xl">
                  {certificate.recipient.avatar}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{certificate.recipient.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">@{certificate.recipient.username}</p>
            </div>

            {/* Certificate Statement */}
            <div className="text-center py-6 border-y border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                This certifies that <strong>{certificate.recipient.name}</strong> has successfully demonstrated
                expert-level proficiency in the skills listed below through verified contributions to the{" "}
                <strong>{certificate.project.name}</strong> project.
              </p>
            </div>

            {/* Verified Skills */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verified Skills</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {certificate.skills.map((skill, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      <Badge
                        className={
                          skill.level === "Expert"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{skill.verifications} peer verifications</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{certificate.metrics.totalContributions}</div>
                  <div className="text-xs text-gray-500">Total Contributions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{certificate.metrics.verifiedContributions}</div>
                  <div className="text-xs text-gray-500">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{certificate.metrics.codeQuality}%</div>
                  <div className="text-xs text-gray-500">Code Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{certificate.metrics.teamRating}</div>
                  <div className="text-xs text-gray-500">Team Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{certificate.metrics.projectSuccess}%</div>
                  <div className="text-xs text-gray-500">Project Success</div>
                </div>
              </div>
            </div>

            {/* Verifiers */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Verified by Team Members</h4>
              <div className="flex flex-wrap gap-4">
                {certificate.verifiers.map((verifier, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-purple-600 text-white">{verifier.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{verifier.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{verifier.role}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-gray-500">{verifier.trustScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Dates */}
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Issued: {certificate.issuedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Valid until: {certificate.expiryDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Verification */}
        <Card className="border-0 shadow-lg dark:bg-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Fingerprint className="h-5 w-5" />
              Blockchain Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-purple-600 dark:text-purple-300 mb-1">Transaction Hash</div>
                  <div className="font-mono text-xs text-purple-800 dark:text-purple-200 break-all">
                    {certificate.blockchain.hash}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-purple-600 dark:text-purple-300 mb-1">Network</div>
                  <div className="text-purple-800 dark:text-purple-200">{certificate.blockchain.network}</div>
                </div>
                <div>
                  <div className="text-sm text-purple-600 dark:text-purple-300 mb-1">Block Number</div>
                  <div className="text-purple-800 dark:text-purple-200">{certificate.blockchain.blockNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-purple-600 dark:text-purple-300 mb-1">Gas Used</div>
                  <div className="text-purple-800 dark:text-purple-200">{certificate.blockchain.gasUsed}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Etherscan
                </Button>
                <Button size="sm" variant="outline" onClick={handleCopyUrl}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? "Copied!" : "Copy Certificate URL"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Instructions */}
        <Card className="border-0 shadow-lg dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">How to Verify This Certificate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Scan QR Code</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use any QR scanner to verify the certificate authenticity
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Fingerprint className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Check Blockchain</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Verify the transaction hash on the Ethereum blockchain
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Visit Nexr</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Check the certificate status on the official Nexr platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
