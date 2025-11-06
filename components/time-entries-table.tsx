"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import type { TimesheetEntry } from "@/lib/mock-data"

interface TimeEntriesTableProps {
  data: TimesheetEntry[]
}

export default function TimeEntriesTable({ data }: TimeEntriesTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof TimesheetEntry | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const columns = ["date", "timekeeper", "duration", "task", "bill", "reviewStatus", "actions"] as const

  const handleSort = (column: keyof TimesheetEntry) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleFilter = (column: string, value: string) => {
    const newFilters = { ...filters }
    if (value) {
      newFilters[column] = value.toLowerCase()
    } else {
      delete newFilters[column]
    }
    setFilters(newFilters)
  }

  const sortedData = [...data]

  if (sortColumn) {
    sortedData.sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })
  }

  const filteredData = sortedData.filter((entry) => {
    return Object.entries(filters).every(([col, val]) => {
      const entryVal = entry[col as keyof TimesheetEntry]
      return String(entryVal).toLowerCase().includes(val)
    })
  })

  const totalDuration = filteredData.reduce((sum, entry) => sum + entry.duration, 0)

  const getReviewStatus = (entry: TimesheetEntry) => {
    if (entry.issue) {
      return {
        label: entry.issue
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        color: "text-amber-600 bg-amber-50",
      }
    }
    return { label: "No issues", color: "text-green-600 bg-green-50" }
  }

  const toggleExpandRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  return (
    <div className="max-h-96 overflow-y-auto border border-border rounded-lg bg-background">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-card border-b border-border">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-24">
              <button
                onClick={() => handleSort("date")}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Date
                {sortColumn === "date" &&
                  (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <input
                type="text"
                placeholder="Filter..."
                className="w-full mt-2 px-2 py-1 text-xs border border-border rounded bg-background"
                onChange={(e) => handleFilter("date", e.target.value)}
              />
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-32">
              <button
                onClick={() => handleSort("timekeeper")}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Timekeeper
                {sortColumn === "timekeeper" &&
                  (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <input
                type="text"
                placeholder="Filter..."
                className="w-full mt-2 px-2 py-1 text-xs border border-border rounded bg-background"
                onChange={(e) => handleFilter("timekeeper", e.target.value)}
              />
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-20">
              <button
                onClick={() => handleSort("duration")}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Duration
                {sortColumn === "duration" &&
                  (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground flex-1">
              <button
                onClick={() => handleSort("task")}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                Task
                {sortColumn === "task" &&
                  (sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
              </button>
              <input
                type="text"
                placeholder="Filter..."
                className="w-full mt-2 px-2 py-1 text-xs border border-border rounded bg-background"
                onChange={(e) => handleFilter("task", e.target.value)}
              />
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-24">Bill</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-32">Review Status</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground w-16">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry) => {
            const reviewStatus = getReviewStatus(entry)
            const isExpanded = expandedRows.has(entry.id)

            return (
              <tr key={entry.id} className="border-b border-border hover:bg-muted/30">
                <td className="px-4 py-3">{entry.date}</td>
                <td className="px-4 py-3">{entry.timekeeper}</td>
                <td className="px-4 py-3">{entry.duration.toFixed(2)} hrs</td>
                <td className="px-4 py-3 max-w-sm truncate">{entry.task}</td>
                <td className="px-4 py-3">
                  <Link href="/bills/bill-001" className="text-primary hover:underline text-xs">
                    Oct 2025
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {entry.issue ? (
                    <Link
                      href={`/entries-for-review#${entry.issue}`}
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${reviewStatus.color} hover:opacity-80 transition-opacity`}
                    >
                      {reviewStatus.label}
                    </Link>
                  ) : (
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${reviewStatus.color}`}>
                      {reviewStatus.label}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleExpandRow(entry.id)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot className="sticky bottom-0 bg-card border-t border-border font-semibold">
          <tr>
            <td colSpan={2} className="px-4 py-3">
              {filteredData.length} entries
            </td>
            <td className="px-4 py-3">{totalDuration.toFixed(2)} hrs</td>
            <td colSpan={4} className="px-4 py-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
