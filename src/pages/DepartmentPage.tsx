import * as React from "react";
import { useParams } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Badge } from "@jofrom/design-system/ui";
import { FilterTabs } from "@jofrom/design-system/data-display";
import { PageHeader, EmptyState, ButtonLink } from "@/components/primitives";
import { ObjectCard } from "@/components/ObjectCard";
import { deptIcon } from "@/lib/navigation";
import {
  departments, objectsByDept,
  type DepartmentId, type ObjectType, type WorkObject,
} from "@/lib/prototype-data";

// Consistent across every department.
const statusTabs = [
  { value: "active", label: "Active" },
  { value: "approvals", label: "Needs approval" },
  { value: "done", label: "Done" },
] as const;

// Department-specific category tabs (on top of the consistent status tabs).
// Each rich department gets 6 tabs: 5 dept-specific + the shared "Reporting".
type Category = { value: string; label: string; types?: ObjectType[] };
const reporting: Category = { value: "reporting", label: "Reporting", types: ["status_report"] };
const deptCategories: Partial<Record<DepartmentId, Category[]>> = {
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
    { value: "calendar", label: "Calendar" },
    { value: "campaigns", label: "Campaigns", types: ["campaign"] },
    { value: "seo", label: "SEO/AEO" },
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
};

export function DepartmentPage() {
  const { dept } = useParams<{ dept: string }>();
  const meta = departments.find((d) => d.id === dept);
  const objs = objectsByDept(dept as DepartmentId);
  const categories = deptCategories[dept as DepartmentId];

  const [status, setStatus] = React.useState<string>("active");
  const [category, setCategory] = React.useState<string>(categories?.[0].value ?? "all");

  React.useEffect(() => {
    setStatus("active");
    setCategory(categories?.[0].value ?? "all");
  }, [dept, categories]);

  if (!meta) {
    return <EmptyState icon={Boxes} title="Unknown department" description="This work area isn't part of the prototype yet." />;
  }

  if (!meta.rich || objs.length === 0) {
    return (
      <>
        <PageHeader title={meta.label} description={meta.summary} />
        <EmptyState
          icon={deptIcon[meta.id]}
          title="This work area is on the way."
          description={`We're preparing the ${meta.label} workspace. Work will appear here as Jo from prepares it.`}
        />
      </>
    );
  }

  const activeCategory = categories?.find((c) => c.value === category);
  const byCategory = activeCategory?.types
    ? objs.filter((o) => activeCategory.types!.includes(o.type))
    : objs;
  const filtered: WorkObject[] =
    status === "approvals" ? byCategory.filter((o) => o.statusKind === "attention")
    : status === "done" ? byCategory.filter((o) => o.statusKind === "done")
    : byCategory;

  const Icon = deptIcon[meta.id];

  return (
    <>
      <PageHeader
        title={meta.label}
        description={meta.summary}
        actions={
          <>
            <Badge variant="light" color="neutral">{meta.activeCount} active</Badge>
            {meta.needsApprovalCount > 0 && <Badge variant="light" color="warning">{meta.needsApprovalCount} approvals</Badge>}
          </>
        }
      />

      {/* Consistent status tabs (every department). */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs
          tabs={statusTabs.map((t) => ({ label: t.label, value: t.value }))}
          activeTab={status}
          onChange={setStatus}
        />
        <ButtonLink to="/orgchart" variant="ghost" size="sm">View in OrgChart</ButtonLink>
      </div>

      {/* Department-specific category tabs (only where defined). */}
      {categories && (
        <div className="mb-5">
          <FilterTabs
            tabs={categories.map((c) => ({ label: c.label, value: c.value }))}
            activeTab={category}
            onChange={setCategory}
          />
        </div>
      )}

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => <ObjectCard key={o.id} obj={o} />)}
        </div>
      ) : (
        <EmptyState icon={Icon} title="Nothing here yet" description="No items match this view." />
      )}
    </>
  );
}
