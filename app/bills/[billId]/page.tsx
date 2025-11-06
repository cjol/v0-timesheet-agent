"use client"
import { useState, useMemo } from "react"
import { Download, Lock, Clock, CheckCircle, AlertCircle, Eye } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import RequestReviewModal from "@/components/request-review-modal"
import ReviewHistoryDialog from "@/components/review-history-dialog"
import HtmlPreviewModal from "@/components/html-preview-modal"
import EntriesTable from "@/components/entries-table"
import { useTimesheetData, useBills, useBillDocuments } from "@/lib/hooks"
import { getDocumentReviewers, type DocumentReviewer } from "@/lib/mock-data"

export default function BillDetailPage() {
  const params = useParams()
  const billId = params.billId as string
  const { data: mockTimesheetData = [] } = useTimesheetData()
  const { data: mockBills = [] } = useBills()
  const { data: mockBillDocuments = [] } = useBillDocuments()

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null)
  const [previewDocumentId, setPreviewDocumentId] = useState<string | null>(null)

  // Find the bill data for this specific billId
  const bill = useMemo(() => {
    return mockBills.find(b => b.id === billId) || mockBills[0]
  }, [billId])

  // Filter documents for this bill
  const documents = useMemo(() => {
    return mockBillDocuments.filter(doc => doc.billId === billId)
  }, [billId])

  const participants = [
    { id: "p-1", name: "John Smith", role: "Client Contact" },
    { id: "p-2", name: "Linda Garcia", role: "Project Manager" },
    { id: "p-3", name: "David Chen", role: "Technical Lead" },
  ]

  // Filter time entries for this bill
  const billEntries = useMemo(() => {
    return mockTimesheetData.filter(entry => entry.billId === billId)
  }, [billId])

  const getReviewersByStatus = (reviewers?: DocumentReviewer[]) => {
    if (!reviewers || reviewers.length === 0) {
      return { pending: [], approved: [], changesRequired: [] }
    }

    return {
      pending: reviewers.filter(r => r.status === "pending"),
      approved: reviewers.filter(r => r.status === "approved"),
      changesRequired: reviewers.filter(r => r.status === "changes-required"),
    }
  }

  const renderReviewersSection = (reviewers?: DocumentReviewer[]) => {
    if (!reviewers || reviewers.length === 0) {
      return <p className="text-xs text-muted-foreground">No Reviews Requested</p>
    }

    const grouped = getReviewersByStatus(reviewers)
    const sections = []

    const formatReviewerName = (reviewer: DocumentReviewer) => (
      <>
        {reviewer.name} <span className="text-muted-foreground">({reviewer.role})</span>
      </>
    )

    if (grouped.pending.length > 0) {
      sections.push(
        <span key="pending" className="inline-flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-amber-600" />
          <span className="text-amber-600">Awaiting Review by:</span>
          <span className="text-foreground">
            {grouped.pending.map((r, i) => (
              <span key={i}>
                {formatReviewerName(r)}
                {i < grouped.pending.length - 1 && ", "}
              </span>
            ))}
          </span>
        </span>
      )
    }

    if (grouped.approved.length > 0) {
      sections.push(
        <span key="approved" className="inline-flex items-center gap-1.5">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span className="text-green-600">Approved by:</span>
          <span className="text-foreground">
            {grouped.approved.map((r, i) => (
              <span key={i}>
                {formatReviewerName(r)}
                {i < grouped.approved.length - 1 && ", "}
              </span>
            ))}
          </span>
        </span>
      )
    }

    if (grouped.changesRequired.length > 0) {
      sections.push(
        <span key="changes" className="inline-flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 text-red-600" />
          <span className="text-red-600">Changes requested by:</span>
          <span className="text-foreground">
            {grouped.changesRequired.map((r, i) => (
              <span key={i}>
                {formatReviewerName(r)}
                {i < grouped.changesRequired.length - 1 && ", "}
              </span>
            ))}
          </span>
        </span>
      )
    }

    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        {sections.map((section, index) => (
          <span key={section.key}>
            {section}
            {index < sections.length - 1 && <span className="text-muted-foreground ml-3">•</span>}
          </span>
        ))}
      </div>
    )
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
              <h1 className="text-3xl font-bold mb-2">{bill.period}</h1>
              <p className="text-muted-foreground">{bill.matter}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">£{bill.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{billEntries.length} entries</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-8 justify-end">
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Send Documents
          </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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
                onClick={() => setSelectedDocumentId(doc.id)}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <span className="text-xs px-2 py-1 bg-muted rounded text-muted-foreground">{doc.type}</span>
                  </div>
                  {renderReviewersSection(getDocumentReviewers(doc))}
                </div>

                <div className="flex items-center gap-4">
                  {doc.type === "HTML" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewDocumentId(doc.id)
                      }}
                      className="p-2 hover:bg-muted rounded transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    </button>
                  ) : (
                    <a 
                      href={doc.downloadUrl} 
                      className="p-2 hover:bg-muted rounded transition-colors" 
                      title="Download"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-5 h-5 text-muted-foreground" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Entries Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Time Entries</h2>
          <EntriesTable
            data={billEntries}
            showBillColumn={false}
            showReviewStatusColumn={true}
            showActionsColumn={false}
          />
        </div>
      </div>

      <RequestReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        documents={documents.map((d) => ({ id: d.id, title: d.title, type: d.type }))}
        participants={participants}
      />

      <ReviewHistoryDialog
        isOpen={selectedDocumentId !== null}
        onClose={() => setSelectedDocumentId(null)}
        documentTitle={documents.find(d => d.id === selectedDocumentId)?.title || ""}
        history={documents.find(d => d.id === selectedDocumentId)?.reviewHistory || []}
      />

      <HtmlPreviewModal
        isOpen={previewDocumentId !== null}
        onClose={() => setPreviewDocumentId(null)}
        title={documents.find(d => d.id === previewDocumentId)?.title || ""}
        htmlContent={documents.find(d => d.id === previewDocumentId)?.htmlContent || ""}
      />
    </main>
  )
}
