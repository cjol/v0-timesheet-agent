"use client"
import { useState } from "react"
import { X } from "lucide-react"

interface RequestReviewModalProps {
  isOpen: boolean
  onClose: () => void
  documents: Array<{ id: string; title: string }>
  participants: Array<{ id: string; name: string }>
}

export default function RequestReviewModal({ isOpen, onClose, documents, participants }: RequestReviewModalProps) {
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set())
  const [selectedParticipant, setSelectedParticipant] = useState("")

  if (!isOpen) return null

  const handleToggleDoc = (docId: string) => {
    const newSelected = new Set(selectedDocs)
    if (newSelected.has(docId)) {
      newSelected.delete(docId)
    } else {
      newSelected.add(docId)
    }
    setSelectedDocs(newSelected)
  }

  const handleSubmit = () => {
    console.log("Sending review request:", {
      documents: Array.from(selectedDocs),
      participant: selectedParticipant,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-card rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Request Review</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Select Documents</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {documents.map((doc) => (
                <label key={doc.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocs.has(doc.id)}
                    onChange={() => handleToggleDoc(doc.id)}
                    className="rounded border border-border"
                  />
                  <span className="text-sm">{doc.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Send to</label>
            <select
              value={selectedParticipant}
              onChange={(e) => setSelectedParticipant(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a participant...</option>
              {participants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={selectedDocs.size === 0 || !selectedParticipant}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
