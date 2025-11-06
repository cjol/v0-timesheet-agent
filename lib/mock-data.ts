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

export interface DocumentReviewer {
  name: string;
  role: string;
  status: "pending" | "approved" | "changes-required";
  feedback?: string;
}

export interface ReviewHistoryEvent {
  id: string;
  type: "requested" | "approved" | "changes-required" | "comment";
  timestamp: string;
  actor: string;
  role: string;
  comment?: string;
  reviewerName?: string; // For "requested" events: the person being asked to review
  reviewerRole?: string; // For "requested" events: the role of the person being asked to review
}

export interface BillDocument {
  id: string;
  billId: string;
  title: string;
  type: string;
  downloadUrl: string;
  reviewHistory: ReviewHistoryEvent[];
  htmlContent?: string; // For HTML documents that can be previewed
}

// Helper function to derive reviewer statuses from review history
export function getDocumentReviewers(doc: BillDocument): DocumentReviewer[] {
  const reviewerMap = new Map<string, DocumentReviewer>();

  // First pass: identify all requested reviewers
  doc.reviewHistory.forEach((event) => {
    if (
      event.type === "requested" &&
      event.reviewerName &&
      event.reviewerRole
    ) {
      if (!reviewerMap.has(event.reviewerName)) {
        reviewerMap.set(event.reviewerName, {
          name: event.reviewerName,
          role: event.reviewerRole,
          status: "pending",
        });
      }
    }
  });

  // Second pass: update statuses based on responses
  doc.reviewHistory.forEach((event) => {
    if (event.type === "approved" || event.type === "changes-required") {
      reviewerMap.set(event.actor, {
        name: event.actor,
        role: event.role,
        status: event.type === "approved" ? "approved" : "changes-required",
        feedback: event.comment,
      });
    }
  });

  return Array.from(reviewerMap.values());
}

// Helper function to get overall document review status
export function getDocumentReviewStatus(
  doc: BillDocument
): "no-review" | "pending" | "approved" | "changes-required" {
  if (doc.reviewHistory.length === 0) {
    return "no-review";
  }

  const reviewers = getDocumentReviewers(doc);

  if (reviewers.length === 0) {
    return "no-review";
  }

  // If any reviewer requested changes, overall status is "changes-required"
  if (reviewers.some((r) => r.status === "changes-required")) {
    return "changes-required";
  }

  // If all reviewers approved, overall status is "approved"
  if (reviewers.every((r) => r.status === "approved")) {
    return "approved";
  }

  // Otherwise, it's pending
  return "pending";
}

