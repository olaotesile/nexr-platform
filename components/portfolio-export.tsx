"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, Linkedin, Share, Eye, ExternalLink, Copy, CheckCircle } from "lucide-react"

interface PortfolioExportProps {
  userId: string
  userProfile: any
}

export function PortfolioExport({ userId, userProfile }: PortfolioExportProps) {
  const [exportFormat, setExportFormat] = useState<"pdf" | "linkedin" | "link">("pdf")
  const [isExporting, setIsExporting] = useState(false)
  const [copied, setCopied] = useState(false)

  const portfolioUrl = `https://nexr.dev/portfolio/${userId}`

  const handleExport = async (format: "pdf" | "linkedin" | "link") => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      if (format === "pdf") {
        // Trigger PDF download
        console.log("Generating PDF resume...")
      } else if (format === "linkedin") {
        // Open LinkedIn import
        window.open("https://linkedin.com/profile/import", "_blank")
      } else if (format === "link") {
        // Copy portfolio link
        navigator.clipboard.writeText(portfolioUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
      setIsExporting(false)
    }, 2000)
  }

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-white">
          <Share className="h-5 w-5" />
          Export Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {/* PDF Resume Export */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">PDF Resume</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Professional resume with your projects and skills
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleExport("pdf")}
                disabled={isExporting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isExporting ? (
                  "Generating..."
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* LinkedIn Sync */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">LinkedIn Sync</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Import your projects to LinkedIn profile</p>
                </div>
              </div>
              <Button onClick={() => handleExport("linkedin")} disabled={isExporting} variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Sync
              </Button>
            </div>
          </div>

          {/* Portfolio Link */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Portfolio Link</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Share your live portfolio with anyone</p>
                </div>
              </div>
              <Button onClick={() => handleExport("link")} disabled={isExporting} variant="outline">
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Portfolio Preview</h5>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>• {userProfile?.projects || 12} projects showcased</p>
            <p>• {userProfile?.skills?.length || 8} skills highlighted</p>
            <p>• {userProfile?.contributions || 247} total contributions</p>
            <p>• Real project outcomes and team testimonials</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
