export interface ActionLogEntry {
  message: string;
  timestamp: string;
  actor: string;
  undoable?: boolean;
}

export interface TimesheetEntry {
  id: string;
  date: string;
  timekeeper: string;
  duration: number;
  task: string;
  issue: string;
  suggestedTask?: string;
  actionLog?: ActionLogEntry[];
  billId?: string;
  awaitingAction?: boolean;
}

export const mockTimesheetData: TimesheetEntry[] = [
  // Insufficient Detail
  {
    id: "1",
    date: "2024-11-04",
    timekeeper: "Sarah Chen",
    duration: 2.5,
    task: "Work on project",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Sarah Chen",
        timestamp: "2024-11-04",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "2",
    date: "2024-11-03",
    timekeeper: "Marcus Johnson",
    duration: 1.5,
    task: "Meetings",
    suggestedTask: "Meeting with design team to discuss UI/UX improvements",
    issue: "insufficient-detail",
    billId: "bill-001",
    actionLog: [
      {
        message: "Email requesting clarification sent to Marcus Johnson.",
        timestamp: "2024-11-03",
        actor: "FixMyTime Agent",
      },
      {
        message: "Details received from Marcus Johnson, narrative re-drafted.",
        timestamp: "2024-11-03",
        actor: "FixMyTime Agent",
        undoable: true,
      },
    ],
  },
  {
    id: "3",
    date: "2024-11-02",
    timekeeper: "Emma Rodriguez",
    duration: 3,
    task: "Development",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Emma Rodriguez",
        timestamp: "2024-11-02",
        actor: "FixMyTime Agent",
      },
      {
        message: "Follow-up reminder sent",
        timestamp: "2024-11-03",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "14",
    date: "2024-11-01",
    timekeeper: "Alex Thompson",
    duration: 2.25,
    task: "Code review",
    issue: "insufficient-detail",
    billId: "bill-001",
    suggestedTask: "Code review of authentication module pull request",
    actionLog: [
      {
        message: "Email requesting clarification sent to Alex Thompson",
        timestamp: "2024-11-01",
        actor: "FixMyTime Agent",
      },
      {
        message: "AI-generated task description applied",
        timestamp: "2024-11-01",
        actor: "FixMyTime Agent",
        undoable: true,
      },
    ],
  },
  {
    id: "15",
    date: "2024-10-31",
    timekeeper: "Jordan Lee",
    duration: 1.75,
    task: "Testing phase",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Jordan Lee",
        timestamp: "2024-10-31",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "16",
    date: "2024-10-30",
    timekeeper: "Casey Wong",
    duration: 3.5,
    task: "API work",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Casey Wong",
        timestamp: "2024-10-30",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "17",
    date: "2024-10-29",
    timekeeper: "Morgan Smith",
    duration: 2,
    task: "Design collaboration",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Morgan Smith",
        timestamp: "2024-10-29",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "18",
    date: "2024-10-28",
    timekeeper: "Riley Davis",
    duration: 1.5,
    task: "Documentation update",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Riley Davis",
        timestamp: "2024-10-28",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "19",
    date: "2024-10-27",
    timekeeper: "Taylor Brown",
    duration: 2.75,
    task: "Client meeting prep",
    issue: "insufficient-detail",
    billId: "bill-001",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Taylor Brown",
        timestamp: "2024-10-27",
        actor: "FixMyTime Agent",
      },
    ],
  },
  {
    id: "20",
    date: "2024-10-26",
    timekeeper: "Harper Martin",
    duration: 1.25,
    task: "Infrastructure work",
    issue: "insufficient-detail",
    billId: "bill-002",
    awaitingAction: true,
    actionLog: [
      {
        message: "Email requesting clarification sent to Harper Martin",
        timestamp: "2024-10-26",
        actor: "FixMyTime Agent",
      },
    ],
  },

  // Poor Writing Style
  {
    id: "4",
    date: "2024-11-04",
    timekeeper: "James Liu",
    duration: 2,
    task: "Fixed authentification bug",
    issue: "poor-writing",
    billId: "bill-001",
    suggestedTask: "Fixed authentication bug",
  },
  {
    id: "5",
    date: "2024-11-01",
    timekeeper: "Priya Patel",
    duration: 1.75,
    task: "updated the client dashboard with new metrics",
    issue: "poor-writing",
    billId: "bill-001",
    suggestedTask: "Updated client dashboard with analytics metrics and charts",
  },
  {
    id: "6",
    date: "2024-10-31",
    timekeeper: "David Kim",
    duration: 2.25,
    task: "URGENT FIX NEEDED ASAP!!!",
    issue: "poor-writing",
    billId: "bill-001",
    suggestedTask: "Resolved critical payment processing error",
  },
  {
    id: "21",
    date: "2024-10-29",
    timekeeper: "Sam Johnson",
    duration: 1.5,
    task: "working on stuff",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Implemented user profile settings page",
  },
  {
    id: "22",
    date: "2024-10-28",
    timekeeper: "Alex Chen",
    duration: 2.5,
    task: "fixed some things idk",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Corrected responsive layout issues on mobile",
  },
  {
    id: "23",
    date: "2024-10-27",
    timekeeper: "Jordan Rivera",
    duration: 1.25,
    task: "doing the update thing",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Refined search algorithm and filters",
  },
  {
    id: "24",
    date: "2024-10-26",
    timekeeper: "Casey White",
    duration: 2,
    task: "SUPER IMPORTANT WORK!!!!!!",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Implemented data export functionality",
  },
  {
    id: "25",
    date: "2024-10-25",
    timekeeper: "Morgan Davis",
    duration: 1.75,
    task: "stuff and things",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Built notification system components",
  },
  {
    id: "26",
    date: "2024-10-24",
    timekeeper: "Riley Taylor",
    duration: 2.25,
    task: "whatever needs doin",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Completed API integration for third-party service",
  },
  {
    id: "27",
    date: "2024-10-23",
    timekeeper: "Harper Anderson",
    duration: 1.5,
    task: "thing thing thing",
    issue: "poor-writing",
    billId: "bill-002",
    suggestedTask: "Fixed authentication bug",
  },

  // Unusual Duration
  {
    id: "7",
    date: "2024-11-04",
    timekeeper: "Lisa Anderson",
    duration: 0.25,
    task: "Code review and feedback",
    issue: "unusual-duration",
    billId: "bill-001",
  },
  {
    id: "8",
    date: "2024-11-03",
    timekeeper: "Robert Taylor",
    duration: 7.5,
    task: "UI component library updates",
    issue: "unusual-duration",
    billId: "bill-001",
  },
  {
    id: "9",
    date: "2024-11-02",
    timekeeper: "Jennifer Martinez",
    duration: 0.5,
    task: "Database optimization",
    issue: "unusual-duration",
    billId: "bill-001",
  },
  {
    id: "10",
    date: "2024-10-31",
    timekeeper: "Christopher Brown",
    duration: 8,
    task: "API integration testing",
    issue: "unusual-duration",
    billId: "bill-001",
  },
  {
    id: "28",
    date: "2024-10-30",
    timekeeper: "Jordan Black",
    duration: 0.1,
    task: "Quick sync",
    issue: "unusual-duration",
    billId: "bill-002",
  },
  {
    id: "29",
    date: "2024-10-29",
    timekeeper: "Sam Garcia",
    duration: 6.5,
    task: "Full day sprint work",
    issue: "unusual-duration",
    billId: "bill-002",
  },
  {
    id: "30",
    date: "2024-10-28",
    timekeeper: "Alex Martinez",
    duration: 0.75,
    task: "Standup and planning",
    issue: "unusual-duration",
    billId: "bill-002",
  },
  {
    id: "31",
    date: "2024-10-27",
    timekeeper: "Casey Lee",
    duration: 7.25,
    task: "Extended debugging session",
    issue: "unusual-duration",
    billId: "bill-003",
  },
  {
    id: "32",
    date: "2024-10-26",
    timekeeper: "Morgan White",
    duration: 0.33,
    task: "Email sync",
    issue: "unusual-duration",
    billId: "bill-003",
  },
  {
    id: "33",
    date: "2024-10-25",
    timekeeper: "Riley Chen",
    duration: 5.75,
    task: "Feature implementation",
    issue: "unusual-duration",
    billId: "bill-003",
  },

  // Missing Information
  {
    id: "11",
    date: "2024-11-04",
    timekeeper: "Amanda White",
    duration: 2,
    task: "Client project work",
    issue: "missing-info",
    billId: "bill-001",
  },
  {
    id: "12",
    date: "2024-11-02",
    timekeeper: "Kevin Davis",
    duration: 3.5,
    task: "Strategic planning",
    issue: "missing-info",
    billId: "bill-001",
  },
  {
    id: "13",
    date: "2024-10-29",
    timekeeper: "Nicole Thompson",
    duration: 1.5,
    task: "Team collaboration",
    issue: "missing-info",
    billId: "bill-001",
  },
  {
    id: "34",
    date: "2024-10-28",
    timekeeper: "Jordan Wilson",
    duration: 2.25,
    task: "Project coordination",
    issue: "missing-info",
    billId: "bill-003",
  },
  {
    id: "35",
    date: "2024-10-27",
    timekeeper: "Sam Anderson",
    duration: 1.75,
    task: "Stakeholder meeting",
    issue: "missing-info",
    billId: "bill-003",
  },
  {
    id: "36",
    date: "2024-10-26",
    timekeeper: "Alex Johnson",
    duration: 3,
    task: "Workshop attendance",
    issue: "missing-info",
    billId: "bill-003",
  },
  {
    id: "37",
    date: "2024-10-25",
    timekeeper: "Casey Robinson",
    duration: 2.5,
    task: "Process review",
    issue: "missing-info",
    billId: "bill-003",
  },
  {
    id: "38",
    date: "2024-10-24",
    timekeeper: "Morgan Green",
    duration: 1.5,
    task: "Team sync session",
    issue: "missing-info",
    billId: "bill-003",
  },
  {
    id: "39",
    date: "2024-10-23",
    timekeeper: "Riley Martinez",
    duration: 2.75,
    task: "Budget planning",
    issue: "missing-info",
    billId: "bill-003",
  },
  {
    id: "40",
    date: "2024-10-22",
    timekeeper: "Harper Thompson",
    duration: 1.25,
    task: "Resource allocation",
    issue: "missing-info",
    billId: "bill-003",
  },
];

