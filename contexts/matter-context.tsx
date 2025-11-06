"use client"
import { createContext, useContext, useState, type ReactNode } from "react"
import { mockMatterContext, mockMatters } from "@/lib/mock-data"

interface MatterContextType {
  currentMatterId: string
  currentMatterName: string
  currentMatterData: typeof mockMatterContext
  setCurrentMatter: (matterId: string) => void
}

const MatterContext = createContext<MatterContextType | undefined>(undefined)

export function MatterProvider({ children }: { children: ReactNode }) {
  // Default to the first matter (Project Blackstone)
  const [currentMatterId, setCurrentMatterId] = useState(mockMatters[0].id)
  
  const currentMatter = mockMatters.find((m) => m.id === currentMatterId) || mockMatters[0]
  
  const setCurrentMatter = (matterId: string) => {
    setCurrentMatterId(matterId)
  }

  return (
    <MatterContext.Provider
      value={{
        currentMatterId,
        currentMatterName: currentMatter.name,
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
