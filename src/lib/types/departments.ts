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

export const departmentRoutes: Record<DepartmentId, string> = {
  sales: "/api/v1/jo/sales/leads",
  marketing: "/api/v1/jo/marketing/campaigns",
  workforce: "/api/v1/jo/workforce/employees",
  operations: "/api/v1/jo/operations/engagements",
  finance: "/api/v1/jo/finance/payments",
  support: "/api/v1/jo/support/tickets",
  accounting: "/api/v1/jo/accounting/invoices",
  technology: "/api/v1/jo/technology/modules",
  legal: "/api/v1/jo/legal/attachments",
};
