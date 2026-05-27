import * as React from "react";
import { useParams } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Badge } from "@jofrom/design-system/ui";
import { FilterTabs } from "@jofrom/design-system/data-display";
import { PageHeader, EmptyState, ButtonLink } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { deptIcon } from "@/lib/commons/navigation";
import {
  departments, objectsByDept, type DepartmentId, type WorkObject,
} from "@/lib/commons/prototype-data";

// Every department (Sales included) uses the same status views.
const statusTabs = [
  { value: "active", label: "Active" },
  { value: "approvals", label: "Needs approval" },
  { value: "recent", label: "Recent" },
] as const;

export function DepartmentPage() {
  const { dept } = useParams<{ dept: string }>();
  const meta = departments.find((d) => d.id === dept);
  const objs = objectsByDept(dept as DepartmentId);
  const [tab, setTab] = React.useState<string>("active");

  React.useEffect(() => { setTab("active"); }, [dept]);

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

  const filtered: WorkObject[] =
    tab === "approvals" ? objs.filter((o) => o.statusKind === "attention")
    : tab === "recent" ? objs.filter((o) => o.statusKind === "done")
    : objs;

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
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <FilterTabs tabs={statusTabs.map((t) => ({ label: t.label, value: t.value }))} activeTab={tab} onChange={setTab} />
        <ButtonLink to="/commons/orgchart" variant="ghost" size="sm">View in OrgChart</ButtonLink>
      </div>

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