export interface Bill {
  id: string;
  matter: string;
  period: string;
  status: "Draft" | "Past";
  amount: number;
  entries: number;
  issues: number;
}

export interface BillDocument {
  id: string;
  title: string;
  type: string;
  reviewStatus: "no-review" | "pending" | "approved" | "changes-required";
  reviewers?: string[];
  feedback?: string;
  downloadUrl: string;
}

export const mockBillDocuments: BillDocument[] = [
  {
    id: "doc-1",
    title: "Cover Letter",
    type: "PDF",
    reviewStatus: "approved",
    reviewers: ["John Smith"],
    downloadUrl: "#",
  },
  {
    id: "doc-2",
    title: "Billing Summary",
    type: "Spreadsheet",
    reviewStatus: "pending",
    reviewers: ["Linda Garcia", "David Chen"],
    downloadUrl: "#",
  },
  {
    id: "doc-3",
    title: "Detailed Time Report",
    type: "PDF",
    reviewStatus: "changes-required",
    reviewers: ["John Smith"],
    feedback:
      "Please clarify the hours logged for administrative work. Some entries appear to lack detail.",
    downloadUrl: "#",
  },
  {
    id: "doc-4",
    title: "Expense Report",
    type: "Spreadsheet",
    reviewStatus: "no-review",
    downloadUrl: "#",
  },
];

