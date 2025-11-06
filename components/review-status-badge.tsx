import { Circle, Clock, CheckCircle, AlertCircle } from "lucide-react"

interface ReviewStatusBadgeProps {
  status: "no-review" | "pending" | "approved" | "changes-required"
  size?: "sm" | "lg"
}

export default function ReviewStatusBadge({ status, size = "sm" }: ReviewStatusBadgeProps) {
  const configs = {
    "no-review": {
      icon: Circle,
      label: "No review",
      color: "text-muted-foreground",
      bg: "bg-muted/50",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    approved: {
      icon: CheckCircle,
      label: "Approved",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    "changes-required": {
      icon: AlertCircle,
      label: "Changes required",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  }

  const config = configs[status]
  const Icon = config.icon
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4"
  const padding = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"

  return (
    <div className={`inline-flex items-center gap-1 rounded ${padding} ${config.bg}`}>
      <Icon className={`${iconSize} ${config.color}`} />
      <span className={config.color}>{config.label}</span>
    </div>
  )
}
