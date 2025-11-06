"use client"

import { useQuery } from "@tanstack/react-query"
import {
  TIMESHEET_DATA,
  BILLS_DATA,
  BILL_DOCUMENTS_DATA,
  TIMEKEEPERS_DATA,
  OTHER_PARTICIPANTS_DATA,
  CONTEXT_DOCUMENTS_DATA,
  MATTER_CONTEXT_DATA,
  AUTOMATION_RULES_DATA,
  MATTERS_DATA,
  DEFAULT_REVIEW_EMAIL_TEMPLATE,
  ISSUE_SECTION_CONFIGS_DATA,
  type TimesheetEntry,
  type Bill,
  type BillDocument,
  type Timekeeper,
  type OtherParticipant,
  type ContextDocument,
  type AutomationRule,
  type IssueSectionConfig,
} from "@/lib/mock-data"

export function useTimesheetData() {
  return useQuery({
    queryKey: ["timesheetData"],
    queryFn: async () => TIMESHEET_DATA,
  })
}

export function useBills() {
  return useQuery({
    queryKey: ["bills"],
    queryFn: async () => BILLS_DATA,
  })
}

export function useBillDocuments() {
  return useQuery({
    queryKey: ["billDocuments"],
    queryFn: async () => BILL_DOCUMENTS_DATA,
  })
}

export function useTimekeepers() {
  return useQuery({
    queryKey: ["timekeepers"],
    queryFn: async () => TIMEKEEPERS_DATA,
  })
}

export function useOtherParticipants() {
  return useQuery({
    queryKey: ["otherParticipants"],
    queryFn: async () => OTHER_PARTICIPANTS_DATA,
  })
}

export function useContextDocuments() {
  return useQuery({
    queryKey: ["contextDocuments"],
    queryFn: async () => CONTEXT_DOCUMENTS_DATA,
  })
}

export function useMatterContext() {
  return useQuery({
    queryKey: ["matterContext"],
    queryFn: async () => MATTER_CONTEXT_DATA,
  })
}

export function useAutomationRules() {
  return useQuery({
    queryKey: ["automationRules"],
    queryFn: async () => AUTOMATION_RULES_DATA,
  })
}

export function useMatters() {
  return useQuery({
    queryKey: ["matters"],
    queryFn: async () => MATTERS_DATA,
  })
}

export function useDefaultReviewEmailTemplate() {
  return useQuery({
    queryKey: ["defaultReviewEmailTemplate"],
    queryFn: async () => DEFAULT_REVIEW_EMAIL_TEMPLATE,
  })
}

export function useIssueSectionConfigs() {
  return useQuery({
    queryKey: ["issueSectionConfigs"],
    queryFn: async () => ISSUE_SECTION_CONFIGS_DATA,
  })
}
