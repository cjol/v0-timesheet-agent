"use client"
import { useState } from "react"
import { Code, Copy, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CodePopoverProps {
  code: string
  stepNumber: string
}

export default function CodePopover({ code, stepNumber }: CodePopoverProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-1 hover:bg-muted rounded transition-colors"
          title="View code"
        >
          <Code className="w-4 h-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="start">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Step {stepNumber} Implementation</h4>
          <button onClick={handleCopy} className="p-1 hover:bg-muted rounded transition-colors" title="Copy code">
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
        <pre className="bg-muted/50 p-3 rounded-lg text-xs overflow-x-auto max-h-64 overflow-y-auto">
          <code className="font-mono text-foreground">{code}</code>
        </pre>
      </PopoverContent>
    </Popover>
  )
}
