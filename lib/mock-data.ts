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
    actionLog: [
      {
        message: "Email requesting clarification sent to Sarah Chen",
        timestamp: "2024-11-04",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Marcus Johnson.",
        timestamp: "2024-11-03",
        actor: "FixMyTimeAgent",
      },
      {
        message: "Details received from Marcus Johnson, narrative re-drafted.",
        timestamp: "2024-11-03",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Emma Rodriguez",
        timestamp: "2024-11-02",
        actor: "FixMyTimeAgent",
      },
      {
        message: "Follow-up reminder sent",
        timestamp: "2024-11-03",
        actor: "FixMyTimeAgent",
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
    suggestedTask: "Code review of authentication module pull request",
    actionLog: [
      {
        message: "Email requesting clarification sent to Alex Thompson",
        timestamp: "2024-11-01",
        actor: "FixMyTimeAgent",
      },
      {
        message: "AI-generated task description applied",
        timestamp: "2024-11-01",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Jordan Lee",
        timestamp: "2024-10-31",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Casey Wong",
        timestamp: "2024-10-30",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Morgan Smith",
        timestamp: "2024-10-29",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Riley Davis",
        timestamp: "2024-10-28",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Taylor Brown",
        timestamp: "2024-10-27",
        actor: "FixMyTimeAgent",
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
    actionLog: [
      {
        message: "Email requesting clarification sent to Harper Martin",
        timestamp: "2024-10-26",
        actor: "FixMyTimeAgent",
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
    suggestedTask: "Fixed authentication bug",
  },
  {
    id: "5",
    date: "2024-11-01",
    timekeeper: "Priya Patel",
    duration: 1.75,
    task: "updated the client dashboard with new metrics",
    issue: "poor-writing",
    suggestedTask: "Updated client dashboard with analytics metrics and charts",
  },
  {
    id: "6",
    date: "2024-10-31",
    timekeeper: "David Kim",
    duration: 2.25,
    task: "URGENT FIX NEEDED ASAP!!!",
    issue: "poor-writing",
    suggestedTask: "Resolved critical payment processing error",
  },
  {
    id: "21",
    date: "2024-10-29",
    timekeeper: "Sam Johnson",
    duration: 1.5,
    task: "working on stuff",
    issue: "poor-writing",
    suggestedTask: "Implemented user profile settings page",
  },
  {
    id: "22",
    date: "2024-10-28",
    timekeeper: "Alex Chen",
    duration: 2.5,
    task: "fixed some things idk",
    issue: "poor-writing",
    suggestedTask: "Corrected responsive layout issues on mobile",
  },
  {
    id: "23",
    date: "2024-10-27",
    timekeeper: "Jordan Rivera",
    duration: 1.25,
    task: "doing the update thing",
    issue: "poor-writing",
    suggestedTask: "Updated dependencies and security patches",
  },
  {
    id: "24",
    date: "2024-10-26",
    timekeeper: "Casey White",
    duration: 2,
    task: "SUPER IMPORTANT WORK!!!!!!",
    issue: "poor-writing",
    suggestedTask: "Implemented data export functionality",
  },
  {
    id: "25",
    date: "2024-10-25",
    timekeeper: "Morgan Davis",
    duration: 1.75,
    task: "stuff and things",
    issue: "poor-writing",
    suggestedTask: "Refined search algorithm and filters",
  },
  {
    id: "26",
    date: "2024-10-24",
    timekeeper: "Riley Taylor",
    duration: 2.25,
    task: "whatever needs doin",
    issue: "poor-writing",
    suggestedTask: "Completed API integration for third-party service",
  },
  {
    id: "27",
    date: "2024-10-23",
    timekeeper: "Harper Anderson",
    duration: 1.5,
    task: "thing thing thing",
    issue: "poor-writing",
    suggestedTask: "Built notification system components",
  },

  // Unusual Duration
  {
    id: "7",
    date: "2024-11-04",
    timekeeper: "Lisa Anderson",
    duration: 0.25,
    task: "Code review and feedback",
    issue: "unusual-duration",
  },
  {
    id: "8",
    date: "2024-11-03",
    timekeeper: "Robert Taylor",
    duration: 7.5,
    task: "UI component library updates",
    issue: "unusual-duration",
  },
  {
    id: "9",
    date: "2024-11-02",
    timekeeper: "Jennifer Martinez",
    duration: 0.5,
    task: "Database optimization",
    issue: "unusual-duration",
  },
  {
    id: "10",
    date: "2024-10-31",
    timekeeper: "Christopher Brown",
    duration: 8,
    task: "API integration testing",
    issue: "unusual-duration",
  },
  {
    id: "28",
    date: "2024-10-30",
    timekeeper: "Jordan Black",
    duration: 0.1,
    task: "Quick sync",
    issue: "unusual-duration",
  },
  {
    id: "29",
    date: "2024-10-29",
    timekeeper: "Sam Garcia",
    duration: 6.5,
    task: "Full day sprint work",
    issue: "unusual-duration",
  },
  {
    id: "30",
    date: "2024-10-28",
    timekeeper: "Alex Martinez",
    duration: 0.75,
    task: "Standup and planning",
    issue: "unusual-duration",
  },
  {
    id: "31",
    date: "2024-10-27",
    timekeeper: "Casey Lee",
    duration: 7.25,
    task: "Extended debugging session",
    issue: "unusual-duration",
  },
  {
    id: "32",
    date: "2024-10-26",
    timekeeper: "Morgan White",
    duration: 0.33,
    task: "Email sync",
    issue: "unusual-duration",
  },
  {
    id: "33",
    date: "2024-10-25",
    timekeeper: "Riley Chen",
    duration: 5.75,
    task: "Feature implementation",
    issue: "unusual-duration",
  },

  // Missing Information
  {
    id: "11",
    date: "2024-11-04",
    timekeeper: "Amanda White",
    duration: 2,
    task: "Client project work",
    issue: "missing-info",
  },
  {
    id: "12",
    date: "2024-11-02",
    timekeeper: "Kevin Davis",
    duration: 3.5,
    task: "Strategic planning",
    issue: "missing-info",
  },
  {
    id: "13",
    date: "2024-10-29",
    timekeeper: "Nicole Thompson",
    duration: 1.5,
    task: "Team collaboration",
    issue: "missing-info",
  },
  {
    id: "34",
    date: "2024-10-28",
    timekeeper: "Jordan Wilson",
    duration: 2.25,
    task: "Project coordination",
    issue: "missing-info",
  },
  {
    id: "35",
    date: "2024-10-27",
    timekeeper: "Sam Anderson",
    duration: 1.75,
    task: "Stakeholder meeting",
    issue: "missing-info",
  },
  {
    id: "36",
    date: "2024-10-26",
    timekeeper: "Alex Johnson",
    duration: 3,
    task: "Workshop attendance",
    issue: "missing-info",
  },
  {
    id: "37",
    date: "2024-10-25",
    timekeeper: "Casey Robinson",
    duration: 2.5,
    task: "Process review",
    issue: "missing-info",
  },
  {
    id: "38",
    date: "2024-10-24",
    timekeeper: "Morgan Green",
    duration: 1.5,
    task: "Team sync session",
    issue: "missing-info",
  },
  {
    id: "39",
    date: "2024-10-23",
    timekeeper: "Riley Martinez",
    duration: 2.75,
    task: "Budget planning",
    issue: "missing-info",
  },
  {
    id: "40",
    date: "2024-10-22",
    timekeeper: "Harper Thompson",
    duration: 1.25,
    task: "Resource allocation",
    issue: "missing-info",
  },
];