export const mockBills: Bill[] = [
  {
    id: "bill-001",
    matter: "Project Blackstone",
    period: "October 2025",
    status: "Draft",
    amount: 12450,
    entries: 40,
    issues: 15,
  },
  {
    id: "bill-002",
    matter: "Project Blackstone",
    period: "September 2025",
    status: "Past",
    amount: 10200,
    entries: 35,
    issues: 0,
  },
  {
    id: "bill-003",
    matter: "Project Blackstone",
    period: "August 2025",
    status: "Past",
    amount: 9800,
    entries: 32,
    issues: 0,
  },
];

export interface Timekeeper {
  id: string;
  name: string;
  role: string;
  billingRate: number;
}

export interface OtherParticipant {
  id: string;
  name: string;
  role: string;
}

export interface ContextDocument {
  id: string;
  title: string;
  url: string;
}

export const mockTimekeepers: Timekeeper[] = [
  {
    id: "tk-1",
    name: "Sarah Chen",
    role: "Senior Associate",
    billingRate: 350,
  },
  { id: "tk-2", name: "Marcus Johnson", role: "Associate", billingRate: 250 },
  { id: "tk-3", name: "Emma Rodriguez", role: "Partner", billingRate: 450 },
  { id: "tk-4", name: "Alex Thompson", role: "Associate", billingRate: 250 },
  {
    id: "tk-5",
    name: "Jordan Lee",
    role: "Junior Associate",
    billingRate: 175,
  },
  {
    id: "tk-6",
    name: "Casey Wong",
    role: "Senior Associate",
    billingRate: 350,
  },
];

export const mockOtherParticipants: OtherParticipant[] = [
  { id: "op-1", name: "John Smith", role: "Client Contact" },
  { id: "op-2", name: "Linda Garcia", role: "Project Manager" },
  { id: "op-3", name: "David Chen", role: "Technical Lead" },
];

