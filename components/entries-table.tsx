"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"

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

const columnHelper = createColumnHelper<Entry>()

export default function EntriesTable({ data, issueType, isFullscreen }: EntriesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null)

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        cell: (info) => info.getValue(),
        sortingFn: (rowA, rowB) => {
          const dateA = new Date(rowA.original.date).getTime()
          const dateB = new Date(rowB.original.date).getTime()
          return dateA - dateB
        },
      }),
      columnHelper.accessor("timekeeper", {
        header: "Time Keeper",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("duration", {
        header: "Duration",
        cell: (info) => `${info.getValue()}h`,
      }),
      columnHelper.accessor("task", {
        header: "Task",
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => (
          <Button variant="outline" size="sm" className="h-7 px-2 text-xs bg-transparent">
            Review
          </Button>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const filteredRows = table.getFilteredRowModel().rows
  const stats = {
    count: filteredRows.length,
    totalDuration: filteredRows.reduce((sum, row) => sum + row.original.duration, 0),
    avgDuration:
      filteredRows.length > 0
        ? (filteredRows.reduce((sum, row) => sum + row.original.duration, 0) / filteredRows.length).toFixed(1)
        : 0,
  }

  const SortHeaderCell = ({ headerId, label }: { headerId: string; label: string }) => {
    const [isHovered, setIsHovered] = useState(false)
    const filterPopupRef = useRef<HTMLDivElement>(null)
    const header = table.getHeaderGroups()[0].headers.find((h) => h.id === headerId)
    const canSort = header?.column.getCanSort()
    const isSorted = header?.column.getIsSorted()
    const filterValue = (header?.column.getFilterValue() as string) ?? ""
    const hasActiveFilter = filterValue.length > 0
    const isFilterOpen = activeFilterColumn === headerId

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (filterPopupRef.current && !filterPopupRef.current.contains(event.target as Node)) {
          setActiveFilterColumn(null)
        }
      }

      if (isFilterOpen) {
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [isFilterOpen])

    const toggleFilter = (e: React.MouseEvent) => {
      e.stopPropagation()
      setActiveFilterColumn(isFilterOpen ? null : headerId)
    }

    const showFilterIcon = isHovered || hasActiveFilter || isFilterOpen

    return (
      <th className="text-sm font-medium text-foreground py-3 px-4 text-left">
        <div
          className="flex items-center gap-2 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => canSort && header?.column.toggleSorting()}
            className="flex items-center gap-2 font-medium text-sm text-foreground hover:text-primary transition-colors"
          >
            {label}
            {isSorted && (isSorted === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
          </button>

          {canSort && (
            <button
              onClick={toggleFilter}
              className={`p-0.5 rounded transition-all ${
                showFilterIcon ? "opacity-100" : "opacity-0"
              } ${
                hasActiveFilter
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Filter size={14} />
            </button>
          )}

          {isFilterOpen && (
            <div
              ref={filterPopupRef}
              className="absolute top-full left-0 mt-1 p-2 bg-popover border border-border rounded-md shadow-md z-30"
            >
              <input
                type="text"
                placeholder="Filter..."
                value={filterValue}
                onChange={(e) => header?.column.setFilterValue(e.target.value)}
                autoFocus
                className="w-40 px-2 py-1.5 text-xs border border-input rounded-sm bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {hasActiveFilter && (
                <button
                  onClick={() => {
                    header?.column.setFilterValue("")
                    setActiveFilterColumn(null)
                  }}
                  className="mt-1 w-full px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear filter
                </button>
              )}
            </div>
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
              <SortHeaderCell headerId="date" label="Date" />
              <SortHeaderCell headerId="timekeeper" label="Time Keeper" />
              <SortHeaderCell headerId="duration" label="Duration" />
              <SortHeaderCell headerId="task" label="Task" />
              <th className="text-sm font-medium text-foreground py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-card/50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 bg-card z-20">
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
