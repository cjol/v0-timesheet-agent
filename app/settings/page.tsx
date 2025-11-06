"use client"
import { useState, useEffect } from "react"
import { Edit2, Save, X, Plus } from "lucide-react"
import SettingsSection from "@/components/settings-section"
import { useTimekeepers, useOtherParticipants, useContextDocuments, useMatterContext } from "@/lib/hooks"
import { useMatter } from "@/contexts/matter-context"

export default function SettingsPage() {
  const { currentMatterId } = useMatter()
  const { data: mockMatterContext } = useMatterContext(currentMatterId)
  const { data: mockContextDocuments = [] } = useContextDocuments(currentMatterId)
  const { data: mockTimekeepers = [] } = useTimekeepers(currentMatterId)
  const { data: mockOtherParticipants = [] } = useOtherParticipants(currentMatterId)

  const [isEditingContext, setIsEditingContext] = useState(false)
  const [contextDescription, setContextDescription] = useState(mockMatterContext?.description || "")
  const [billingArrangements, setBillingArrangements] = useState(mockMatterContext?.billingArrangements || [])
  const [newArrangement, setNewArrangement] = useState("")
  const [contextDocuments, setContextDocuments] = useState(mockContextDocuments)
  const [timekeepers, setTimekeepers] = useState(mockTimekeepers)
  const [otherParticipants, setOtherParticipants] = useState(mockOtherParticipants)

  useEffect(() => {
    if (mockMatterContext) {
      setContextDescription(mockMatterContext.description)
      setBillingArrangements(mockMatterContext.billingArrangements)
    }
  }, [mockMatterContext])

  useEffect(() => {
    setContextDocuments(mockContextDocuments)
  }, [mockContextDocuments])

  useEffect(() => {
    setTimekeepers(mockTimekeepers)
  }, [mockTimekeepers])

  useEffect(() => {
    setOtherParticipants(mockOtherParticipants)
  }, [mockOtherParticipants])

  const handleAddArrangement = () => {
    if (newArrangement.trim()) {
      setBillingArrangements([...billingArrangements, newArrangement])
      setNewArrangement("")
    }
  }

  const handleRemoveArrangement = (index: number) => {
    setBillingArrangements(billingArrangements.filter((_, i) => i !== index))
  }

  const handleSaveContext = () => {
    setIsEditingContext(false)
    // In a real app, this would save to a database
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure matter settings, team members, and billing information</p>
        </div>

        {/* Matter Context */}
        <SettingsSection title="Matter Context" description="Overview of this matter and associated documents">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Matter Name</label>
              <p className="text-lg font-semibold">{mockMatterContext?.name}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Description</label>
                {!isEditingContext && (
                  <button
                    onClick={() => setIsEditingContext(true)}
                    className="flex items-center gap-1 px-2 py-1 text-sm text-primary hover:bg-muted rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>
              {isEditingContext ? (
                <textarea
                  value={contextDescription}
                  onChange={(e) => setContextDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              ) : (
                <p className="text-muted-foreground">{contextDescription}</p>
              )}
            </div>

            {isEditingContext && (
              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleSaveContext}
                  className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditingContext(false)
                    setContextDescription(mockMatterContext?.description || "")
                  }}
                  className="flex items-center gap-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Context Documents */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Context Documents</h3>
              <button
                onClick={() => {/* TODO: Implement add document */}}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {contextDocuments.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.url}
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-primary"
                >
                  {doc.title}
                </a>
              ))}
            </div>
          </div>
        </SettingsSection>

        {/* Timekeepers */}
        <SettingsSection title="Timekeepers" description="Team members who can log time on this matter">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Name</th>
                    <th className="text-left px-4 py-3 font-semibold">Role</th>
                    <th className="text-left px-4 py-3 font-semibold">Billing Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {timekeepers.map((tk) => (
                    <tr key={tk.id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-3">{tk.name}</td>
                      <td className="px-4 py-3">{tk.role}</td>
                      <td className="px-4 py-3 font-medium">£{tk.billingRate}/hr</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => {/* TODO: Implement add timekeeper */}}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </SettingsSection>

        {/* Other Participants */}
        <SettingsSection title="Other Participants" description="Non-billing participants mentioned in time entries">
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 font-semibold">Name</th>
                    <th className="text-left px-4 py-3 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {otherParticipants.map((op) => (
                    <tr key={op.id} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-3">{op.name}</td>
                      <td className="px-4 py-3">{op.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => {/* TODO: Implement add participant */}}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </SettingsSection>

        {/* Billing Arrangements */}
        <SettingsSection
          title="Billing Arrangements"
          description="Logistical factors and terms that apply to this matter's billing"
        >
          <div className="space-y-3">
            {billingArrangements.map((arr, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">{arr}</span>
                <button
                  onClick={() => handleRemoveArrangement(index)}
                  className="text-destructive hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={newArrangement}
                onChange={(e) => setNewArrangement(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddArrangement()}
                placeholder="Add new arrangement..."
                className="flex-1 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleAddArrangement}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Add
              </button>
            </div>
          </div>
        </SettingsSection>
      </div>
    </main>
  )
}
