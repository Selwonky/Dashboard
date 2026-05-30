import {
  LayoutGrid, Inbox, Activity, History, Workflow, Radio, Briefcase, CircleCheck,
  Zap, Boxes, Megaphone, Users, Wallet, Server, LifeBuoy, Calculator, Workflow as Ops,
  Scale, Shield, Plug, CreditCard, Compass, TrendingUp, Network, type LucideIcon,
} from "lucide-react";
import type { DepartmentId, ObjectType } from "./prototype-data";

export interface NavLink {
  label: string;
  to: string;
  icon: LucideIcon;
}
export interface NavGroup {
  label: string;
  items: NavLink[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Start",
    items: [
      { label: "Home", to: "/home", icon: LayoutGrid },
      { label: "Inbox", to: "/inbox", icon: Inbox },
      { label: "Queue", to: "/queue", icon: Activity },
      { label: "Recent", to: "/recent", icon: History },
    ],
  },
  {
    label: "Departments",
    items: [
      { label: "Sales", to: "/departments/sales", icon: TrendingUp },
      { label: "Marketing", to: "/departments/marketing", icon: Megaphone },
      { label: "Workforce", to: "/departments/workforce", icon: Users },
      { label: "Finance", to: "/departments/finance", icon: Wallet },
      { label: "Technology", to: "/departments/technology", icon: Server },
      { label: "Support", to: "/departments/support", icon: LifeBuoy },
      { label: "Accounting", to: "/departments/accounting", icon: Calculator },
      { label: "Operations", to: "/departments/operations", icon: Ops },
      { label: "Legal", to: "/departments/legal", icon: Scale },
    ],
  },
  {
    label: "Objects",
    items: [
      { label: "Workflows", to: "/objects/workflow", icon: Workflow },
      { label: "Signals", to: "/objects/signal", icon: Radio },
      { label: "Jobs", to: "/objects/job", icon: Briefcase },
      { label: "Tasks", to: "/objects/task", icon: CircleCheck },
      { label: "Actions", to: "/objects/action", icon: Zap },
      { label: "Blocks", to: "/objects/block", icon: Boxes },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "OrgChart", to: "/orgchart", icon: Network },
      { label: "Security & Access", to: "/settings/security", icon: Shield },
      { label: "Tools", to: "/settings/tools", icon: Plug },
      { label: "Billing", to: "/settings/billing", icon: CreditCard },
      { label: "Onboarding", to: "/settings/onboarding", icon: Compass },
    ],
  },
];

export const deptIcon: Record<DepartmentId, LucideIcon> = {
  sales: TrendingUp, marketing: Megaphone, workforce: Users, finance: Wallet,
  technology: Server, support: LifeBuoy, accounting: Calculator, operations: Ops,
  legal: Scale,
};

// Dept-specific category tabs — rendered in the topbar header next to the
// page indicator. 5 specific + the shared "Reporting" tab.
export type DeptCategory = { value: string; label: string; types?: ObjectType[] };
const reporting: DeptCategory = { value: "reporting", label: "Reporting", types: ["status_report"] };
export const deptCategories: Partial<Record<DepartmentId, DeptCategory[]>> = {
  sales: [
    { value: "pipeline", label: "Pipeline", types: ["prospect", "research_brief"] },
    { value: "outreach", label: "Outreach", types: ["outreach_draft", "proposal"] },
    { value: "partnerships", label: "Partnerships", types: ["partner", "referral", "checkin"] },
    { value: "risk", label: "Risk", types: ["insurance_prospect", "quote_package", "assessment", "licensing"] },
    { value: "forecast", label: "Forecast" },
    reporting,
  ],
  marketing: [
    { value: "content", label: "Content", types: ["content_draft"] },
    { value: "analytics", label: "Analytics" },
    { value: "campaigns", label: "Campaigns", types: ["campaign"] },
    { value: "eo", label: "EO" },
    { value: "performance", label: "Performance" },
    reporting,
  ],
  operations: [
    { value: "engagements", label: "Engagements", types: ["engagement"] },
    { value: "onboarding", label: "Onboarding", types: ["checklist"] },
    { value: "deliverables", label: "Deliverables" },
    { value: "escalations", label: "Escalations" },
    { value: "health", label: "Health" },
    reporting,
  ],
  finance: [
    { value: "invoices", label: "Invoices", types: ["invoice"] },
    { value: "cashflow", label: "Cash Flow" },
    { value: "collections", label: "Collections" },
    { value: "grants", label: "Grants" },
    { value: "budgets", label: "Budgets" },
    reporting,
  ],
  workforce: [
    { value: "people", label: "People" },
    { value: "contractors", label: "Contractors", types: ["agreement"] },
    { value: "onboarding", label: "Onboarding", types: ["checklist"] },
    { value: "agreements", label: "Agreements", types: ["agreement"] },
    { value: "payments", label: "Payments" },
    reporting,
  ],
  technology: [
    { value: "sprints", label: "Sprints", types: ["sprint"] },
    { value: "tickets", label: "Tickets", types: ["ticket"] },
    { value: "deployments", label: "Deployments" },
    { value: "health", label: "Tool Health" },
    { value: "roadmap", label: "Roadmap" },
    reporting,
  ],
  legal: [
    { value: "contracts", label: "Contracts", types: ["contract"] },
    { value: "filings", label: "Filings" },
    { value: "ip", label: "IP" },
    { value: "compliance", label: "Compliance" },
    { value: "signatures", label: "Signatures" },
    reporting,
  ],
  support: [
    { value: "tickets", label: "Tickets" },
    { value: "customers", label: "Customers" },
    { value: "issues", label: "Issues" },
    { value: "knowledge", label: "Knowledge Base" },
    { value: "slas", label: "SLAs" },
    reporting,
  ],
  accounting: [
    { value: "ledger", label: "Ledger" },
    { value: "reconciliation", label: "Reconciliation" },
    { value: "close", label: "Period Close" },
    { value: "expenses", label: "Expenses" },
    { value: "tax", label: "Tax" },
    reporting,
  ],
};
