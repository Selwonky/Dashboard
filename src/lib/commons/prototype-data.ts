// Jo from PLG — clickable prototype mock data (local only, no backend).
// All data is FIXTURE / fictitious. No NAICS codes, no Labor Map, no MCP labels.

export type StatusKind =
  | "neutral"
  | "in_progress"
  | "scheduled"
  | "attention"
  | "failed"
  | "done";

export type ObjectType =
  | "prospect"
  | "research_brief"
  | "outreach_draft"
  | "proposal"
  | "engagement"
  | "checklist"
  | "status_report"
  | "content_draft"
  | "campaign"
  | "invoice"
  | "agreement"
  | "sprint"
  | "ticket"
  | "contract"
  | "signal"
  | "workflow"
  | "task"
  | "note";

export type DepartmentId =
  | "sales"
  | "marketing"
  | "workforce"
  | "finance"
  | "technology"
  | "support"
  | "accounting"
  | "operations"
  | "legal";

export interface Department {
  id: DepartmentId;
  label: string;
  summary: string;
  activeCount: number;
  needsApprovalCount: number;
  status: "active" | "quiet";
  rich: boolean; // Customer Zero rich view
}

export interface WorkObject {
  id: string;
  type: ObjectType;
  typeLabel: string;
  department: DepartmentId;
  title: string;
  statusLabel: string;
  statusKind: StatusKind;
  owner: string;
  nextAction?: string;
  dueAt?: string;
  preview: string;
  meta?: { label: string; value: string }[];
  body?: string; // detail body
}

export interface InboxItem {
  id: string;
  department: DepartmentId;
  title: string;
  objectTitle: string;
  objectId: string;
  priority: "high" | "medium" | "low";
  dueAt: string;
  statusKind: StatusKind;
  statusLabel: string;
  preview: string;
}

export type ActionStatus =
  | "draft"
  | "queued"
  | "running"
  | "needs_approval"
  | "completed"
  | "failed"
  | "cancelled";

export interface QueueAction {
  id: string;
  title: string;
  department: DepartmentId;
  status: ActionStatus;
  sourceObjectId?: string;
  updatedAt: string;
}

export interface OutputRecord {
  id: string;
  title: string;
  type: string;
  department: DepartmentId;
  generatedBy: string;
  statusKind: StatusKind;
  statusLabel: string;
  timestamp: string;
  history: string[];
}

export interface OrgJob {
  id: string;
  title: string;
  level: "IC" | "Team Lead" | "Manager" | "Head of";
  subFamily: string;
  tasks: string[];
  workflowSeeds: { name: string; outputPreview: string }[];
}

export interface OrgDepartment {
  id: DepartmentId;
  label: string;
  jobs: OrgJob[];
}

export type ToolStatus = "connected" | "not_connected" | "backend";
export interface ToolConn {
  id: string;
  label: string;
  status: ToolStatus;
  note: string;
  why: string;
}

export interface IndustryMatch {
  id: string;
  label: string;
  confidence: number; // 0..1, shown as a soft hint only, never a code
  workAreas: string[];
}

// ── statusKind → Badge variant (object-card contract spec §2.2) ──
export const statusVariant: Record<
  StatusKind,
  "secondary" | "info" | "outline" | "warning" | "destructive" | "success"
> = {
  neutral: "secondary",
  in_progress: "info",
  scheduled: "outline",
  attention: "warning",
  failed: "destructive",
  done: "success",
};

export const actionStatusKind: Record<ActionStatus, StatusKind> = {
  draft: "neutral",
  queued: "scheduled",
  running: "in_progress",
  needs_approval: "attention",
  completed: "done",
  failed: "failed",
  cancelled: "neutral",
};

export const actionStatusLabel: Record<ActionStatus, string> = {
  draft: "Draft",
  queued: "Queued",
  running: "Running",
  needs_approval: "Needs approval",
  completed: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
};

