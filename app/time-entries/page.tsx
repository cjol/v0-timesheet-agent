"use client"
import TimeEntriesTable from "@/components/time-entries-table"
import { mockTimesheetData, mockMatterContext } from "@/lib/mock-data"

export default function TimeEntriesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Time Entries</h1>
          <p className="text-muted-foreground">
            View all time entries for {mockMatterContext.name}. Click on column headers to sort and filter.
          </p>
        </div>

        <TimeEntriesTable data={mockTimesheetData} />

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Tip: Click on review status badges to jump to the relevant section in the Entries for Review page.</p>
        </div>
      </div>
    </main>
  )
}
