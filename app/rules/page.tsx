"use client"
import { useState } from "react"
import CodePopover from "@/components/code-popover"
import { useAutomationRules } from "@/lib/hooks"
import { ChevronDown, ChevronRight } from "lucide-react"

export default function RulesPage() {
  const { data: mockAutomationRules = [] } = useAutomationRules()
  const [openReferences, setOpenReferences] = useState<Record<string, boolean>>({})

  const toggleReferences = (ruleId: string) => {
    setOpenReferences(prev => ({
      ...prev,
      [ruleId]: !prev[ruleId]
    }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-2">Automation Rules</h1>
              <p className="text-muted-foreground">
                View and understand the automation rules applied to this matter&apos;s billing process
              </p>
            </div>

            {/* Rules */}
            <div className="space-y-12">
              {mockAutomationRules.map((rule) => (
                <section
                  key={rule.id}
                  id={rule.id}
                  className="scroll-mt-24 pb-12 border-b border-border last:border-b-0"
                >
                  {/* Rule Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-light tracking-tight mb-2">{rule.title}</h2>
                    <p className="text-muted-foreground">{rule.description}</p>
                  </div>

                  {/* References */}
                  {rule.references.length > 0 && (
                    <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                      <button
                        onClick={() => toggleReferences(rule.id)}
                        className="flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity"
                      >
                        {openReferences[rule.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <h3 className="text-sm font-semibold">
                          References ({rule.references.length})
                        </h3>
                      </button>
                      {openReferences[rule.id] && (
                        <div className="space-y-3 mt-3">
                          {rule.references.map((ref, idx) => (
                            <div key={idx} className="border-l-2 border-primary/30 pl-3">
                              <a href="/settings" className="text-sm font-medium text-primary hover:underline">
                                {ref.title}
                              </a>
                              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                                "{ref.excerpt}"
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Automation Steps - Timeline Style */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-6">Automation Steps</h3>
                    <div className="relative">
                      {/* Timeline vertical line */}
                      <div className="absolute left-2 top-4 bottom-0 w-[1px] bg-border" />

{rule.steps.map((step, idx) => {
                        // Check if this is a nested step (contains letter like 1a, 1b, 2a, etc.)
                        const isNested = /^\d+[a-z]/.test(step.number);
                        const leftOffset = isNested ? "pl-16" : "pl-8";
                        const timelineDotLeft = isNested ? "left-8" : "left-0";

                        return (
                          <div key={idx} className={`relative mb-6 last:mb-0 ${leftOffset}`}>
                            {/* Curved line connector for nested steps */}
                            {isNested && (
                              <div
                                className="absolute border-l border-b border-border rounded-bl-lg"
                                style={{
                                  left: '0.5rem',
                                  top: '-1.5rem',
                                  width: '2rem',
                                  height: '2rem'
                                }}
                              />
                            )}

                            {/* Timeline dot */}
                            <div className={`absolute ${timelineDotLeft} top-0.5 flex size-4 items-center justify-center rounded-full bg-foreground`} />

                            {/* Step Title with Number */}
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-semibold tracking-tight">
                                {step.number}. {step.description}
                              </h4>
                              <CodePopover code={step.code} stepNumber={step.number} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
                ))}
            </div>
      </div>
    </main>
  )
}