// ─────────────────────────────── Departments ───────────────────────────────
export const departments: Department[] = [
  { id: "sales", label: "Sales", summary: "Find, qualify, and close new Jo from engagements.", activeCount: 4, needsApprovalCount: 2, status: "active", rich: true },
  { id: "operations", label: "Operations", summary: "Deliver client engagements, staffing, and governance.", activeCount: 2, needsApprovalCount: 1, status: "active", rich: true },
  { id: "marketing", label: "Marketing", summary: "Generate demand through content, search, and brand presence.", activeCount: 3, needsApprovalCount: 1, status: "active", rich: true },
  { id: "finance", label: "Finance", summary: "Manage invoices, collections, cash flow, and reporting.", activeCount: 2, needsApprovalCount: 2, status: "active", rich: true },
  { id: "workforce", label: "Workforce", summary: "Hiring, onboarding, contractor relationships, and coordination.", activeCount: 2, needsApprovalCount: 0, status: "active", rich: true },
  { id: "technology", label: "Technology", summary: "Build and maintain Jo from (Customer Zero, internal).", activeCount: 5, needsApprovalCount: 0, status: "active", rich: true },
  { id: "legal", label: "Legal", summary: "Contracts, IP protection, entity compliance, and documents.", activeCount: 1, needsApprovalCount: 1, status: "active", rich: true },
  { id: "support", label: "Support", summary: "Resolve customer questions and keep engagements healthy.", activeCount: 0, needsApprovalCount: 0, status: "quiet", rich: false },
  { id: "accounting", label: "Accounting", summary: "Bookkeeping, reconciliation, and period close.", activeCount: 0, needsApprovalCount: 0, status: "quiet", rich: false },
];

