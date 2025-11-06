"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface HtmlPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  htmlContent: string
}

export default function HtmlPreviewModal({
  isOpen,
  onClose,
  title,
  htmlContent,
}: HtmlPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </DialogContent>
    </Dialog>
  )
}
