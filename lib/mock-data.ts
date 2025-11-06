import projectBlackstoneData from "@/data/project-blackstone.json"

export type TimesheetIssue = "insufficient-detail" | "poor-writing" | "unusual-duration" | "missing-info"

export interface ActionLogEntry {
  message: string
  timestamp: string
  actor: string
  undoable?: boolean
}

export interface TimesheetEntry {
  id: string
  date: string
  timekeeper: string
  duration: number
  task: string
  issue: TimesheetIssue
  suggestedTask?: string
  actionLog?: ActionLogEntry[]
}

export interface BillDocument {
  id: string
  title: string
  type: string
  reviewStatus: "no-review" | "pending" | "approved" | "changes-required"
  reviewers?: string[]
  feedback?: string
  downloadUrl: string
}

export interface BillSummary {
  id: string
  matterId: string
  matter: string
  period: string
  status: "Draft" | "Past"
  amount: number
  entries: number
  issues: number
}

export interface Bill extends BillSummary {
  documents?: BillDocument[]
  participantIds?: string[]
  timesheetEntryIds?: string[]
}

export interface Timekeeper {
  id: string
  name: string
  role: string
  billingRate: number
}

export interface OtherParticipant {
  id: string
  name: string
  role: string
}

export interface ContextDocument {
  id: string
  title: string
  url: string
}

export interface MatterContext {
  id: string
  name: string
  description: string
  billingArrangements: string[]
}

export interface MatterOption {
  id: string
  name: string
}

export interface AutomationStep {
  number: string
  description: string
  code: string
}

export interface AutomationRule {
  id: string
  title: string
  description: string
  references: string[]
  steps: AutomationStep[]
}

interface ProjectBlackstoneData {
  matter: MatterContext
  matterOptions: MatterOption[]
  timekeepers: Timekeeper[]
  otherParticipants: OtherParticipant[]
  contextDocuments: ContextDocument[]
  bills: Bill[]
  timesheetEntries: TimesheetEntry[]
  automationRules: AutomationRule[]
}

const data = projectBlackstoneData as ProjectBlackstoneData

const bills = data.bills

export const mockMatterContext = data.matter
export const mockMatterOptions = data.matterOptions
export const mockTimekeepers = data.timekeepers
export const mockOtherParticipants = data.otherParticipants
export const mockContextDocuments = data.contextDocuments
export const mockAutomationRules = data.automationRules
export const mockTimesheetData = data.timesheetEntries

export const mockBills: BillSummary[] = bills.map(({ documents, participantIds, timesheetEntryIds, ...summary }) => summary)

const billDetailMap = new Map<string, Bill>(bills.map((bill) => [bill.id, bill]))

export const mockBillDetail = billDetailMap.get("bill-001")
export const mockBillDocuments = mockBillDetail?.documents ?? []

export function getBillDetail(billId: string): Bill | undefined {
  return billDetailMap.get(billId)
}
