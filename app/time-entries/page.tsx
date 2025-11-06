"use client"
import EntriesTable from "@/components/entries-table"
import { useTimesheetData } from "@/lib/hooks"
import { useMatter } from "@/contexts/matter-context"

export default function TimeEntriesPage() {
  const { currentMatterName, currentMatterId } = useMatter()
  const { data: mockTimesheetData = [] } = useTimesheetData(currentMatterId)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Time Entries</h1>
          <p className="text-muted-foreground">
            View all time entries for {currentMatterName}. Click on column headers to sort and filter.
          </p>
        </div>

        <EntriesTable
          data={mockTimesheetData}
          showBillColumn={true}
          showReviewStatusColumn={true}
          showActionsColumn={false}
        />

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Tip: Click on review status badges to jump to the relevant section in the Entries for Review page.</p>
        </div>
      </div>
    </main>
  )
}
