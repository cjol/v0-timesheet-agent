"use client"
import { CheckCircle, XCircle } from "lucide-react"
import IssueSection from "@/components/issue-section"
import TableOfContents from "@/components/table-of-contents"
import { mockTimesheetData } from "@/lib/mock-data"

export default function EntriesForReviewPage() {
  const sections = [
    {
      id: "insufficient-detail",
      title: "Insufficient Detail",
      count: mockTimesheetData.filter((entry) => entry.issue === "insufficient-detail").length,
    },
    {
      id: "poor-writing",
      title: "Poor Writing Style",
      count: mockTimesheetData.filter((entry) => entry.issue === "poor-writing").length,
    },
    {
      id: "unusual-duration",
      title: "Unusual Duration",
      count: mockTimesheetData.filter((entry) => entry.issue === "unusual-duration").length,
    },
    {
      id: "missing-info",
      title: "Missing Information",
      count: mockTimesheetData.filter((entry) => entry.issue === "missing-info").length,
    },
  ]

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
                  Draft Bills
                </a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <a href="/bills/bill-001" className="hover:text-foreground transition-colors">
                  October 2025
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
            <span className="font-semibold text-foreground">40 entries</span> from this bill have been flagged for your
            review. <span className="font-semibold text-foreground">15</span> have suggestions for you to approve.
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

        {/* Insufficient Detail Section */}
        <IssueSection
          title="Insufficient Detail"
          description="Entries lacking enough information to accurately bill or understand the work performed. Add more context to these entries."
          issueType="insufficient-detail"
          data={mockTimesheetData.filter((entry) => entry.issue === "insufficient-detail")}
        />

        {/* Poor Writing Style Section */}
        <IssueSection
          title="Poor Writing Style"
          description="Entries with unclear or poorly formatted descriptions that need improvement for client-facing invoices."
          issueType="poor-writing"
          data={mockTimesheetData.filter((entry) => entry.issue === "poor-writing")}
        />

        {/* Unusual Duration Section */}
        <IssueSection
          title="Unusual Duration"
          description="Entries with time durations that are unusually short or long compared to similar tasks."
          issueType="unusual-duration"
          data={mockTimesheetData.filter((entry) => entry.issue === "unusual-duration")}
        />

        {/* Missing Information Section */}
        <IssueSection
          title="Missing Information"
          description="Entries missing critical fields such as project code, client reference, or task category."
          issueType="missing-info"
          data={mockTimesheetData.filter((entry) => entry.issue === "missing-info")}
        />
      </div>
    </main>
  )
}
