"use client"
import IssueSection from "@/components/issue-section"
import { mockTimesheetData } from "@/lib/mock-data"

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Refined header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <h1 className="text-4xl font-serif font-light tracking-tight mb-2">FixMyTime</h1>
          <p className="text-muted-foreground text-sm">Review and resolve issues in your timesheet entries</p>
        </div>
      </header>

      {/* Main content - document-like layout */}
      <div className="max-w-6xl mx-auto px-8 py-12">
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
