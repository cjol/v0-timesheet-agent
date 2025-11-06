"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown, Filter, Check, ChevronsUpDown, CheckCircle, XCircle, Eye, Sparkles, Undo2 } from "lucide-react"
import { diff_match_patch, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL } from "diff-match-patch"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
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

interface ActionLogEntry {
  message: string
  timestamp: string
  actor: string
  undoable?: boolean
}

interface Entry {
  id: string
  date: string
  timekeeper: string
  duration: number
  task: string
  issue: string
  suggestedTask?: string
  actionLog?: ActionLogEntry[]
}

interface EntriesTableProps {
  data: Entry[]
  issueType: string
  isFullscreen?: boolean
  onEditingChange?: (isEditing: boolean) => void
}

const columnHelper = createColumnHelper<Entry>()

const renderTaskDiff = (oldText: string, newText: string) => {
  const dmp = new diff_match_patch()
  
  // First, compute character-level diffs
  const diffs = dmp.diff_main(oldText, newText)
  
  // Clean up the diffs for better semantic quality
  dmp.diff_cleanupSemantic(diffs)
  
  return (
    <div className="font-mono text-sm">
      {diffs.map((diff, index) => {
        const [operation, text] = diff
        
        if (operation === DIFF_DELETE) {
          return (
            <span key={index} className="text-red-600/60 line-through">
              {text}
            </span>
          )
        }
        
        if (operation === DIFF_INSERT) {
          return (
            <span key={index} className="text-green-600 font-medium">
              {text}
            </span>
          )
        }
        
        return <span key={index}>{text}</span>
      })}
    </div>
  )
}