// ─────────────────────────────── Work objects ──────────────────────────────
export const workObjects: WorkObject[] = [
  // Sales
  { id: "obj_sales_acme", type: "prospect", typeLabel: "Prospect", department: "sales", title: "Acme Manufacturing", statusLabel: "Ready for review", statusKind: "attention", owner: "Jo from Sales Team Lead", nextAction: "Approve outreach draft", dueAt: "Today", preview: "Research brief and outreach draft ready for review.", meta: [{ label: "Stage", value: "Qualified · 10%" }, { label: "Contact", value: "Dana Reyes, VP Ops" }], body: "Acme Manufacturing is a 120-person precision-parts maker in Ohio. Jo from researched their site, recent hiring, and press, then drafted a first outreach email focused on reducing quote turnaround." },
  { id: "obj_sales_brief_acme", type: "research_brief", typeLabel: "Research Brief", department: "sales", title: "Acme Manufacturing — Research Brief", statusLabel: "Complete", statusKind: "done", owner: "Jo from Sales IC", preview: "Company profile, signals, and recommended angle.", meta: [{ label: "Sources", value: "Website, press, hiring" }], body: "Key signals: 3 new ops roles posted, new facility announced, quote-turnaround complaints in reviews. Recommended angle: speed-to-quote." },
  { id: "obj_sales_draft_acme", type: "outreach_draft", typeLabel: "Outreach Draft", department: "sales", title: "Acme Manufacturing — Outreach Email", statusLabel: "Needs approval", statusKind: "attention", owner: "Jo from Sales Team Lead", nextAction: "Approve to send", dueAt: "Today", preview: "First-touch email focused on quote turnaround.", body: "Hi Dana — noticed Acme is scaling ops with the new Dayton facility. Teams at your stage often lose deals to slow quotes; Jo from helps tighten quote turnaround without adding headcount. Worth a 20-min look?" },
  { id: "obj_sales_north", type: "prospect", typeLabel: "Prospect", department: "sales", title: "Northwind Logistics", statusLabel: "Researching", statusKind: "in_progress", owner: "Jo from Sales IC", preview: "Gathering signals before drafting outreach.", meta: [{ label: "Stage", value: "New" }] },
  { id: "obj_sales_summary", type: "status_report", typeLabel: "Weekly Summary", department: "sales", title: "Sales — Weekly Summary", statusLabel: "Draft", statusKind: "neutral", owner: "Jo from Sales Team Lead", preview: "4 active prospects, 2 awaiting approval." },

  // Operations
  { id: "obj_ops_foundry", type: "engagement", typeLabel: "Engagement", department: "operations", title: "Square One Foundry — Onboarding", statusLabel: "Ready for review", statusKind: "attention", owner: "Jo from Operations Team Lead", nextAction: "Approve kickoff checklist", dueAt: "Today", preview: "Kickoff checklist prepared and ready for approval.", meta: [{ label: "Phase", value: "Kickoff" }], body: "New engagement with Square One Foundry. Jo from assembled the kickoff checklist, drafted the welcome note, and scheduled the kickoff call." },
  { id: "obj_ops_checklist", type: "checklist", typeLabel: "Onboarding Checklist", department: "operations", title: "Square One Foundry — Kickoff Checklist", statusLabel: "Ready for review", statusKind: "attention", owner: "Jo from Operations IC", nextAction: "Approve", preview: "9 kickoff items prepared.", body: "1. Confirm point of contact 2. Share welcome packet 3. Schedule kickoff 4. Collect access 5. Define success metrics …" },
  { id: "obj_ops_status", type: "status_report", typeLabel: "Status Report", department: "operations", title: "Weekly Client Status — Square One Foundry", statusLabel: "Ready for review", statusKind: "attention", owner: "Jo from Operations Team Lead", nextAction: "Review & send", dueAt: "Tomorrow", preview: "On track. 2 deliverables shipped, 1 in progress.", body: "This week: shipped the data-mirror setup and the intake form. In progress: reporting view. No blockers. Next week: first automated weekly report." },

  // Marketing
  { id: "obj_mkt_li", type: "content_draft", typeLabel: "Content Draft", department: "marketing", title: "LinkedIn post — Friday", statusLabel: "Needs approval", statusKind: "attention", owner: "Jo from Marketing Team Lead", nextAction: "Approve / schedule", dueAt: "Fri", preview: "Short post on Human + Machine work for SMBs.", body: "Most small teams don't need more software — they need work to actually get done. Jo from puts a Human + Machine workspace where your operations already live. Here's what that looks like →" },
  { id: "obj_mkt_blog", type: "content_draft", typeLabel: "Content Draft", department: "marketing", title: "Blog — \"Operating workspace, not another dashboard\"", statusLabel: "Draft", statusKind: "neutral", owner: "Jo from Marketing IC", preview: "Long-form draft ready for first edit." },
  { id: "obj_mkt_campaign", type: "campaign", typeLabel: "Campaign", department: "marketing", title: "Q3 Demand — Field Services", statusLabel: "Scheduled", statusKind: "scheduled", owner: "Jo from Marketing Team Lead", preview: "3-week sequence targeting field-service operators.", meta: [{ label: "Channels", value: "LinkedIn, email, search" }] },

  // Finance
  { id: "obj_fin_inv_foundry", type: "invoice", typeLabel: "Invoice", department: "finance", title: "Invoice — Square One Foundry", statusLabel: "Ready for approval", statusKind: "attention", owner: "Jo from Finance Team Lead", nextAction: "Approve send", dueAt: "Net 30", preview: "$4,500 · monthly engagement fee.", meta: [{ label: "Amount", value: "$4,500" }, { label: "Terms", value: "Net 30" }], body: "Monthly engagement fee for May. Line items: operations workspace ($3,000), reporting setup ($1,500)." },
  { id: "obj_fin_inv_acme", type: "invoice", typeLabel: "Invoice", department: "finance", title: "Invoice — Acme Manufacturing", statusLabel: "Ready for approval", statusKind: "attention", owner: "Jo from Finance Team Lead", nextAction: "Approve send", dueAt: "Net 15", preview: "$2,800 · pilot setup.", meta: [{ label: "Amount", value: "$2,800" }] },
  { id: "obj_fin_cash", type: "status_report", typeLabel: "Cash Flow Summary", department: "finance", title: "Cash Flow — May", statusLabel: "Complete", statusKind: "done", owner: "Jo from Finance IC", preview: "Inflows, outflows, runway at a glance." },

  // Workforce
  { id: "obj_wf_ram", type: "agreement", typeLabel: "Contractor Agreement", department: "workforce", title: "Ram — Contractor Agreement", statusLabel: "Renewal upcoming", statusKind: "scheduled", owner: "Jo from Workforce Team Lead", nextAction: "Review agreement terms", dueAt: "In 2 weeks", preview: "Annual renewal; terms unchanged.", body: "Contractor agreement for Ram (engineering). Renews in 14 days. No rate change proposed." },
  { id: "obj_wf_onb", type: "checklist", typeLabel: "Onboarding Checklist", department: "workforce", title: "New Contractor — Onboarding", statusLabel: "In progress", statusKind: "in_progress", owner: "Jo from Workforce IC", preview: "4 of 7 steps complete." },

  // Technology (Customer Zero)
  { id: "obj_tech_sprint", type: "sprint", typeLabel: "Sprint Record", department: "technology", title: "Sprint 0 — Stabilization", statusLabel: "In progress", statusKind: "in_progress", owner: "Jo from Technology Team Lead", nextAction: "Review worktree gate", preview: "5 items active; stabilization focus.", meta: [{ label: "Items", value: "5 active" }] },
  { id: "obj_tech_deploy", type: "ticket", typeLabel: "Deployment Record", department: "technology", title: "Deploy — Commons shell", statusLabel: "Complete", statusKind: "done", owner: "Jo from Technology IC", preview: "Shell shipped to preview." },
  { id: "obj_tech_health", type: "status_report", typeLabel: "Tool Health Report", department: "technology", title: "Tool Health — Weekly", statusLabel: "Complete", statusKind: "done", owner: "Jo from Technology IC", preview: "All connected Tools healthy." },

  // Legal
  { id: "obj_legal_sow", type: "contract", typeLabel: "Contract", department: "legal", title: "Square One Foundry — SOW", statusLabel: "Ready for review", statusKind: "attention", owner: "Jo from Legal Team Lead", nextAction: "Approve final language", dueAt: "Today", preview: "Statement of work, final language for sign-off.", body: "SOW covering the operations engagement. Jo from drafted scope, deliverables, and term. Final language ready for your approval." },
];

