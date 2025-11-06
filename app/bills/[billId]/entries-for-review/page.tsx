"use client"
import { useParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import IssueSection from "@/components/issue-section"
import TableOfContents from "@/components/table-of-contents"
import { mockTimesheetData, mockBills, issueSectionConfigs } from "@/lib/mock-data"

export default function EntriesForReviewPage() {
  const params = useParams()
  const billId = params.billId as string

  // Find the bill to display its period in the breadcrumb
  const bill = mockBills.find((b) => b.id === billId)

  // Filter entries by billId
  const billEntries = mockTimesheetData.filter((entry) => entry.billId === billId)

  // Dynamically load sections based on the matter's automation rules
  const sections = issueSectionConfigs.map(config => ({
    id: config.id,
    title: config.title,
    count: billEntries.filter((entry) => entry.issue === config.id).length,
  }))

  const totalEntries = billEntries.length
  const entriesWithSuggestions = billEntries.filter((entry) => entry.suggestedTask).length

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Main content - document-like layout */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="mb-12" id="page-intro">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <a href="/bills" className="hover:text-foreground transition-colors">
                  Bills
                </a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <a href={`/bills/${billId}`} className="hover:text-foreground transition-colors">
                  {bill?.period || billId}
                </a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-foreground font-medium">Entries for Review</li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">Entries for Review</h1>

          {/* Summary */}
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            <span className="font-semibold text-foreground">{totalEntries} entries</span> from this bill have been flagged for your
            review. <span className="font-semibold text-foreground">{entriesWithSuggestions}</span> have suggestions for you to approve.
          </p>

          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mt-2">
            You can{" "}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-normal border border-border bg-background">
              <CheckCircle className="h-3.5 w-3.5" />
              Approve
            </span>{" "}
            any item to remove the flag, or{" "}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-normal border border-border bg-background">
              <XCircle className="h-3.5 w-3.5" />
              Exclude
            </span>{" "}
            the item from the current bill.
          </p>
        </div>

        {/* Table of Contents */}
        <TableOfContents items={sections} />

        {/* Dynamically render issue sections from configuration */}
        {issueSectionConfigs.map(config => (
          <IssueSection
            key={config.id}
            title={config.title}
            description={config.description}
            issueType={config.id}
            data={billEntries.filter((entry) => entry.issue === config.id)}
          />
        ))}
      </div>
    </main>
  )
}
