import type React from "react"
interface SettingsSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-light tracking-tight mb-2">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="bg-card border border-border rounded-lg p-6">{children}</div>
    </div>
  )
}