export const mockContextDocuments: ContextDocument[] = [
  { id: "cd-1", title: "Client Billing Guidelines", url: "#" },
  { id: "cd-2", title: "Project Scope Document", url: "#" },
  { id: "cd-3", title: "Rate Card 2025", url: "#" },
];

export const mockMatterContext = {
  id: "matter-001",
  name: "Project Blackstone",
  description:
    "Development and implementation of next-generation analytics platform for enterprise clients. Focus on scalability, security, and user experience optimization.",
  billingArrangements: [
    "Invoices payable within 14 days",
    "25% discount on administrative work",
    "Hourly billing with 0.25 hour minimum increments",
    "All expenses billed at cost plus 10%",
  ],
};

export interface AutomationRule {
  id: string;
  title: string;
  description: string;
  references: string[];
  steps: AutomationStep[];
}

export interface AutomationStep {
  number: string;
  description: string;
  code: string;
}

export const mockAutomationRules: AutomationRule[] = [
  {
    id: "rule-1",
    title: "Insufficient Detail",
    description:
      "Automatically detect and request clarification for entries lacking sufficient detail",
    references: ["Client Billing Guidelines", "Matter Context"],
    steps: [
      {
        number: "1",
        description: "Request Clarification from Time Keeper",
        code: `// Request clarification for insufficient detail
const entry = getTimeEntry(entryId);
if (entry.task.length < 20) {
  sendEmail(entry.timekeeper, {
    subject: 'Clarification Needed',
    body: 'Please provide more detail for your time entry.'
  });
  markForReview(entry, 'insufficient-detail');
}`,
      },
      {
        number: "1b",
        description: "Resend clarification request if unaddressed every 3 days",
        code: `// Scheduled job to resend requests
const unresolvedEntries = getUnresolvedEntries('insufficient-detail');
unresolvedEntries.forEach(entry => {
  if (daysSinceCreated(entry) % 3 === 0) {
    resendClarificationEmail(entry);
  }
});`,
      },
      {
        number: "2",
        description: "Rewrite Narrative to include clarification",
        code: `// Auto-rewrite with AI assistance
const clarification = await getTimekeeperResponse(entryId);
const improvedTask = await improveTaskDescription(
  entry.task,
  clarification
);
entry.suggestedTask = improvedTask;`,
      },
      {
        number: "3",
        description: "Raise for Approval",
        code: `// Submit for review
updateReviewStatus(entry, {
  status: 'pending-approval',
  suggestedText: entry.suggestedTask,
  originalText: entry.task
});`,
      },
    ],
  },
  {
    id: "rule-2",
    title: "Poor Writing Style",
    description:
      "Identify and improve poorly formatted or unclear time entry descriptions",
    references: ["Client Billing Guidelines", "Style Guide"],
    steps: [
      {
        number: "1",
        description: "Detect Poor Writing Quality",
        code: `// Analyze writing quality
const quality = analyzeWritingQuality(entry.task);
if (quality.score < 0.6) {
  flagEntry(entry, 'poor-writing');
}`,
      },
      {
        number: "2",
        description: "Generate Improved Version",
        code: `// Generate improved description
const improved = await generateImprovement(entry.task, {
  tone: 'professional',
  style: 'concise',
  maxLength: 100
});
entry.suggestedTask = improved;`,
      },
      {
        number: "3",
        description: "Notify Timekeeper and Request Approval",
        code: `// Send improvement suggestion
sendNotification(entry.timekeeper, {
  type: 'writing-improvement',
  original: entry.task,
  suggested: entry.suggestedTask,
  action: 'approve-or-edit'
});`,
      },
    ],
  },
  {
    id: "rule-3",
    title: "Unusual Duration",
    description: "Flag entries with atypical time durations for review",
    references: ["Matter Context", "Billing Guidelines"],
    steps: [
      {
        number: "1",
        description: "Analyze Duration Against Historical Data",
        code: `// Check if duration is unusual
const avgDuration = getAverageTaskDuration(entry.task);
const threshold = avgDuration * 1.5;
if (entry.duration > threshold) {
  flagEntry(entry, 'unusual-duration');
}`,
      },
      {
        number: "2",
        description: "Request Clarification or Adjustment",
        code: `// Send review request
sendReviewRequest(entry, {
  reason: 'Duration significantly higher than average',
  suggestedAction: 'Verify or split into multiple entries',
  averageDuration: avgDuration
});`,
      },
    ],
  },
];
