"use client"
import { useState, useEffect, useRef } from "react"
import { ArrowRight, Plus } from "lucide-react"
import Link from "next/link"
import IssueSection from "@/components/issue-section"
import TableOfContents from "@/components/table-of-contents"
import StatTile from "@/components/stat-tile"
import { mockTimesheetData } from "@/lib/mock-data"
import { mockBills } from "@/lib/mock-data"

export default function HomePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedMatter, setSelectedMatter] = useState("Project Blackstone")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  // Calculate statistics for current matter
  const billedHours =
    mockTimesheetData.filter((e) => !["insufficient-detail", "poor-writing", "missing-info"].includes(e.issue)).length *
    1.5 // Mock calculation
  const unbilledHours =
    mockTimesheetData.filter((e) => ["insufficient-detail", "poor-writing", "missing-info"].includes(e.issue)).length *
    1.5

  const timekeepers = new Set(mockTimesheetData.map((e) => e.timekeeper))
  const avgHoursPerTimekeeper = (billedHours + unbilledHours) / timekeepers.size

  const adminHours =
    mockTimesheetData.filter((e) => e.task.toLowerCase().includes("admin") || e.task.toLowerCase().includes("meeting"))
      .length * 0.5

  const draftBills = mockBills.filter((b) => b.status === "Draft")
  const pastBills = mockBills.filter((b) => b.status === "Past")

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
      {/* Refined header */}
      <header className="border-b border-border bg-card sticky top-0 z-40" id="page-header">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <img src="/logo.png" alt="FixMyTime" className="h-8" />

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              {/* Nav Items */}
              <Link
                href="#"
                className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
              >
                Time
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
              >
                Bills
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
              >
                Rules
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
              >
                Reporting
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors"
              >
                Settings
              </Link>

              {/* Vertical Divider */}
              <div className="h-6 w-px bg-border" />

              {/* Matter Switcher */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-md hover:bg-muted/50 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="text-sm font-medium">{selectedMatter}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {/* Matter Options */}
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setSelectedMatter("Project Blackstone")
                          setIsDropdownOpen(false)
                        }}
                      >
                        Project Blackstone
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setSelectedMatter("Anderson Corp Litigation")
                          setIsDropdownOpen(false)
                        }}
                      >
                        Anderson Corp Litigation
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setSelectedMatter("Smith Estate Planning")
                          setIsDropdownOpen(false)
                        }}
                      >
                        Smith Estate Planning
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => {
                          setSelectedMatter("TechStart Acquisition")
                          setIsDropdownOpen(false)
                        }}
                      >
                        TechStart Acquisition
                      </button>

                      {/* Divider */}
                      <div className="border-t border-border my-1" />

                      {/* Logout */}
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-muted/50 transition-colors text-muted-foreground"
                        onClick={() => {
                          console.log("Logging out...")
                          setIsDropdownOpen(false)
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content - document-like layout */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Project Blackstone</h1>
          <p className="text-muted-foreground">Matter overview and billing management</p>
        </div>

        {/* Statistics Tiles */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Time Entry Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <StatTile
              label="Billed Hours"
              value={billedHours.toFixed(1)}
              detail="Hours ready to invoice"
              href="/time-entries"
            />
            <StatTile
              label="Unbilled Hours"
              value={unbilledHours.toFixed(1)}
              detail="Hours pending review"
              href="/entries-for-review"
            />
            <StatTile
              label="Fee Earners"
              value={timekeepers.size.toString()}
              detail={`${avgHoursPerTimekeeper.toFixed(1)} hours avg`}
            />
          </div>
          <div className="mt-4">
            <StatTile
              label="Admin Hours in Current Period"
              value={adminHours.toFixed(1)}
              detail="Hours for administrative tasks"
            />
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            Upload Time Entries
          </button>
        </div>

        {/* Bills Section */}
        <div className="space-y-8">
          {/* Draft Bills */}
          {draftBills.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Draft Bills</h2>
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
              <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Past Bills</h2>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <Link
            href="/bills"
            className="flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold mb-1">View Bills</h3>
              <p className="text-sm text-muted-foreground">Review and manage bills</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            href="/time-entries"
            className="flex items-center justify-between p-6 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold mb-1">Time Entries</h3>
              <p className="text-sm text-muted-foreground">View all timesheet entries</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>

        {/* Most Recent Bills */}
        <div>
          <h2 className="text-2xl font-serif font-light tracking-tight mb-6">Recent Activity</h2>
          <div className="space-y-3">
            <Link
              href="/bills/bill-001"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <h4 className="font-medium">October 2025 - Project Blackstone</h4>
                <p className="text-sm text-muted-foreground">40 entries • Draft</p>
              </div>
              <span className="text-sm font-medium text-muted-foreground">$12,450</span>
            </Link>
            <Link
              href="/bills/bill-002"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <h4 className="font-medium">September 2025 - Anderson Corp</h4>
                <p className="text-sm text-muted-foreground">28 entries • Draft</p>
              </div>
              <span className="text-sm font-medium text-muted-foreground">$8,900</span>
            </Link>
            <Link
              href="/bills/bill-003"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <h4 className="font-medium">August 2025 - Smith Estate</h4>
                <p className="text-sm text-muted-foreground">15 entries • Draft</p>
              </div>
              <span className="text-sm font-medium text-muted-foreground">$4,200</span>
            </Link>
          </div>
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
