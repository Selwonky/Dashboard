import {
  LayoutGrid, Inbox, Activity, History, Workflow, Radio, Briefcase, CircleCheck,
  Zap, Boxes, Megaphone, Users, Wallet, Server, LifeBuoy, Calculator, Workflow as Ops,
  Scale, Shield, Plug, CreditCard, Compass, TrendingUp, Network, type LucideIcon,
} from "lucide-react";
import type { DepartmentId } from "./prototype-data";

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
      { label: "Home", to: "/commons", icon: LayoutGrid },
      { label: "Inbox", to: "/commons/inbox", icon: Inbox },
      { label: "Queue", to: "/commons/queue", icon: Activity },
      { label: "Recent", to: "/commons/recent", icon: History },
    ],
  },
  {
    label: "Objects",
    items: [
      { label: "Workflows", to: "/commons/objects/workflow", icon: Workflow },
      { label: "Signals", to: "/commons/objects/signal", icon: Radio },
      { label: "Jobs", to: "/commons/objects/job", icon: Briefcase },
      { label: "Tasks", to: "/commons/objects/task", icon: CircleCheck },
      { label: "Actions", to: "/commons/objects/action", icon: Zap },
      { label: "Blocks", to: "/commons/objects/block", icon: Boxes },
    ],
  },
  {
    label: "Departments",
    items: [
      { label: "Sales", to: "/commons/departments/sales", icon: TrendingUp },
      { label: "Marketing", to: "/commons/departments/marketing", icon: Megaphone },
      { label: "Workforce", to: "/commons/departments/workforce", icon: Users },
      { label: "Finance", to: "/commons/departments/finance", icon: Wallet },
      { label: "Technology", to: "/commons/departments/technology", icon: Server },
      { label: "Support", to: "/commons/departments/support", icon: LifeBuoy },
      { label: "Accounting", to: "/commons/departments/accounting", icon: Calculator },
      { label: "Operations", to: "/commons/departments/operations", icon: Ops },
      { label: "Legal", to: "/commons/departments/legal", icon: Scale },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Maestro OrgChart", to: "/commons/orgchart", icon: Network },
      { label: "Security & Access", to: "/commons/settings/security", icon: Shield },
      { label: "Tools", to: "/commons/settings/tools", icon: Plug },
      { label: "Billing", to: "/commons/settings/billing", icon: CreditCard },
      { label: "Onboarding", to: "/commons/settings/onboarding", icon: Compass },
    ],
  },
];

export const deptIcon: Record<DepartmentId, LucideIcon> = {
  sales: TrendingUp, marketing: Megaphone, workforce: Users, finance: Wallet,
  technology: Server, support: LifeBuoy, accounting: Calculator, operations: Ops,
  legal: Scale,
};
