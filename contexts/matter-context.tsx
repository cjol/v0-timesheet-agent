"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useMatters, useMatterContext as useMatterContextData } from "@/lib/hooks"

interface MatterContextType {
  currentMatterId: string
  currentMatterName: string
  currentMatterData: ReturnType<typeof useMatterContextData>["data"]
  setCurrentMatter: (matterId: string) => void
}

const MatterContext = createContext<MatterContextType | undefined>(undefined)

export function MatterProvider({ children }: { children: ReactNode }) {
  const { data: mockMatters = [] } = useMatters()
  const { data: mockMatterContext } = useMatterContextData()
  
  // Default to the first matter (Project Blackstone)
  const [currentMatterId, setCurrentMatterId] = useState(mockMatters[0]?.id || "")
  
  useEffect(() => {
    if (mockMatters.length > 0 && !currentMatterId) {
      setCurrentMatterId(mockMatters[0].id)
    }
  }, [mockMatters, currentMatterId])
  
  const currentMatter = mockMatters.find((m) => m.id === currentMatterId) || mockMatters[0]
  
  const setCurrentMatter = (matterId: string) => {
    setCurrentMatterId(matterId)
  }

  return (
    <MatterContext.Provider
      value={{
        currentMatterId,
        currentMatterName: currentMatter?.name || "",
        currentMatterData: mockMatterContext, // In the future, this would be fetched based on matterId
        setCurrentMatter,
      }}
    >
      {children}
    </MatterContext.Provider>
  )
}

export function useMatter() {
  const context = useContext(MatterContext)
  if (context === undefined) {
    throw new Error("useMatter must be used within a MatterProvider")
  }
  return context
}
