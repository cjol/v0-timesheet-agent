"use client"

import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Entry {
  id: string
  date: string
  timekeeper: string
  duration: number
  task: string
  issue: string
}

interface EntriesTableProps {
  data: Entry[]
  issueType: string
  isFullscreen?: boolean
}

type SortField = "date" | "timekeeper" | "duration" | "task"
type SortDirection = "asc" | "desc"

export default function EntriesTable({ data, issueType, isFullscreen }: EntriesTableProps) {
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [filterText, setFilterText] = useState("")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const [columnFilters, setColumnFilters] = useState<Partial<Record<SortField, string>>>({})

  const sortedAndFiltered = useMemo(() => {
    let result = [...data]

    Object.entries(columnFilters).forEach(([field, filterValue]) => {
      if (filterValue) {
        const lowerFilter = filterValue.toLowerCase()
        result = result.filter((entry) => {
          const fieldValue = String(entry[field as SortField]).toLowerCase()
          return fieldValue.includes(lowerFilter)
        })
      }
    })

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (sortField === "date") {
        aVal = new Date(a.date).getTime()
        bVal = new Date(b.date).getTime()
      } else if (sortField === "duration") {
        aVal = Number.parseFloat(String(aVal))
        bVal = Number.parseFloat(String(bVal))
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return result
  }, [data, sortField, sortDirection, columnFilters])

  const stats = {
    count: sortedAndFiltered.length,
    totalDuration: sortedAndFiltered.reduce((sum, entry) => sum + entry.duration, 0),
    avgDuration:
      sortedAndFiltered.length > 0
        ? (sortedAndFiltered.reduce((sum, entry) => sum + entry.duration, 0) / sortedAndFiltered.length).toFixed(1)
        : 0,
  }

  const SortHeaderCell = ({ field, label }: { field: SortField; label: string }) => {
    const [showFilter, setShowFilter] = useState(false)

    return (
      <th className="text-sm font-medium text-foreground py-3 px-4 text-left">
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => handleSort(field)}
            onMouseEnter={() => setShowFilter(true)}
            onMouseLeave={() => setShowFilter(false)}
            className="flex items-center gap-2 font-medium text-sm text-foreground hover:text-accent transition-colors"
          >
            {label}
            {sortField === field && (sortDirection === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
          </button>

          {showFilter && (
            <input
              type="text"
              placeholder="Filter..."
              value={columnFilters[field] || ""}
              onChange={(e) => setColumnFilters({ ...columnFilters, [field]: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setShowFilter(true)}
              onMouseLeave={() => setShowFilter(false)}
              className="absolute top-full left-0 mt-1 w-32 px-2 py-1 text-xs border border-input rounded-sm bg-background placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring z-10"
            />
          )}
        </div>
      </th>
    )
  }

  return (
    <div className={`border-border rounded-sm border-0 ${isFullscreen ? "h-screen flex flex-col" : ""}`}>
      <div className={isFullscreen ? "flex-1 overflow-y-auto" : "max-h-96 overflow-y-auto"}>
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-card z-20">
            <tr className="border-b border-border">
              <SortHeaderCell field="date" label="Date" />
              <SortHeaderCell field="timekeeper" label="Time Keeper" />
              <SortHeaderCell field="duration" label="Duration" />
              <SortHeaderCell field="task" label="Task" />
              <th className="text-sm font-medium text-foreground py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFiltered.map((entry) => (
              <tr key={entry.id} className="border-b border-border hover:bg-card/50 transition-colors">
                <td className="px-4 py-3 text-sm">{entry.date}</td>
                <td className="px-4 py-3 text-sm">{entry.timekeeper}</td>
                <td className="px-4 py-3 text-sm">{entry.duration}h</td>
                <td className="px-4 py-3 text-sm text-foreground/80">{entry.task}</td>
                <td className="px-4 py-3 text-sm">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs bg-transparent">
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 bg-card/30 z-20">
            <tr className="border-t-2 border-foreground">
              <td className="px-4 py-3 text-sm font-medium">
                {stats.count} {stats.count === 1 ? "entry" : "entries"}
              </td>
              <td className="px-4 py-3 text-sm"></td>
              <td className="px-4 py-3 text-sm font-medium">{stats.totalDuration}h total</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">Avg: {stats.avgDuration}h</td>
              <td className="px-4 py-3 text-sm"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