export default function EntriesTable({ data, issueType, isFullscreen, onEditingChange }: EntriesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null)
  const [editedData, setEditedData] = useState<Entry[]>(data)
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null)

  useEffect(() => {
    onEditingChange?.(editingCell !== null)
  }, [editingCell, onEditingChange])

  useEffect(() => {
    setEditedData(data)
  }, [data])

  const updateCellValue = (rowId: string, columnId: keyof Entry, value: string | number) => {
    setEditedData((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [columnId]: value } : row))
    )
  }

  const EditableCell = ({ rowId, columnId, value, type = "text" }: { rowId: string; columnId: keyof Entry; value: string | number; type?: "text" | "number" | "date" }) => {
    const isEditing = editingCell?.rowId === rowId && editingCell?.columnId === columnId
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    const handleDoubleClick = () => {
      setEditingCell({ rowId, columnId })
      setLocalValue(value)
    }

    const handleBlur = () => {
      updateCellValue(rowId, columnId, type === "number" ? parseFloat(localValue as string) || 0 : localValue)
      setEditingCell(null)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleBlur()
      } else if (e.key === "Escape") {
        setLocalValue(value)
        setEditingCell(null)
      }
    }

    if (isEditing) {
      return (
        <input
          type={type}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full px-1 py-0.5 border border-primary rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )
    }

    return (
      <div onDoubleClick={handleDoubleClick} className="cursor-text min-h-[20px]">
        {value}
      </div>
    )
  }

  const SearchableDropdownCell = ({ rowId, value }: { rowId: string; value: string }) => {
    const isEditing = editingCell?.rowId === rowId && editingCell?.columnId === "timekeeper"
    const [open, setOpen] = useState(false)

    // Get unique timekeepers from the data
    const allTimekeepers = useMemo(() => {
      const keepers = new Set(editedData.map(entry => entry.timekeeper))
      return Array.from(keepers).sort()
    }, [editedData])

    useEffect(() => {
      if (isEditing) {
        setOpen(true)
      }
    }, [isEditing])

    const handleDoubleClick = () => {
      setEditingCell({ rowId, columnId: "timekeeper" })
    }

    const handleSelect = (timekeeper: string) => {
      updateCellValue(rowId, "timekeeper", timekeeper)
      setEditingCell(null)
      setOpen(false)
    }

    if (isEditing) {
      return (
        <Popover open={open} onOpenChange={(newOpen) => {
          setOpen(newOpen)
          if (!newOpen) {
            setEditingCell(null)
          }
        }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between h-7 px-2 text-sm font-normal"
            >
              {value}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search timekeeper..." />
              <CommandList>
                <CommandEmpty>No timekeeper found.</CommandEmpty>
                <CommandGroup>
                  {allTimekeepers.map((timekeeper) => (
                    <CommandItem
                      key={timekeeper}
                      value={timekeeper}
                      onSelect={() => handleSelect(timekeeper)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === timekeeper ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {timekeeper}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
    }

    return (
      <div onDoubleClick={handleDoubleClick} className="cursor-text min-h-[20px]">
        {value}
      </div>
    )
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "Date",
        size: 120,
        cell: (info) => (
          <EditableCell
            rowId={info.row.original.id}
            columnId="date"
            value={info.getValue()}
            type="date"
          />
        ),
        sortingFn: (rowA, rowB) => {
          const dateA = new Date(rowA.original.date).getTime()
          const dateB = new Date(rowB.original.date).getTime()
          return dateA - dateB
        },
      }),
      columnHelper.accessor("timekeeper", {
        header: "Time Keeper",
        size: 180,
        cell: (info) => (
          <SearchableDropdownCell
            rowId={info.row.original.id}
            value={info.getValue()}
          />
        ),
      }),
      columnHelper.accessor("duration", {
        header: "Duration",
        size: 100,
        cell: (info) => (
          <EditableCell
            rowId={info.row.original.id}
            columnId="duration"
            value={info.getValue()}
            type="number"
          />
        ),
      }),
      columnHelper.accessor("task", {
        header: "Task",
        size: undefined,
        cell: (info) => {
          const row = info.row.original

          if (row.suggestedTask) {
            return (
              <div className="py-1">
                {renderTaskDiff(info.getValue(), row.suggestedTask)}
              </div>
            )
          }

          return (
            <div className="font-mono">
              <EditableCell
                rowId={info.row.original.id}
                columnId="task"
                value={info.getValue()}
              />
            </div>
          )
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        size: 150,
        cell: (info) => {
          const isInsufficientDetail = issueType === "insufficient-detail"

          return (
            <div className="flex items-center gap-1">
              {isInsufficientDetail && info.row.original.actionLog ? (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-pink-500/10 hover:text-pink-600 cursor-pointer"
                        title="Action Log"
                      >
                        <Sparkles className="h-4 w-4 text-pink-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-md">
                      <div className="space-y-2">
                        <p className="font-semibold text-xs">Action Log</p>
                        <div className="space-y-1.5">
                          {info.row.original.actionLog.map((log, index) => {
                            const logDate = new Date(log.timestamp).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })
                            return (
                              <div key={index} className="text-xs text-muted-foreground grid grid-cols-[auto_auto_1fr_auto] gap-2 items-start">
                                <span className="font-medium">{logDate}</span>
                                <span className="text-primary font-medium">{log.actor}</span>
                                <span>{log.message}</span>
                                {log.undoable && (
                                  <button
                                    onClick={() => console.log('Undo action:', log.message)}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    title="Undo this action"
                                  >
                                    <Undo2 className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="h-7 w-7 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-gray-300" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-green-500/10 hover:text-green-600 cursor-pointer"
                onClick={() => console.log('Approve', info.row.original.id)}
                title="Approve"
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-red-500/10 hover:text-red-600 cursor-pointer"
                onClick={() => console.log('Reject', info.row.original.id)}
                title="Reject"
              >
                <XCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 hover:bg-blue-500/10 hover:text-blue-600 cursor-pointer"
                onClick={() => console.log('View Details', info.row.original.id)}
                title="View Details"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          )
        },
      }),
    ],
    [editingCell, issueType]
  )

  const table = useReactTable({
    data: editedData,
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
      <th 
        className="text-sm font-medium text-foreground py-3 px-4 text-left"
        style={{ width: header?.getSize() !== 150 ? header?.getSize() : undefined }}
      >
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
              <th className="text-sm font-medium text-foreground py-3 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-border hover:bg-card/50 transition-colors",
                  editingCell?.rowId === row.original.id && "bg-card/50"
                )}
              >
                 {row.getVisibleCells().map((cell) => (
                   <td 
                     key={cell.id} 
                     className="px-4 py-3 text-sm"
                     style={{ width: cell.column.getSize() !== 150 ? cell.column.getSize() : undefined }}
                   >
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                   </td>
                 ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 bg-card z-20">
            <tr className="border-t-2 border-foreground">
              <td className="px-4 py-3 text-sm font-medium" style={{ width: 120 }}>
                {stats.count} {stats.count === 1 ? "entry" : "entries"}
              </td>
              <td className="px-4 py-3 text-sm" style={{ width: 180 }}></td>
              <td className="px-4 py-3 text-sm font-medium" style={{ width: 100 }}>{stats.totalDuration}h total</td>
              <td className="px-4 py-3 text-sm text-muted-foreground">Avg: {stats.avgDuration}h</td>
              <td className="px-4 py-3 text-sm" style={{ width: 150 }}></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex items-center justify-end gap-2 px-4 py-3 bg-card border-t border-border">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-3 text-xs hover:bg-green-500/10 hover:text-green-600 hover:border-green-600 cursor-pointer"
          onClick={() => console.log('Approve All')}
        >
          Approve All
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-3 text-xs hover:bg-red-500/10 hover:text-red-600 hover:border-red-600 cursor-pointer"
          onClick={() => console.log('Exclude All')}
        >
          Exclude All
        </Button>
      </div>
    </div>
  )
}
