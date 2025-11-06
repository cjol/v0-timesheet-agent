"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { MultiSelect, type Option } from "@/components/ui/multi-select"
import { RichTextEditor } from "@/components/rich-text-editor"
import { defaultReviewEmailTemplate } from "@/lib/mock-data"

interface Document {
  id: string
  title: string
  type: string
}

interface Participant {
  id: string
  name: string
  role: string
}

interface RequestReviewModalProps {
  isOpen: boolean
  onClose: () => void
  documents: Document[]
  participants: Participant[]
}

interface DocumentSelection {
  id: string
  isAttachment: boolean
  useAsEmailBody: boolean
}

export default function RequestReviewModal({
  isOpen,
  onClose,
  documents,
  participants,
}: RequestReviewModalProps) {
  const [selectedDocs, setSelectedDocs] = useState<Map<string, DocumentSelection>>(new Map())
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [emailBody, setEmailBody] = useState<string>("")

  // Reset email body when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmailBody(defaultReviewEmailTemplate)
    }
  }, [isOpen])

  // Update email body when a document is selected as email body
  useEffect(() => {
    const emailBodyDoc = Array.from(selectedDocs.values()).find((doc) => doc.useAsEmailBody)
    if (emailBodyDoc) {
      // TODO: attach document contents to the document in the data source itself and use that
      setEmailBody(
        `<p>Content from document would be loaded here...</p><p><br></p><p>This is a placeholder for the HTML document content.</p>`
      )
    } else {
      setEmailBody(defaultReviewEmailTemplate)
    }
  }, [selectedDocs])

  if (!isOpen) return null

  const handleToggleDoc = (docId: string, isAttachment: boolean) => {
    const newSelected = new Map(selectedDocs)
    const existing = newSelected.get(docId)

    if (existing) {
      if (isAttachment) {
        // Toggle attachment
        const newIsAttachment = !existing.isAttachment
        if (!newIsAttachment && !existing.useAsEmailBody) {
          // If both are now false, remove entirely
          newSelected.delete(docId)
        } else {
          newSelected.set(docId, { ...existing, isAttachment: newIsAttachment })
        }
      } else {
        // Toggle email body
        const newUseAsEmailBody = !existing.useAsEmailBody
        if (!newUseAsEmailBody && !existing.isAttachment) {
          // If both are now false, remove entirely
          newSelected.delete(docId)
        } else {
          // Uncheck all other documents' email body when checking this one
          if (newUseAsEmailBody) {
            newSelected.forEach((doc, id) => {
              if (id !== docId && doc.useAsEmailBody) {
                if (doc.isAttachment) {
                  newSelected.set(id, { ...doc, useAsEmailBody: false })
                } else {
                  newSelected.delete(id)
                }
              }
            })
          }
          newSelected.set(docId, { ...existing, useAsEmailBody: newUseAsEmailBody })
        }
      }
    } else {
      // Add new selection
      const newDoc: DocumentSelection = {
        id: docId,
        isAttachment: isAttachment,
        useAsEmailBody: !isAttachment,
      }

      // If adding as email body, uncheck all other documents' email body
      if (newDoc.useAsEmailBody) {
        newSelected.forEach((doc, id) => {
          if (doc.useAsEmailBody) {
            if (doc.isAttachment) {
              newSelected.set(id, { ...doc, useAsEmailBody: false })
            } else {
              newSelected.delete(id)
            }
          }
        })
      }

      newSelected.set(docId, newDoc)
    }

    setSelectedDocs(newSelected)
  }

  const handleSubmit = () => {
    console.log("Sending review request:", {
      documents: Array.from(selectedDocs.values()),
      participants: selectedParticipants,
      emailBody,
    })
    onClose()
  }

  const participantOptions: Option[] = participants.map((p) => ({
    value: p.id,
    label: p.name,
    role: p.role,
  }))

  const hasValidSelection =
    (selectedDocs.size > 0 || emailBody.trim() !== "") && selectedParticipants.length > 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-6xl w-full h-[95vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-semibold">Request Review</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Flexible */}
        <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
          {/* Participants - Fixed height */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium mb-2">Send to</label>
            <MultiSelect
              options={participantOptions}
              selected={selectedParticipants}
              onChange={setSelectedParticipants}
              placeholder="Select participants..."
            />
          </div>

          {/* Documents - Auto height to fit content */}
          <div className="flex-shrink-0">
            <label className="block text-sm font-medium mb-3">Select Documents</label>
            <div className="space-y-2">
              {documents.map((doc) => {
                const selection = selectedDocs.get(doc.id)
                const isHtml = doc.type === "HTML"
                const canUseAsEmailBody = isHtml

                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-3 border border-border rounded-lg"
                  >
                    <label className={`flex items-center gap-2 flex-1 ${selection?.useAsEmailBody ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                      <input
                        type="checkbox"
                        checked={selection?.isAttachment || false}
                        onChange={() => handleToggleDoc(doc.id, true)}
                        disabled={selection?.useAsEmailBody || false}
                        className="rounded border border-border disabled:cursor-not-allowed"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{doc.title}</span>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-muted rounded text-muted-foreground">
                          {doc.type}
                        </span>
                      </div>
                    </label>

                    {canUseAsEmailBody && (
                      <label className="flex items-center gap-2 cursor-pointer text-sm whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selection?.useAsEmailBody || false}
                          onChange={() => handleToggleDoc(doc.id, false)}
                          className="rounded border border-border"
                        />
                        <span className="text-muted-foreground">Use as email body</span>
                      </label>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Email Preview - Takes remaining space */}
          <div className="flex-1 flex flex-col min-h-0">
            <label className="block text-sm font-medium mb-3 flex-shrink-0">Email Preview</label>
            <div className="flex-1 min-h-0">
              <RichTextEditor value={emailBody} onChange={setEmailBody} fillHeight />
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex-shrink-0">
              Edit the email content that will be sent to reviewers
            </p>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex gap-2 p-6 border-t border-border flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!hasValidSelection}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
