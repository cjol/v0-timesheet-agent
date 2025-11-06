"use client"
import { useState } from "react"
import { Download, MessageCircle, Lock } from "lucide-react"
import Link from "next/link"
import ReviewStatusBadge from "@/components/review-status-badge"
import RequestReviewModal from "@/components/request-review-modal"
import TimeEntriesTable from "@/components/time-entries-table"
import { mockBillDetail, mockTimesheetData } from "@/lib/mock-data"

export default function BillDetailPage() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState<string | null>(null)

  const documents = mockBillDetail.documents
  const participants = [
    { id: "p-1", name: "John Smith" },
    { id: "p-2", name: "Linda Garcia" },
    { id: "p-3", name: "David Chen" },
  ]

  const getReviewersList = (doc: (typeof documents)[0]) => {
    if (!doc.reviewers) return "No one"
    return doc.reviewers.join(", ")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/bills" className="text-sm text-primary hover:underline mb-4 block">
            ← Back to Bills
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockBillDetail.period}</h1>
              <p className="text-muted-foreground">{mockBillDetail.matter}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${mockBillDetail.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{mockBillDetail.entries} entries</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Request Review
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <Lock className="w-4 h-4" />
            Finalise Bill
          </button>
        </div>

        {/* Documents Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Documents</h2>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">{doc.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Sent to: {getReviewersList(doc)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <ReviewStatusBadge status={doc.reviewStatus} />

                  {doc.feedback && (
                    <button
                      onClick={() => setFeedbackOpen(feedbackOpen === doc.id ? null : doc.id)}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title="View feedback"
                    >
                      <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    </button>
                  )}

                  <a href={doc.downloadUrl} className="p-2 hover:bg-muted rounded transition-colors" title="Download">
                    <Download className="w-5 h-5 text-muted-foreground" />
                  </a>
                </div>

                {feedbackOpen === doc.id && doc.feedback && (
                  <div className="absolute right-8 top-full mt-2 bg-red-50 border border-red-200 rounded-lg p-4 w-80 shadow-lg z-10">
                    <p className="text-sm font-medium text-red-900 mb-2">Feedback from {doc.reviewers?.[0]}</p>
                    <p className="text-sm text-red-800">{doc.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time Entries Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Time Entries</h2>
          <TimeEntriesTable data={mockTimesheetData.slice(0, 10)} />
        </div>
      </div>

      <RequestReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        documents={documents.map((d) => ({ id: d.id, title: d.title }))}
        participants={participants}
      />
    </main>
  )
}
