"use client"
import { useState, useEffect } from "react"
import RulesSidebar from "@/components/rules-sidebar"
import CodePopover from "@/components/code-popover"
import { mockAutomationRules } from "@/lib/mock-data"

export default function RulesPage() {
  const [activeRuleId, setActiveRuleId] = useState("rule-1")

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        setActiveRuleId(hash)
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    handleHashChange()

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex h-screen">
        {/* Sidebar */}
        <RulesSidebar rules={mockAutomationRules} activeRuleId={activeRuleId} />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold mb-2">Automation Rules</h1>
              <p className="text-muted-foreground">
                View and understand the automation rules applied to this matter's billing process
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
                      <h3 className="text-sm font-semibold mb-2">References</h3>
                      <div className="flex flex-wrap gap-2">
                        {rule.references.map((ref, idx) => (
                          <a key={idx} href="/settings" className="text-sm text-primary hover:underline">
                            {ref}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Automation Steps */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Automation Steps</h3>
                    {rule.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
                      >
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                            {step.number}
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">{step.description}</p>
                          <p className="text-xs text-muted-foreground">Implementation logic for this automation step</p>
                        </div>

                        {/* Code Icon */}
                        <div className="flex-shrink-0">
                          <CodePopover code={step.code} stepNumber={step.number} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