// ─────────────────────────────── Inbox ─────────────────────────────────────
export const inboxItems: InboxItem[] = [
  { id: "inbox_001", department: "sales", title: "Approve outreach draft", objectTitle: "Acme Manufacturing", objectId: "obj_sales_draft_acme", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Needs approval", preview: "First-touch email focused on quote turnaround." },
  { id: "inbox_002", department: "operations", title: "Review weekly client status update", objectTitle: "Square One Foundry", objectId: "obj_ops_status", priority: "medium", dueAt: "Tomorrow", statusKind: "attention", statusLabel: "Needs review", preview: "On track. 2 deliverables shipped, 1 in progress." },
  { id: "inbox_003", department: "marketing", title: "Approve LinkedIn post for Friday", objectTitle: "LinkedIn post — Friday", objectId: "obj_mkt_li", priority: "medium", dueAt: "Fri", statusKind: "attention", statusLabel: "Needs approval", preview: "Short post on Human + Machine work for SMBs." },
  { id: "inbox_004", department: "finance", title: "Approve invoice for Square One Foundry", objectTitle: "Invoice — Square One Foundry", objectId: "obj_fin_inv_foundry", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Needs approval", preview: "$4,500 · monthly engagement fee." },
  { id: "inbox_005", department: "legal", title: "Review subcontractor agreement", objectTitle: "Square One Foundry — SOW", objectId: "obj_legal_sow", priority: "high", dueAt: "Today", statusKind: "attention", statusLabel: "Needs review", preview: "Statement of work, final language for sign-off." },
];

// ─────────────────────────────── Queue ─────────────────────────────────────
export const queueActions: QueueAction[] = [
  { id: "act_001", title: "Draft outreach — Acme Manufacturing", department: "sales", status: "needs_approval", sourceObjectId: "obj_sales_draft_acme", updatedAt: "2m ago" },
  { id: "act_002", title: "Generate weekly status report — Square One Foundry", department: "operations", status: "needs_approval", sourceObjectId: "obj_ops_status", updatedAt: "11m ago" },
  { id: "act_003", title: "Prepare invoice — Square One Foundry", department: "finance", status: "needs_approval", sourceObjectId: "obj_fin_inv_foundry", updatedAt: "18m ago" },
  { id: "act_004", title: "Compile OrgChart record — Sales", department: "technology", status: "running", updatedAt: "just now" },
  { id: "act_005", title: "Sync document mirror — Square One Foundry", department: "operations", status: "running", updatedAt: "1m ago" },
  { id: "act_006", title: "Research Northwind Logistics", department: "sales", status: "queued", sourceObjectId: "obj_sales_north", updatedAt: "5m ago" },
  { id: "act_007", title: "Draft Q3 demand campaign", department: "marketing", status: "queued", updatedAt: "20m ago" },
  { id: "act_008", title: "Build cash flow summary — May", department: "finance", status: "completed", sourceObjectId: "obj_fin_cash", updatedAt: "1h ago" },
  { id: "act_009", title: "Index intake documents", department: "operations", status: "completed", updatedAt: "2h ago" },
  { id: "act_010", title: "Sync calendar availability", department: "operations", status: "failed", updatedAt: "3h ago" },
];

// ─────────────────────────────── Recent outputs ────────────────────────────
export const outputs: OutputRecord[] = [
  { id: "out_001", title: "Acme Manufacturing — Research Brief", type: "Research Brief", department: "sales", generatedBy: "Jo from Sales IC", statusKind: "done", statusLabel: "Complete", timestamp: "Today, 9:14 AM", history: ["Queued", "Running", "Completed"] },
  { id: "out_002", title: "Weekly Client Status — Square One Foundry", type: "Status Report", department: "operations", generatedBy: "Jo from Operations Team Lead", statusKind: "attention", statusLabel: "Needs review", timestamp: "Today, 8:02 AM", history: ["Queued", "Running", "Needs approval"] },
  { id: "out_003", title: "LinkedIn post — Friday", type: "Content Draft", department: "marketing", generatedBy: "Jo from Marketing Team Lead", statusKind: "attention", statusLabel: "Needs approval", timestamp: "Yesterday, 4:30 PM", history: ["Draft", "Needs approval"] },
  { id: "out_004", title: "Invoice — Square One Foundry", type: "Invoice", department: "finance", generatedBy: "Jo from Finance Team Lead", statusKind: "attention", statusLabel: "Needs approval", timestamp: "Yesterday, 2:10 PM", history: ["Queued", "Running", "Needs approval"] },
  { id: "out_005", title: "Square One Foundry — SOW", type: "Contract Draft", department: "legal", generatedBy: "Jo from Legal Team Lead", statusKind: "attention", statusLabel: "Needs review", timestamp: "Yesterday, 11:45 AM", history: ["Draft", "Needs review"] },
  { id: "out_006", title: "Sprint 0 — Stabilization", type: "Sprint Record", department: "technology", generatedBy: "Jo from Technology Team Lead", statusKind: "in_progress", statusLabel: "In progress", timestamp: "Mon, 10:00 AM", history: ["Created", "In progress"] },
];

// ─────────────────────────────── Maestro OrgChart ──────────────────────────
export const orgChart: OrgDepartment[] = [
  { id: "sales", label: "Sales", jobs: [
    { id: "sales_tl", title: "Sales Team Lead", level: "Team Lead", subFamily: "sales_outreach", tasks: ["Draft outreach", "Assemble proposal", "Coordinate IC research"], workflowSeeds: [{ name: "First-touch outreach", outputPreview: "A researched first-touch email tailored to the prospect's signals." }, { name: "Weekly pipeline summary", outputPreview: "A short summary of active prospects and approvals needed." }] },
    { id: "sales_ic", title: "Sales Researcher", level: "IC", subFamily: "sales_research", tasks: ["Gather company signals", "Build research brief", "Find contacts"], workflowSeeds: [{ name: "Research brief", outputPreview: "Company profile, signals, and a recommended angle." }] },
  ] },
  { id: "operations", label: "Operations", jobs: [
    { id: "ops_tl", title: "Operations Team Lead", level: "Team Lead", subFamily: "ops_delivery", tasks: ["Run kickoff", "Track deliverables", "Send status reports"], workflowSeeds: [{ name: "Weekly status report", outputPreview: "An on-track / at-risk summary with shipped and in-progress work." }, { name: "Kickoff checklist", outputPreview: "A prepared onboarding checklist for a new engagement." }] },
    { id: "ops_mgr", title: "Operations Manager", level: "Manager", subFamily: "ops_governance", tasks: ["Handle escalations", "Approve deliverables"], workflowSeeds: [{ name: "Escalation brief", outputPreview: "A summary of an issue with options and a recommendation." }] },
  ] },
  { id: "marketing", label: "Marketing", jobs: [
    { id: "mkt_tl", title: "Marketing Team Lead", level: "Team Lead", subFamily: "content", tasks: ["Draft content", "Plan calendar", "Run campaigns"], workflowSeeds: [{ name: "LinkedIn post", outputPreview: "A short, on-brand post ready to approve and schedule." }] },
  ] },
  { id: "finance", label: "Finance", jobs: [
    { id: "fin_tl", title: "Finance Team Lead", level: "Team Lead", subFamily: "billing", tasks: ["Prepare invoices", "Follow up collections", "Summarize cash flow"], workflowSeeds: [{ name: "Monthly invoice", outputPreview: "A prepared invoice with line items, ready to approve and send." }] },
  ] },
  { id: "legal", label: "Legal", jobs: [
    { id: "legal_tl", title: "Legal Team Lead", level: "Team Lead", subFamily: "contracts", tasks: ["Draft contracts", "Review terms", "Track filings"], workflowSeeds: [{ name: "Statement of work", outputPreview: "A drafted SOW with scope, deliverables, and term." }] },
  ] },
];

// ─────────────────────────────── Tools ─────────────────────────────────────
export const tools: ToolConn[] = [
  { id: "drive", label: "Google Drive", status: "not_connected", note: "Not connected", why: "Lets Jo from read and organize documents you choose to share." },
  { id: "calendar", label: "Google Calendar", status: "not_connected", note: "Not connected", why: "Lets Jo from see availability and schedule kickoff calls." },
  { id: "gmail", label: "Gmail", status: "not_connected", note: "Not connected", why: "Lets Jo from prepare and send approved emails on your behalf." },
  { id: "jira", label: "Jira", status: "connected", note: "Connected for Customer Zero", why: "Tracks Technology work for the Jo from team." },
  { id: "corpus", label: "Document workspace", status: "backend", note: "Connected by your workspace", why: "Managed for you — no action needed." },
];

// ─────────────────────────────── Industry matches (onboarding) ─────────────
export const industryMatches: IndustryMatch[] = [
  { id: "prof_services", label: "Professional Services", confidence: 0.92, workAreas: ["Sales", "Operations", "Finance"] },
  { id: "field_services", label: "Field Services", confidence: 0.78, workAreas: ["Operations", "Workforce", "Sales"] },
  { id: "contracting", label: "Contracting", confidence: 0.64, workAreas: ["Operations", "Finance", "Legal"] },
];

export const moreIndustries: IndustryMatch[] = [
  { id: "manufacturing", label: "Manufacturing", confidence: 0, workAreas: ["Operations", "Sales", "Finance"] },
  { id: "healthcare_services", label: "Healthcare Services", confidence: 0, workAreas: ["Operations", "Workforce", "Legal"] },
  { id: "construction", label: "Construction", confidence: 0, workAreas: ["Operations", "Finance", "Workforce"] },
];

// helpers
export const deptLabel = (id: DepartmentId) =>
  departments.find((d) => d.id === id)?.label ?? id;

export const objectsByDept = (id: DepartmentId) =>
  workObjects.filter((o) => o.department === id);

export const objectById = (id: string) =>
  workObjects.find((o) => o.id === id);
