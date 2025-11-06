"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface Option {
  value: string
  label: string
  role?: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (value: string) => {
    onChange(selected.filter((s) => s !== value))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "" && selected.length > 0) {
          onChange(selected.slice(0, -1))
        }
      }
      if (e.key === "Escape") {
        input.blur()
        setOpen(false)
      }
    }
  }

  const selectables = options.filter((option) => {
    if (selected.includes(option.value)) return false
    if (!inputValue) return true
    return option.label.toLowerCase().includes(inputValue.toLowerCase())
  })

  return (
    <div className={`${className} relative`} onKeyDown={handleKeyDown}>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((value) => {
            const option = options.find((o) => o.value === value)
            return (
              <Badge key={value} variant="secondary" className="rounded-sm px-1 font-normal">
                <span>{option?.label}</span>
                {option?.role && (
                  <span className="ml-1 text-muted-foreground">({option.role})</span>
                )}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value)
                    }
                  }}
                  onMouseDown={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-[120px]"
          />
        </div>
      </div>
      {open && selectables.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="max-h-60 overflow-auto p-1">
            {selectables.map((option) => (
              <div
                key={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => {
                  setInputValue("")
                  onChange([...selected, option.value])
                  inputRef.current?.focus()
                }}
              >
                <span>{option.label}</span>
                {option.role && (
                  <span className="ml-2 text-sm text-muted-foreground">({option.role})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
