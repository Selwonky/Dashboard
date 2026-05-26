import * as React from "react";
import { useParams, Link } from "react-router-dom";
import { Boxes, Handshake, Shield, TrendingUp } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { deptIcon } from "@/lib/commons/navigation";
import {
  departments, objectsByDept, type DepartmentId, type WorkObject,
} from "@/lib/commons/prototype-data";

// Sales is GTM: tabs are motions (Pipeline/Partnerships/Risk). Others use status views.
const salesTabs = [
  { id: "Pipeline", label: "Pipeline", icon: TrendingUp, blurb: "Find, qualify, and close new engagements." },
  { id: "Partnerships", label: "Partnerships", icon: Handshake, blurb: "Referral partners, intros, and relationship check-ins." },
  { id: "Risk", label: "Risk", icon: Shield, blurb: "Insurance prospects, quote packages, and licensing." },
] as const;

const statusTabs = [
  { id: "active", label: "Active" },
  { id: "approvals", label: "Needs approval" },
  { id: "recent", label: "Recent" },
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
  const activeBlurb = isSales ? salesTabs.find((t) => t.id === tab)?.blurb : undefined;
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
      <div className="mb-2 flex flex-wrap items-center gap-1 border-b">
        {tabs.map((t) => {
          const TabIcon = "icon" in t ? t.icon : undefined;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm transition-colors",
                tab === t.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {TabIcon && <TabIcon className="size-3.5" />}
              {t.label}
            </button>
          );
        })}
        <Button asChild variant="ghost" size="sm" className="ml-auto">
          <Link to="/commons/orgchart">View in OrgChart</Link>
        </Button>
      </div>
      {activeBlurb && <p className="mb-5 text-sm text-muted-foreground">{activeBlurb}</p>}
      {!activeBlurb && <div className="mb-5" />}

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
