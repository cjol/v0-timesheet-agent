import Link from "next/link"
import { mockBills } from "@/lib/mock-data"

export default function BillsPage() {
  const draftBills = mockBills.filter((b) => b.status === "Draft")
  const pastBills = mockBills.filter((b) => b.status === "Past")

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bills</h1>
          <p className="text-muted-foreground">Manage and review all bills for this matter</p>
        </div>

        {/* Draft Bills */}
        {draftBills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Draft Bills</h2>
            <div className="space-y-3">
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
                    <p className="font-semibold">${bill.amount.toLocaleString()}</p>
                  </div>
                  <div className="ml-4 px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                    {bill.status}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Past Bills */}
        {pastBills.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Past Bills</h2>
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
                    <p className="font-semibold">${bill.amount.toLocaleString()}</p>
                  </div>
                  <div className="ml-4 px-3 py-1 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                    {bill.status}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
