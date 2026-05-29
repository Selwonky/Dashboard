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
