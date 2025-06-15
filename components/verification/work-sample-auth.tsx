"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { VerificationBadge } from "./verification-badge"
import { ExternalLink, Shield, Hash, Calendar, User, Eye, Download, Fingerprint } from "lucide-react"

interface WorkSampleAuthProps {
  workSample: {
    id: string
    title: string
    description: string
    type: "code" | "design" | "document" | "video" | "audio"
    createdAt: Date
    author: {
      name: string
      id: string
    }
    verification: {
      status: "verified" | "pending" | "unverified"
      proofHash?: string
      blockchainTx?: string
      verifiers: string[]
      timestamp?: Date
    }
    authenticity: {
      digitalSignature: string
      checksums: {
        md5: string
        sha256: string
      }
      metadata: {
        originalFilename: string
        fileSize: number
        lastModified: Date
        creationTool?: string
      }
    }
    evidence: {
      type: "commit" | "file" | "screenshot" | "video"
      url: string
      description: string
      timestamp: Date
    }[]
  }
}

export function WorkSampleAuth({ workSample }: WorkSampleAuthProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "verification" | "authenticity">("overview")

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <>
      <Card className="border-0 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group cursor-pointer">
        <CardContent className="p-4" onClick={() => setIsAuthModalOpen(true)}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {workSample.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{workSample.description}</p>
            </div>
            <VerificationBadge
              type="project"
              status={workSample.verification.status}
              verifierCount={workSample.verification.verifiers.length}
              lastVerified={workSample.verification.timestamp}
              details={{
                verifiers: workSample.verification.verifiers,
                proofHash: workSample.verification.proofHash,
                blockchainTx: workSample.verification.blockchainTx,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{workSample.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{workSample.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-green-600 text-xs">Authenticated</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Details Modal */}
      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Work Sample Authentication
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Header Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{workSample.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{workSample.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>by {workSample.author.name}</span>
                      <span>{workSample.createdAt.toLocaleDateString()}</span>
                      <Badge variant="outline" className="capitalize">
                        {workSample.type}
                      </Badge>
                    </div>
                  </div>
                  <VerificationBadge
                    type="project"
                    status={workSample.verification.status}
                    verifierCount={workSample.verification.verifiers.length}
                    lastVerified={workSample.verification.timestamp}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("overview")}
              >
                <Eye className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "verification" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("verification")}
              >
                <Shield className="h-4 w-4 mr-2" />
                Verification
              </Button>
              <Button
                variant={activeTab === "authenticity" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("authenticity")}
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                Authenticity
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Evidence & Documentation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {workSample.evidence.map((evidence, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{evidence.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {evidence.type}
                            </Badge>
                            <span>{evidence.timestamp.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "verification" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Blockchain Verification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {workSample.verification.status === "verified" ? (
                      <>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-700 dark:text-green-300">
                              Verified on Blockchain
                            </span>
                          </div>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            This work sample has been cryptographically verified and recorded on the blockchain.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Proof Hash</label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-1">
                                {workSample.verification.proofHash}
                              </code>
                              <Button size="sm" variant="outline">
                                <Hash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Transaction ID
                            </label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-1">
                                {workSample.verification.blockchainTx}
                              </code>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Verified By ({workSample.verification.verifiers.length} peers)
                          </label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {workSample.verification.verifiers.map((verifier, idx) => (
                              <Badge key={idx} variant="secondary">
                                {verifier}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-yellow-700 dark:text-yellow-300">
                          This work sample is pending verification or has not been verified yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "authenticity" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Digital Authenticity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Digital Signature</label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded flex-1">
                          {workSample.authenticity.digitalSignature}
                        </code>
                        <Button size="sm" variant="outline">
                          <Fingerprint className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">MD5 Checksum</label>
                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block mt-1">
                          {workSample.authenticity.checksums.md5}
                        </code>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">SHA256 Checksum</label>
                        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block mt-1">
                          {workSample.authenticity.checksums.sha256}
                        </code>
                      </div>
                    </div>

                    <Card className="bg-gray-50 dark:bg-gray-800">
                      <CardHeader>
                        <CardTitle className="text-base">File Metadata</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Original Filename:</span>
                            <p className="font-medium">{workSample.authenticity.metadata.originalFilename}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">File Size:</span>
                            <p className="font-medium">{formatFileSize(workSample.authenticity.metadata.fileSize)}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Last Modified:</span>
                            <p className="font-medium">
                              {workSample.authenticity.metadata.lastModified.toLocaleString()}
                            </p>
                          </div>
                          {workSample.authenticity.metadata.creationTool && (
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Creation Tool:</span>
                              <p className="font-medium">{workSample.authenticity.metadata.creationTool}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Blockchain
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <Shield className="h-4 w-4 mr-2" />
                Verify Authenticity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
