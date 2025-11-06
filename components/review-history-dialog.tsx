"use client"

import { Clock, CheckCircle, AlertCircle, MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReviewHistoryEvent } from "@/lib/mock-data"

interface ReviewHistoryDialogProps {
  isOpen: boolean
  onClose: () => void
  documentTitle: string
  history: ReviewHistoryEvent[]
}

export default function ReviewHistoryDialog({
  isOpen,
  onClose,
  documentTitle,
  history,
}: ReviewHistoryDialogProps) {
  const getEventIcon = (type: ReviewHistoryEvent["type"]) => {
    switch (type) {
      case "requested":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "changes-required":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "comment":
        return <MessageCircle className="w-5 h-5 text-amber-600" />
    }
  }

  const getEventLabel = (type: ReviewHistoryEvent["type"]) => {
    switch (type) {
      case "requested":
        return "Review Requested"
      case "approved":
        return "Approved"
      case "changes-required":
        return "Changes Requested"
      case "comment":
        return "Comment Added"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review History: {documentTitle}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {history.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No review history available
            </p>
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-border" />

              {/* Timeline events */}
              <div className="space-y-6">
                {history.map((event) => (
                  <div key={event.id} className="relative flex gap-4">
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-background flex items-center justify-center">
                      {getEventIcon(event.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-sm">
                            {getEventLabel(event.type)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.actor} <span className="text-muted-foreground/70">({event.role})</span>
                          </p>
                        </div>
                        <time className="text-xs text-muted-foreground">
                          {formatTimestamp(event.timestamp)}
                        </time>
                      </div>

                      {event.comment && (
                        <div className="mt-2 p-3 bg-muted rounded-lg text-sm">
                          {event.comment}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
