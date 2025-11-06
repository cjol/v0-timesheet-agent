import type {
  TimesheetEntry,
  Bill,
  BillDocument,
  Timekeeper,
  OtherParticipant,
  ContextDocument,
  AutomationRule,
  IssueSectionConfig,
} from "./mock-data"

// Alternate mock data for testing matter-specific data loading
// This data will be used for matter-002 (Anderson Corp Litigation)

export const TIMESHEET_DATA_ALT: TimesheetEntry[] = [
  // Insufficient Detail
  {
    id: "alt-1",
    date: "2024-11-05",
    timekeeper: "Patricia Williams",
    duration: 3.0,
    task: "Legal research",
    issue: "insufficient-detail",
    billId: "bill-alt-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Patricia Williams",
        timestamp: "2024-11-05",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "alt-2",
    date: "2024-11-04",
    timekeeper: "Robert Martinez",
    duration: 2.0,
    task: "Court prep",
    issue: "insufficient-detail",
    billId: "bill-alt-001",
    suggestedTask: "Preparation for motion hearing on summary judgment",
    actionLog: [
      {
        message: "Email requesting clarification sent to Robert Martinez",
        timestamp: "2024-11-04",
        actor: "FixMyTime Agent",
      },
      {
        message: "Details received from Robert Martinez, narrative re-drafted.",
        timestamp: "2024-11-04",
        actor: "FixMyTime Agent",
        undoable: true,
      },
    ],
  },
  {
    id: "alt-3",
    date: "2024-11-03",
    timekeeper: "Jennifer Lee",
    duration: 4.5,
    task: "Document review",
    issue: "insufficient-detail",
    billId: "bill-alt-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Jennifer Lee",
        timestamp: "2024-11-03",
        actor: "FixMyTime Agent",
      },
    ],
  },

  // Poor Writing Style
  {
    id: "alt-4",
    date: "2024-11-05",
    timekeeper: "Michael Chang",
    duration: 1.5,
    task: "fixed the contract stuff",
    issue: "poor-writing",
    billId: "bill-alt-001",
    suggestedTask: "Revised contract terms and conditions for client review",
  },
  {
    id: "alt-5",
    date: "2024-11-04",
    timekeeper: "Lisa Park",
    duration: 2.25,
    task: "URGENT!!! NEEDS REVIEW ASAP",
    issue: "poor-writing",
    billId: "bill-alt-001",
    suggestedTask: "Reviewed and revised settlement agreement draft",
  },
  {
    id: "alt-6",
    date: "2024-11-03",
    timekeeper: "David Kim",
    duration: 3.0,
    task: "did some research idk",
    issue: "poor-writing",
    billId: "bill-alt-001",
    suggestedTask: "Conducted legal research on employment law precedents",
  },

  // Unusual Duration
  {
    id: "alt-7",
    date: "2024-11-05",
    timekeeper: "Amanda Foster",
    duration: 0.25,
    task: "Quick email response",
    issue: "unusual-duration",
    billId: "bill-alt-001",
  },
  {
    id: "alt-8",
    date: "2024-11-04",
    timekeeper: "Thomas Wright",
    duration: 9.0,
    task: "Deposition preparation",
    issue: "unusual-duration",
    billId: "bill-alt-001",
  },

  // Missing Information
  {
    id: "alt-9",
    date: "2024-11-05",
    timekeeper: "Rachel Green",
    duration: 2.5,
    task: "Client meeting",
    issue: "missing-info",
    billId: "bill-alt-001",
  },
  {
    id: "alt-10",
    date: "2024-11-04",
    timekeeper: "Christopher Brown",
    duration: 1.75,
    task: "Case strategy",
    issue: "missing-info",
    billId: "bill-alt-001",
  },
];

export const BILLS_DATA_ALT: Bill[] = [
  {
    id: "bill-alt-001",
    matter: "Anderson Corp Litigation",
    period: "November 2025",
    status: "Draft",
    amount: 8750,
    entries: 10,
    issues: 6,
  },
  {
    id: "bill-alt-002",
    matter: "Anderson Corp Litigation",
    period: "October 2025",
    status: "Past",
    amount: 15200,
    entries: 18,
    issues: 0,
  },
];

