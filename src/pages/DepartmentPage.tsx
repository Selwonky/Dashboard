import * as React from "react";
import { Boxes } from "lucide-react";
import { Badge } from "@jofrom/design-system/ui";
import { FilterTabs } from "@jofrom/design-system/data-display";
import { PageHeader, EmptyState, ButtonLink } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { useParams } from "react-router-dom";
import { deptIcon } from "@/lib/commons/navigation";
import {
  departments, objectsByDept, type DepartmentId, type WorkObject,
} from "@/lib/commons/prototype-data";

// Sales is GTM: tabs are motions (Pipeline/Partnerships/Risk). Others use status views.
const salesTabs = [
  { value: "Pipeline", label: "Pipeline", blurb: "Find, qualify, and close new engagements." },
  { value: "Partnerships", label: "Partnerships", blurb: "Referral partners, intros, and relationship check-ins." },
  { value: "Risk", label: "Risk", blurb: "Insurance prospects, quote packages, and licensing." },
] as const;

const statusTabs = [
  { value: "active", label: "Active" },
  { value: "approvals", label: "Needs approval" },
  { value: "recent", label: "Recent" },
] as const;

export function DepartmentPage() {
  const { dept } = useParams<{ dept: string }>();
  const meta = departments.find((d) => d.id === dept);
  const objs = objectsByDept(dept as DepartmentId);
  const isSales = dept === "sales";
  const [tab, setTab] = React.useState<string>(isSales ? "Pipeline" : "active");

  React.useEffect(() => { setTab(isSales ? "Pipeline" : "active"); }, [dept, isSales]);

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

  const filtered: WorkObject[] = isSales
    ? objs.filter((o) => (o.area ?? "Pipeline") === tab)
    : tab === "approvals" ? objs.filter((o) => o.statusKind === "attention")
    : tab === "recent" ? objs.filter((o) => o.statusKind === "done")
    : objs;

  const tabs = isSales ? salesTabs : statusTabs;
  const activeBlurb = isSales ? salesTabs.find((t) => t.value === tab)?.blurb : undefined;
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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs tabs={tabs.map((t) => ({ label: t.label, value: t.value }))} activeTab={tab} onChange={setTab} />
        <ButtonLink to="/commons/orgchart" variant="ghost" size="sm">View in OrgChart</ButtonLink>
      </div>
      {activeBlurb && <p className="mb-5 text-theme-sm text-gray-500 dark:text-gray-400">{activeBlurb}</p>}

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
