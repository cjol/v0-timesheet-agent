"use client"
import { Plus } from "lucide-react"
import Link from "next/link"
import StatTile from "@/components/stat-tile"
import EntriesTable from "@/components/entries-table"
import { useTimesheetData, useBills } from "@/lib/hooks"
import { useMatter } from "@/contexts/matter-context"

export default function HomePage() {
  const { currentMatterName, currentMatterId } = useMatter()
  const { data: mockTimesheetData = [] } = useTimesheetData(currentMatterId)
  const { data: mockBills = [] } = useBills(currentMatterId)
  // Calculate statistics for current matter
  const unbilledHours =
    mockTimesheetData.filter((e) => ["insufficient-detail", "poor-writing", "missing-info"].includes(e.issue)).length *
    1.5

  const chargeableHours =
    mockTimesheetData.filter((e) => e.issue === "unusual-duration").length *
    1.5 // Chargeable but flagged for review
  const nonChargeableHours =
    mockTimesheetData.filter((e) => e.issue === "missing-info").length *
    1.5 // Non-chargeable hours

  const draftBills = mockBills.filter((b) => b.status === "Draft")
  const pastBills = mockBills.filter((b) => b.status === "Submitted")

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">{currentMatterName}</h1>
            <p className="text-muted-foreground">Matter overview and billing management</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Upload Time Entries
          </button>
        </div>

        {/* Bills Section */}
        <div className="space-y-6 mb-6">
          {/* Draft Bills */}
          {draftBills.length > 0 && (
            <div className="border border-border rounded-lg p-6 bg-card/50">
              <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Draft Bills</h2>
              <div className="space-y-3 mb-6">
                {draftBills.map((bill) => (
                  <Link
                    key={bill.id}
                    href={`/bills/${bill.id}`}
                    className="flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{bill.period}</h3>
                      <p className="text-sm text-muted-foreground">
                        {bill.entries} entries {bill.issues > 0 && `• ${bill.issues} issues`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{bill.amount.toLocaleString()}</p>
                    </div>
                    <div className="ml-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {bill.status}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Statistics for Draft Bills */}
              <div className="grid grid-cols-3 gap-4">
                <StatTile
                  label="Unbilled Hours"
                  value={unbilledHours.toFixed(1)}
                  detail="Hours pending review"
                  href="/entries-for-review"
                />
                <StatTile
                  label="Chargeable Time"
                  value={chargeableHours.toFixed(1)}
                  detail="Unbilled chargeable hours"
                />
                <StatTile
                  label="Non-Chargeable Time"
                  value={nonChargeableHours.toFixed(1)}
                  detail="Non-billable hours"
                />
              </div>
            </div>
          )}

          {/* Submitted Bills */}
          {pastBills.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Submitted Bills</h2>
              <div className="space-y-3">
                {pastBills.map((bill) => (
                  <Link
                    key={bill.id}
                    href={`/bills/${bill.id}`}
                    className="flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{bill.period}</h3>
                      <p className="text-sm text-muted-foreground">{bill.entries} entries</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">£{bill.amount.toLocaleString()}</p>
                    </div>
                    <div className="ml-4 px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                      {bill.status}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-right">
                <Link href="/bills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Time Entries Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Time Entries</h2>
          <EntriesTable
            data={mockTimesheetData}
            showBillColumn={true}
            showReviewStatusColumn={true}
            showActionsColumn={false}
          />
        </div>
      </div>
    </main>
  )
}
