"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckCircle, Shield, Clock, AlertCircle, Eye, Users, FileCheck } from "lucide-react"

interface VerificationBadgeProps {
  type: "skill" | "contribution" | "project" | "peer"
  status: "verified" | "pending" | "unverified" | "disputed"
  level?: "basic" | "intermediate" | "expert"
  verifierCount?: number
  lastVerified?: Date
  details?: {
    verifiers: string[]
    proofHash?: string
    blockchainTx?: string
  }
}

export function VerificationBadge({
  type,
  status,
  level,
  verifierCount = 0,
  lastVerified,
  details,
}: VerificationBadgeProps) {
  const getBadgeConfig = () => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
          text: "Verified",
        }
      case "pending":
        return {
          icon: Clock,
          color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
          text: "Pending",
        }
      case "disputed":
        return {
          icon: AlertCircle,
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
          text: "Disputed",
        }
      default:
        return {
          icon: Shield,
          color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
          text: "Unverified",
        }
    }
  }

  const config = getBadgeConfig()
  const IconComponent = config.icon

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge className={`${config.color} cursor-pointer hover:opacity-80 transition-opacity`}>
          <IconComponent className="h-3 w-3 mr-1" />
          {config.text}
          {level && ` (${level})`}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <Card className="border-0 shadow-none">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white capitalize">{type} Verification</h4>
              <Badge className={config.color}>
                <IconComponent className="h-3 w-3 mr-1" />
                {config.text}
              </Badge>
            </div>

            {status === "verified" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Verified by:</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{verifierCount} peers</span>
                  </div>
                </div>

                {lastVerified && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last verified:</span>
                    <span className="font-medium">{lastVerified.toLocaleDateString()}</span>
                  </div>
                )}

                {details?.proofHash && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Proof hash:</span>
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {details.proofHash.slice(0, 8)}...
                    </code>
                  </div>
                )}
              </div>
            )}

            {status === "pending" && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Waiting for peer verification. {verifierCount} of 3 confirmations received.
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-1" />
                View Proof
              </Button>
              {status === "verified" && (
                <Button size="sm" variant="outline" className="flex-1">
                  <FileCheck className="h-4 w-4 mr-1" />
                  Blockchain
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
