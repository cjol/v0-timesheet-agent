import Link from "next/link"

interface StatTileProps {
  label: string
  value: string
  detail?: string
  href?: string
  className?: string
}

export default function StatTile({ label, value, detail, href, className = "" }: StatTileProps) {
  const content = (
    <div
      className={`p-6 bg-card border border-border rounded-lg ${href ? "hover:shadow-md transition-shadow cursor-pointer" : ""} ${className}`}
    >
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="text-3xl font-semibold mb-1">{value}</p>
      {detail && <p className="text-sm text-muted-foreground">{detail}</p>}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
