import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { deptIcon } from "@/lib/commons/navigation";
import {
  departments, objectsByDept, type DepartmentId, type WorkObject,
} from "@/lib/commons/prototype-data";

type View = "active" | "approvals" | "recent";
const views: { id: View; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "approvals", label: "Needs approval" },
  { id: "recent", label: "Recent" },
];

export function DepartmentPage() {
  const { dept } = useParams<{ dept: string }>();
  const [view, setView] = React.useState<View>("active");
  const meta = departments.find((d) => d.id === dept);
  const objs = objectsByDept(dept as DepartmentId);

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
    view === "approvals" ? objs.filter((o) => o.statusKind === "attention")
    : view === "recent" ? objs.filter((o) => o.statusKind === "done")
    : objs;

  const Icon = deptIcon[meta.id];

  return (
    <>
      <PageHeader
        title={meta.label}
        description={meta.summary}
        actions={
          <>
            <Badge variant="secondary">{meta.activeCount} active</Badge>
            {meta.needsApprovalCount > 0 && <Badge variant="warning">{meta.needsApprovalCount} approvals</Badge>}
          </>
        }
      />
      <div className="mb-5 flex items-center gap-1 border-b">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm transition-colors",
              view === v.id
                ? "border-primary font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {v.label}
          </button>
        ))}
        <Button asChild variant="ghost" size="sm" className="ml-auto">
          <Link to="/commons/orgchart">View in OrgChart</Link>
        </Button>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((o) => <ObjectCard key={o.id} obj={o} />)}
        </div>
      ) : (
        <EmptyState icon={Icon} title="Nothing here yet" description="No items match this view." />
      )}
    </>
  );
}
