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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [placeholderRect, setPlaceholderRect] = useState<{ width: number; height: number } | null>(null)
  const [fixedPosition, setFixedPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      const element = containerRef.current
      const rect = element.getBoundingClientRect()
      
      setPlaceholderRect({ 
        width: element.offsetWidth, 
        height: element.offsetHeight 
      })
      // Use getBoundingClientRect for position and size (includes transforms)
      setFixedPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      })
      setIsFullscreen(true)
      setIsAnimating(true)
      
      // Trigger animation after a frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false)
        })
      })
    } else {
      // Reverse animation: go from fullscreen back to original position
      setIsAnimating(true)
      
      // Wait for animation to complete before removing fullscreen
      setTimeout(() => {
        setIsFullscreen(false)
        setIsAnimating(false)
        setPlaceholderRect(null)
        setFixedPosition(null)
      }, 300) // Match the animation duration
    }
  }

  return (
    <>
      {/* Placeholder to prevent reflow when fullscreen */}
      {isFullscreen && placeholderRect && (
        <div 
          className="mb-16"
          style={{ 
            width: `${placeholderRect.width}px`, 
            height: `${placeholderRect.height}px`
          }} 
        />
      )}

      <section
        ref={containerRef}
        className={`scroll-mt-24 px-8 py-8 shadow-md rounded-md group bg-background mb-16 ${
          isFullscreen 
            ? "fixed z-50 transition-[top,left,right,bottom] duration-300 ease-in-out flex flex-col" 
            : "transition-all duration-500 hover:shadow-xl hover:scale-105 origin-center relative"
        }`}
        style={isFullscreen && fixedPosition ? (
          isAnimating ? {
            top: `${fixedPosition.top}px`,
            left: `${fixedPosition.left}px`,
            right: `${window.innerWidth - fixedPosition.left - fixedPosition.width}px`,
            bottom: `${window.innerHeight - fixedPosition.top - fixedPosition.height}px`
          } : {
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px'
          }
        ) : undefined}
      >
        {/* Maximize/Minimize button */}
        {data.length > 0 && (
          <button
            onClick={handleFullscreen}
            className={`absolute top-4 right-4 p-2 bg-background/80 hover:bg-background border border-border rounded-sm transition-opacity duration-200 z-30 ${
              isFullscreen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            title={isFullscreen ? "Exit fullscreen" : "Maximize section"}
          >
            {isFullscreen ? (
              <Minimize2 size={16} className="text-muted-foreground" />
            ) : (
              <Maximize2 size={16} className="text-muted-foreground" />
            )}
          </button>
        )}

        {/* Section header - large serif typography */}
        <div className="mb-6">
          <h2 className="text-3xl font-serif font-light tracking-tight mb-3">{title}</h2>
          <p className="text-muted-foreground text-base leading-relaxed">{description}</p>
        </div>

        {/* Table container */}
        <div className={`relative border-border rounded-sm overflow-hidden border-0 ${isFullscreen ? "flex-1" : ""}`}>
          <EntriesTable data={data} issueType={issueType} isFullscreen={isFullscreen} />
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