export const mockBillDocuments: BillDocument[] = [
  // Documents for bill-001 (October 2025 - Draft)
  {
    id: "doc-1-bill-001",
    billId: "bill-001",
    title: "Cover Email",
    type: "HTML",
    downloadUrl: "#",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Project Blackstone - October 2025 Billing</h2>
        <p>Dear John,</p>
        <p>Please find attached our billing summary for October 2025 related to Project Blackstone.</p>
        <p>This month's work focused on:</p>
        <ul>
          <li>Development and implementation of the analytics dashboard</li>
          <li>Security enhancements and compliance reviews</li>
          <li>Client consultation sessions</li>
          <li>Technical documentation updates</li>
        </ul>
        <p>The total amount for this period is <strong>£12,450</strong>, covering 40 time entries from our team.</p>
        <p>Should you have any questions regarding the enclosed documentation, please don't hesitate to reach out.</p>
        <p>Best regards,<br/>Sarah Chen<br/>Senior Associate</p>
      </div>
    `,
    reviewHistory: [
      {
        id: "h-1",
        type: "requested",
        timestamp: "2024-11-01T09:00:00Z",
        actor: "Sarah Chen",
        role: "Senior Associate",
        reviewerName: "John Smith",
        reviewerRole: "Client Contact",
      },
      {
        id: "h-1b",
        type: "requested",
        timestamp: "2024-11-01T09:00:00Z",
        actor: "Sarah Chen",
        role: "Senior Associate",
        reviewerName: "Linda Graves",
        reviewerRole: "Project Manager",
      },
      {
        id: "h-2",
        type: "approved",
        timestamp: "2024-11-01T14:30:00Z",
        actor: "Linda Graves",
        role: "Project Manager",
        comment: "Looks good, approved.",
      },
      {
        id: "h-3",
        type: "approved",
        timestamp: "2024-11-02T10:15:00Z",
        actor: "John Smith",
        role: "Client Contact",
        comment: "All set from my end.",
      },
    ],
  },
  {
    id: "doc-2-bill-001",
    billId: "bill-001",
    title: "Billing Summary",
    type: "Spreadsheet",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-4",
        type: "requested",
        timestamp: "2024-11-02T11:00:00Z",
        actor: "Sarah Chen",
        role: "Senior Associate",
        reviewerName: "John Smith",
        reviewerRole: "Client Contact",
      },
      {
        id: "h-4b",
        type: "requested",
        timestamp: "2024-11-02T11:00:00Z",
        actor: "Sarah Chen",
        role: "Senior Associate",
        reviewerName: "Linda Graves",
        reviewerRole: "Project Manager",
      },
      {
        id: "h-4c",
        type: "requested",
        timestamp: "2024-11-02T11:00:00Z",
        actor: "Sarah Chen",
        role: "Senior Associate",
        reviewerName: "Amanda White",
        reviewerRole: "Finance Director",
      },
      {
        id: "h-4d",
        type: "requested",
        timestamp: "2024-11-02T11:00:00Z",
        actor: "Sarah Chen",
        role: "Senior Associate",
        reviewerName: "Nicole Thompson",
        reviewerRole: "Senior Partner",
      },
      {
        id: "h-5",
        type: "approved",
        timestamp: "2024-11-03T09:45:00Z",
        actor: "Amanda White",
        role: "Finance Director",
        comment: "Financial figures check out perfectly.",
      },
      {
        id: "h-6",
        type: "changes-required",
        timestamp: "2024-11-03T16:20:00Z",
        actor: "Nicole Thompson",
        role: "Senior Partner",
        comment: "Please break down the consulting fees more clearly.",
      },
    ],
  },
  {
    id: "doc-3-bill-001",
    billId: "bill-001",
    title: "Detailed Time Report",
    type: "PDF",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-7",
        type: "requested",
        timestamp: "2024-11-03T08:30:00Z",
        actor: "Marcus Johnson",
        role: "Associate",
        reviewerName: "John Smith",
        reviewerRole: "Client Contact",
      },
      {
        id: "h-8",
        type: "comment",
        timestamp: "2024-11-03T15:00:00Z",
        actor: "John Smith",
        role: "Client Contact",
        comment: "I'm reviewing this now, should have feedback by end of day.",
      },
      {
        id: "h-9",
        type: "changes-required",
        timestamp: "2024-11-04T11:30:00Z",
        actor: "John Smith",
        role: "Client Contact",
        comment:
          "Please clarify the hours logged for administrative work. Some entries appear to lack detail.",
      },
    ],
  },
  {
    id: "doc-4-bill-001",
    billId: "bill-001",
    title: "Expense Report",
    type: "Spreadsheet",
    downloadUrl: "#",
    reviewHistory: [],
  },

  // Documents for bill-002 (September 2025 - Past)
  {
    id: "doc-1-bill-002",
    billId: "bill-002",
    title: "Cover Email",
    type: "HTML",
    downloadUrl: "#",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Project Blackstone - September 2025 Billing</h2>
        <p>Dear Emily,</p>
        <p>Please find attached our billing summary for September 2025 related to Project Blackstone.</p>
        <p>The total amount for this period is <strong>£10,200</strong>, covering 35 time entries from our team.</p>
        <p>Best regards,<br/>Marcus Johnson<br/>Associate</p>
      </div>
    `,
    reviewHistory: [
      {
        id: "h-10",
        type: "requested",
        timestamp: "2024-10-01T09:00:00Z",
        actor: "Marcus Johnson",
        role: "Associate",
        reviewerName: "Emily Carter",
        reviewerRole: "Client Director",
      },
      {
        id: "h-11",
        type: "approved",
        timestamp: "2024-10-01T15:30:00Z",
        actor: "Emily Carter",
        role: "Client Director",
        comment: "Approved for September billing.",
      },
    ],
  },
  {
    id: "doc-2-bill-002",
    billId: "bill-002",
    title: "Billing Summary",
    type: "Spreadsheet",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-12",
        type: "requested",
        timestamp: "2024-10-01T10:00:00Z",
        actor: "Marcus Johnson",
        role: "Associate",
        reviewerName: "Emily Carter",
        reviewerRole: "Client Director",
      },
      {
        id: "h-13",
        type: "approved",
        timestamp: "2024-10-02T09:00:00Z",
        actor: "Emily Carter",
        role: "Client Director",
        comment: "Numbers look correct.",
      },
    ],
  },
  {
    id: "doc-3-bill-002",
    billId: "bill-002",
    title: "Detailed Time Report",
    type: "PDF",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-14",
        type: "requested",
        timestamp: "2024-10-01T11:00:00Z",
        actor: "Marcus Johnson",
        role: "Associate",
        reviewerName: "Emily Carter",
        reviewerRole: "Client Director",
      },
      {
        id: "h-15",
        type: "approved",
        timestamp: "2024-10-02T10:30:00Z",
        actor: "Emily Carter",
        role: "Client Director",
        comment: "Time entries are well documented.",
      },
    ],
  },

  // Documents for bill-003 (August 2025 - Past)
  {
    id: "doc-1-bill-003",
    billId: "bill-003",
    title: "Cover Email",
    type: "HTML",
    downloadUrl: "#",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Project Blackstone - August 2025 Billing</h2>
        <p>Dear Michael,</p>
        <p>Please find attached our billing summary for August 2025 related to Project Blackstone.</p>
        <p>The total amount for this period is <strong>£9,800</strong>, covering 32 time entries from our team.</p>
        <p>Best regards,<br/>Emma Rodriguez<br/>Partner</p>
      </div>
    `,
    reviewHistory: [
      {
        id: "h-16",
        type: "requested",
        timestamp: "2024-09-01T09:00:00Z",
        actor: "Emma Rodriguez",
        role: "Partner",
        reviewerName: "Michael Brown",
        reviewerRole: "Finance Manager",
      },
      {
        id: "h-17",
        type: "approved",
        timestamp: "2024-09-01T16:00:00Z",
        actor: "Michael Brown",
        role: "Finance Manager",
        comment: "Approved for August billing period.",
      },
    ],
  },
  {
    id: "doc-2-bill-003",
    billId: "bill-003",
    title: "Billing Summary",
    type: "Spreadsheet",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-18",
        type: "requested",
        timestamp: "2024-09-01T10:00:00Z",
        actor: "Emma Rodriguez",
        role: "Partner",
        reviewerName: "Michael Brown",
        reviewerRole: "Finance Manager",
      },
      {
        id: "h-19",
        type: "approved",
        timestamp: "2024-09-02T08:45:00Z",
        actor: "Michael Brown",
        role: "Finance Manager",
        comment: "Financial summary approved.",
      },
    ],
  },
  {
    id: "doc-3-bill-003",
    billId: "bill-003",
    title: "Detailed Time Report",
    type: "PDF",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-20",
        type: "requested",
        timestamp: "2024-09-01T11:00:00Z",
        actor: "Emma Rodriguez",
        role: "Partner",
        reviewerName: "Michael Brown",
        reviewerRole: "Finance Manager",
      },
      {
        id: "h-21",
        type: "approved",
        timestamp: "2024-09-02T11:15:00Z",
        actor: "Michael Brown",
        role: "Finance Manager",
        comment: "Time report reviewed and approved.",
      },
    ],
  },
  {
    id: "doc-4-bill-003",
    billId: "bill-003",
    title: "Expense Report",
    type: "Spreadsheet",
    downloadUrl: "#",
    reviewHistory: [
      {
        id: "h-22",
        type: "requested",
        timestamp: "2024-09-01T12:00:00Z",
        actor: "Emma Rodriguez",
        role: "Partner",
        reviewerName: "Michael Brown",
        reviewerRole: "Finance Manager",
      },
      {
        id: "h-23",
        type: "approved",
        timestamp: "2024-09-02T14:00:00Z",
        actor: "Michael Brown",
        role: "Finance Manager",
        comment: "All expenses properly documented.",
      },
    ],
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

export interface AutomationReference {
  title: string;
  excerpt: string;
}

export interface AutomationRule {
  id: string;
  title: string;
  description: string;
  references: AutomationReference[];
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
    references: [
      {
        title: "Client Billing Guidelines",
        excerpt: "All time entries must include specific details about the work performed, including the task objective, key activities undertaken, and any deliverables produced. Vague descriptions such as 'meetings' or 'work on project' are not acceptable."
      },
      {
        title: "Matter Context",
        excerpt: "Project Blackstone requires detailed time entries that clearly link to specific project deliverables and milestones. Each entry should reference the relevant component or feature being developed."
      }
    ],
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
    references: [
      {
        title: "Client Billing Guidelines",
        excerpt: "Time entries should be written in professional business language, free from colloquialisms, excessive capitalization, or informal abbreviations. Use proper grammar and punctuation throughout."
      },
      {
        title: "Style Guide",
        excerpt: "Maintain a consistent, professional tone across all billing narratives. Avoid first-person pronouns, use active voice, and ensure all technical terms are properly capitalized and spelled correctly."
      }
    ],
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
    references: [
      {
        title: "Matter Context",
        excerpt: "Typical task durations for Project Blackstone range from 1-4 hours. Tasks requiring significantly more or less time should be reviewed to ensure accurate billing and appropriate task breakdown."
      },
      {
        title: "Billing Guidelines",
        excerpt: "Time entries must be recorded in 0.25 hour (15-minute) increments. Unusually short entries (less than 0.5 hours) or lengthy entries (more than 6 hours) require additional justification and review."
      }
    ],
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
