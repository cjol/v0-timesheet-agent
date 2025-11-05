"use client"
import { useState, useEffect, useRef } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import IssueSection from "@/components/issue-section"
import TableOfContents from "@/components/table-of-contents"
import { mockTimesheetData } from "@/lib/mock-data"

export default function ReviewPage() {
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
  const sections = [
    {
      id: "insufficient-detail",
      title: "Insufficient Detail",
      count: mockTimesheetData.filter((entry) => entry.issue === "insufficient-detail").length
    },
    {
      id: "poor-writing",
      title: "Poor Writing Style",
      count: mockTimesheetData.filter((entry) => entry.issue === "poor-writing").length
    },
    {
      id: "unusual-duration",
      title: "Unusual Duration",
      count: mockTimesheetData.filter((entry) => entry.issue === "unusual-duration").length
    },
    {
      id: "missing-info",
      title: "Missing Information",
      count: mockTimesheetData.filter((entry) => entry.issue === "missing-info").length
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
              <a href="#" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
                Time
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
                Bills
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
                Rules
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
                Reporting
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
                Settings
              </a>

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
        <div className="mb-12" id="page-intro">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Draft Bills
                </a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  October 2025
                </a>
              </li>
              <li>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-foreground font-medium">
                Entries for Review
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">Entries for Review</h1>

          {/* Summary */}
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            <span className="font-semibold text-foreground">40 entries</span> from this bill have been flagged for your review.{" "}
{/* </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl"> */}
            <span className="font-semibold text-foreground">15</span> have suggestions for you to approve.</p>

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
