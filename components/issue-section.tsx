"use client"

import { useState, useRef } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import EntriesTable from "./entries-table"

interface IssueSectionProps {
  title: string
  description: string
  issueType: string
  data: any[]
}

export default function IssueSection({ title, description, issueType, data }: IssueSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col p-8 scroll-mt-24">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-3xl font-serif font-light tracking-tight">{title}</h2>
              <button
                onClick={handleFullscreen}
                className="p-2 bg-background hover:bg-card border border-border rounded-sm transition-colors"
                title="Exit fullscreen"
              >
                <Minimize2 size={16} className="text-muted-foreground" />
              </button>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
          </div>

          {/* Table in fullscreen mode */}
          <div className="flex-1 overflow-hidden">
            <EntriesTable data={data} issueType={issueType} isFullscreen={true} />
          </div>
        </div>
      )}

      {/* Normal section view */}
      <section
        ref={containerRef}
        className="mb-16 scroll-mt-24 px-8 py-8 shadow-md transition-all duration-500 hover:shadow-xl hover:scale-105 origin-center rounded-md"
      >
        {/* Section header - large serif typography */}
        <div className="mb-6">
          <h2 className="text-3xl font-serif font-light tracking-tight mb-3">{title}</h2>
          <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
        </div>

        {/* Table container */}
        <div className="relative border-border rounded-sm overflow-hidden border-0">
          <EntriesTable data={data} issueType={issueType} isFullscreen={false} />

          {/* Fullscreen button */}
          {data.length > 0 && (
            <button
              onClick={handleFullscreen}
              className="absolute top-4 right-4 p-2 bg-background/80 hover:bg-background border border-border rounded-sm transition-colors z-10"
              title="Maximize section"
            >
              <Maximize2 size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Empty state */}
        {data.length === 0 && (
          <div className="border border-border rounded-sm p-12 bg-card/50">
            <p className="text-center text-muted-foreground">No issues found in this category</p>
          </div>
        )}

        <div className="h-8" />
      </section>
    </>
  )
}
