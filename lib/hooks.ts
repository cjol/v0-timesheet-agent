"use client";

import { useQuery } from "@tanstack/react-query";
import {
  TIMESHEET_DATA,
  BILLS_DATA,
  getBillDocumentsData,
  TIMEKEEPERS_DATA,
  OTHER_PARTICIPANTS_DATA,
  CONTEXT_DOCUMENTS_DATA,
  MATTER_CONTEXT_DATA,
  AUTOMATION_RULES_DATA,
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
  MATTERS_DATA,
} from "@/lib/mock-data";
import {
  TIMESHEET_DATA_ALT,
  BILLS_DATA_ALT,
  BILL_DOCUMENTS_DATA_ALT,
  TIMEKEEPERS_DATA_ALT,
  OTHER_PARTICIPANTS_DATA_ALT,
  CONTEXT_DOCUMENTS_DATA_ALT,
  MATTER_CONTEXT_DATA_ALT,
  AUTOMATION_RULES_DATA_ALT,
  ISSUE_SECTION_CONFIGS_DATA_ALT,
} from "@/lib/mock-data-alt";

// Helper function to determine if we should use alternate data
function shouldUseAltData(matterId: string): boolean {
  return matterId === "matter-002";
}

export function useTimesheetData(matterId: string) {
  return useQuery({
    queryKey: ["timesheetData", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId) ? TIMESHEET_DATA_ALT : TIMESHEET_DATA,
  });
}

export function useBills(matterId: string) {
  return useQuery({
    queryKey: ["bills", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId) ? BILLS_DATA_ALT : BILLS_DATA,
  });
}

export function useBillDocuments(matterId: string) {
  return useQuery({
    queryKey: ["billDocuments", matterId],
    queryFn: async () => {
      if (shouldUseAltData(matterId)) {
        return BILL_DOCUMENTS_DATA_ALT;
      }
      // Get matter name from matter context
      const matterContext = MATTER_CONTEXT_DATA;
      return getBillDocumentsData(matterContext.name);
    },
  });
}

export function useTimekeepers(matterId: string) {
  return useQuery({
    queryKey: ["timekeepers", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId) ? TIMEKEEPERS_DATA_ALT : TIMEKEEPERS_DATA,
  });
}

export function useOtherParticipants(matterId: string) {
  return useQuery({
    queryKey: ["otherParticipants", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId)
        ? OTHER_PARTICIPANTS_DATA_ALT
        : OTHER_PARTICIPANTS_DATA,
  });
}

export function useContextDocuments(matterId: string) {
  return useQuery({
    queryKey: ["contextDocuments", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId)
        ? CONTEXT_DOCUMENTS_DATA_ALT
        : CONTEXT_DOCUMENTS_DATA,
  });
}

export function useMatterContext(matterId: string) {
  return useQuery({
    queryKey: ["matterContext", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId)
        ? MATTER_CONTEXT_DATA_ALT
        : MATTER_CONTEXT_DATA,
  });
}

export function useAutomationRules(matterId: string) {
  return useQuery({
    queryKey: ["automationRules", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId)
        ? AUTOMATION_RULES_DATA_ALT
        : AUTOMATION_RULES_DATA,
  });
}

export function useMatters() {
  return useQuery({
    queryKey: ["matters"],
    queryFn: async () => MATTERS_DATA,
  });
}

export function useDefaultReviewEmailTemplate() {
  return useQuery({
    queryKey: ["defaultReviewEmailTemplate"],
    queryFn: async () => DEFAULT_REVIEW_EMAIL_TEMPLATE,
  });
}

export function useIssueSectionConfigs(matterId: string) {
  return useQuery({
    queryKey: ["issueSectionConfigs", matterId],
    queryFn: async () =>
      shouldUseAltData(matterId)
        ? ISSUE_SECTION_CONFIGS_DATA_ALT
        : ISSUE_SECTION_CONFIGS_DATA,
  });
}
