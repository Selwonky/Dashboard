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

export const departmentRoutes: Record<DepartmentId, Record<string, string>> = {
  sales: {
    summary: "/api/v1/jo/sales/dashboard/summary",
    stages: "/api/v1/jo/sales/stages",
    pipeline: "/api/v1/jo/sales/pipeline",
    leads: "/api/v1/jo/sales/leads",
    contacts: "/api/v1/jo/sales/contacts",
    companies: "/api/v1/jo/sales/companies",
    activities: "/api/v1/jo/sales/activities",
    activityTypes: "/api/v1/jo/sales/activity-types",
    leadTags: "/api/v1/jo/sales/tags/leads",
    contactTags: "/api/v1/jo/sales/tags/contacts",
    utmSources: "/api/v1/jo/sales/utm/sources",
    utmMediums: "/api/v1/jo/sales/utm/mediums",
    utmCampaigns: "/api/v1/jo/sales/utm/campaigns",
    lostReasons: "/api/v1/jo/sales/lost-reasons",
  },
  marketing: {
    summary: "/api/v1/jo/marketing/dashboard/summary",
    today: "/api/v1/jo/marketing/dashboard/today",
    campaigns: "/api/v1/jo/marketing/campaigns",
    mailingLists: "/api/v1/jo/marketing/mailing-lists",
    mailingContacts: "/api/v1/jo/marketing/mailing-contacts",
    links: "/api/v1/jo/marketing/links",
    events: "/api/v1/jo/marketing/events",
    eventAnalytics: "/api/v1/jo/marketing/analytics/events",
  },
  workforce: {
    employees: "/api/v1/jo/workforce/employees",
    applicants: "/api/v1/jo/workforce/applicants",
    jobs: "/api/v1/jo/workforce/jobs",
    attendance: "/api/v1/jo/workforce/attendance",
    resources: "/api/v1/jo/workforce/resources",
    lunchOrders: "/api/v1/jo/workforce/lunch-orders",
  },
  operations: {
    summary: "/api/v1/jo/operations/dashboard/summary",
    today: "/api/v1/jo/operations/dashboard/today",
    projects: "/api/v1/jo/operations/projects",
    tasks: "/api/v1/jo/operations/tasks",
    taskStages: "/api/v1/jo/operations/task-stages",
    taskTags: "/api/v1/jo/operations/task-tags",
    todos: "/api/v1/jo/operations/todos",
    notes: "/api/v1/jo/operations/notes",
    purchases: "/api/v1/jo/operations/purchases",
    maintenance: "/api/v1/jo/operations/maintenance",
  },
  finance: {
    payments: "/api/v1/jo/finance/payments",
    moves: "/api/v1/jo/finance/moves",
    journals: "/api/v1/jo/finance/journals",
    paymentProviders: "/api/v1/jo/finance/payment-providers",
  },
  support: {
    tickets: "/api/v1/jo/support/tickets",
    messages: "/api/v1/jo/support/messages",
    ratings: "/api/v1/jo/support/ratings",
    livechatChannels: "/api/v1/jo/support/livechat-channels",
  },
  accounting: {
    invoices: "/api/v1/jo/accounting/invoices",
    moveLines: "/api/v1/jo/accounting/move-lines",
    accounts: "/api/v1/jo/accounting/accounts",
    payments: "/api/v1/jo/accounting/payments",
  },
  technology: {
    users: "/api/v1/jo/technology/users",
    models: "/api/v1/jo/technology/models",
    modules: "/api/v1/jo/technology/modules",
    mailServers: "/api/v1/jo/technology/mail-servers",
  },
  legal: {
    attachments: "/api/v1/jo/legal/attachments",
    messages: "/api/v1/jo/legal/messages",
    activities: "/api/v1/jo/legal/activities",
  },
};

export const commonsRoutes = {
  workspaces: "/api/v1/commons/workspaces",
  objects: "/api/v1/commons/objects",
  actions: "/api/v1/commons/actions",
  queue: "/api/v1/commons/queue",
  inbox: "/api/v1/commons/inbox",
  outputs: "/api/v1/commons/outputs",
  calendar: "/api/v1/commons/calendar",
  mail: "/api/v1/commons/mail",
  tasks: "/api/v1/commons/tasks",
  notes: "/api/v1/commons/notes",
  search: "/api/v1/commons/search",
};

export const orgChartRoutes = {
  root: "/api/v1/jo/orgchart",
  departments: "/api/v1/jo/orgchart/departments",
  workflows: "/api/v1/jo/orgchart/workflows",
};

export const toolsRoutes = {
  list: "/api/v1/jo/tools",
};

export const onboardingRoutes = {
  submit: "/api/v1/jo/onboarding",
  status: "/api/v1/jo/onboarding/status",
  profile: "/api/v1/jo/onboarding/profile",
};

export const reportsRoutes = {
  departments: "/api/v1/jo/reports/departments",
  models: "/api/v1/jo/reports/models",
  summary: "/api/v1/jo/reports/summary",
  coverage: "/api/v1/jo/reports/coverage",
  overview: "/api/v1/jo/reports/overview",
};