export const BILL_DOCUMENTS_DATA_ALT: BillDocument[] = [
  {
    id: "doc-alt-1",
    billId: "bill-alt-001",
    title: "Cover Email",
    type: "HTML",
    downloadUrl: "#",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Anderson Corp Litigation - November 2025 Billing</h2>
        <p>Dear Mr. Anderson,</p>
        <p>Please find attached our billing summary for November 2025 related to the Anderson Corp Litigation matter.</p>
        <p>The total amount for this period is <strong>£8,750</strong>, covering 10 time entries from our team.</p>
        <p>Best regards,<br/>Patricia Williams<br/>Partner</p>
      </div>
    `,
    reviewHistory: [
      {
        id: "h-alt-1",
        type: "requested",
        timestamp: "2024-11-06T09:00:00Z",
        actor: "Patricia Williams",
        role: "Partner",
        reviewerName: "James Anderson",
        reviewerRole: "Client Contact",
      },
      {
        id: "h-alt-2",
        type: "approved",
        timestamp: "2024-11-06T15:00:00Z",
        actor: "James Anderson",
        role: "Client Contact",
        comment: "Approved for November billing.",
      },
    ],
  },
  {
    id: "doc-alt-2",
    billId: "bill-alt-001",
    title: "Billing Summary",
    type: "Spreadsheet",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-alt-3",
        type: "requested",
        timestamp: "2024-11-06T10:00:00Z",
        actor: "Patricia Williams",
        role: "Partner",
        reviewerName: "James Anderson",
        reviewerRole: "Client Contact",
      },
    ],
  },
];

export const TIMEKEEPERS_DATA_ALT: Timekeeper[] = [
  {
    id: "tk-alt-1",
    name: "Patricia Williams",
    role: "Partner",
    billingRate: 500,
  },
  { id: "tk-alt-2", name: "Robert Martinez", role: "Senior Associate", billingRate: 400 },
  { id: "tk-alt-3", name: "Jennifer Lee", role: "Associate", billingRate: 300 },
  { id: "tk-alt-4", name: "Michael Chang", role: "Associate", billingRate: 300 },
];

export const OTHER_PARTICIPANTS_DATA_ALT: OtherParticipant[] = [
  { id: "op-alt-1", name: "James Anderson", role: "Client Contact" },
  { id: "op-alt-2", name: "Susan Miller", role: "Legal Assistant" },
  { id: "op-alt-3", name: "Mark Thompson", role: "Paralegal" },
];

export const CONTEXT_DOCUMENTS_DATA_ALT: ContextDocument[] = [
  { id: "cd-alt-1", title: "Litigation Strategy Document", url: "#" },
  { id: "cd-alt-2", title: "Court Filing Guidelines", url: "#" },
  { id: "cd-alt-3", title: "Client Engagement Letter", url: "#" },
];

export const MATTER_CONTEXT_DATA_ALT = {
  id: "matter-002",
  name: "Anderson Corp Litigation",
  description:
    "Complex commercial litigation matter involving contract disputes and breach of fiduciary duty claims. Active case management and strategic legal representation.",
  billingArrangements: [
    "Invoices payable within 30 days",
    "Contingency fee arrangement for certain claims",
    "Hourly billing with 0.1 hour minimum increments",
    "Court filing fees billed separately",
  ],
};

export const AUTOMATION_RULES_DATA_ALT: AutomationRule[] = [
  {
    id: "rule-alt-1",
    title: "Insufficient Detail",
    description:
      "Automatically detect and request clarification for entries lacking sufficient detail",
    references: [
      {
        title: "Litigation Billing Guidelines",
        excerpt: "All time entries must include specific details about the legal work performed, including case strategy, document types reviewed, and court appearances."
      },
      {
        title: "Matter Context",
        excerpt: "Anderson Corp Litigation requires detailed time entries that clearly link to specific case activities, motions, and client communications."
      }
    ],
    steps: [
      {
        number: "1",
        description: "Request Clarification from Time Keeper",
        code: `// Request clarification for insufficient detail
const entry = getTimeEntry(entryId);
if (entry.task.length < 25) {
  sendEmail(entry.timekeeper, {
    subject: 'Clarification Needed',
    body: 'Please provide more detail for your time entry.'
  });
  markForReview(entry, 'insufficient-detail');
}`,
      },
    ],
  },
];

export const ISSUE_SECTION_CONFIGS_DATA_ALT: IssueSectionConfig[] = [
  {
    id: "insufficient-detail",
    title: "Insufficient Detail",
    description: "Entries lacking enough information to accurately bill or understand the work performed. Add more context to these entries.",
  },
  {
    id: "poor-writing",
    title: "Poor Writing Style",
    description: "Entries with unclear or poorly formatted descriptions that need improvement for client-facing invoices.",
  },
  {
    id: "unusual-duration",
    title: "Unusual Duration",
    description: "Entries with time durations that are unusually short or long compared to similar tasks.",
  },
  {
    id: "missing-info",
    title: "Missing Information",
    description: "Entries missing critical fields such as case number, client reference, or task category.",
  },
];

