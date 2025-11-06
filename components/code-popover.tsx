"use client"
import { useState } from "react"
import { Code, Copy, Check } from "lucide-react"

interface CodePopoverProps {
  code: string
  stepNumber: string
}

export default function CodePopover({ code, stepNumber }: CodePopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-muted rounded transition-colors"
        title="View code"
      >
        <Code className="w-4 h-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-20 w-96">
          <div className="p-4">
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
          </div>
        </div>
      )}
    </div>
  )
}
