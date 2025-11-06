import Link from "next/link"

interface RulesSidebarProps {
  rules: Array<{ id: string; title: string }>
  activeRuleId: string
}

export default function RulesSidebar({ rules, activeRuleId }: RulesSidebarProps) {
  return (
    <aside className="w-56 border-r border-border bg-card">
      <div className="sticky top-0 p-6 border-b border-border">
        <h3 className="text-sm font-semibold text-muted-foreground">Rules</h3>
      </div>
      <nav className="p-4 space-y-1">
        {rules.map((rule) => (
          <Link
            key={rule.id}
            href={`#${rule.id}`}
            className={`block px-4 py-2 rounded-lg transition-colors text-sm ${
              activeRuleId === rule.id
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {rule.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
