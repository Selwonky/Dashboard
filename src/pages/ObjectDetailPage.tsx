import { useParams, Link, useNavigate } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@jofrom/design-system/ui";
import { EntityHeader, ActivityTimeline } from "@jofrom/design-system/data-display";
import { EmptyState } from "@/components/primitives";
import { objectById, deptLabel, statusBadge, type StatusKind } from "@/lib/prototype-data";

const timelineStatus: Record<StatusKind, "success" | "warning" | "error" | "info" | "neutral"> = {
  done: "success", attention: "warning", failed: "error", in_progress: "info", scheduled: "info", neutral: "neutral",
};

export function ObjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const obj = id ? objectById(id) : undefined;

  if (!obj) return <EmptyState icon={Boxes} title="Object not found" />;

  return (
    <>
      <EntityHeader
        className="mb-6"
        title={obj.title}
        subtitle={obj.typeLabel}
        onBack={() => navigate(-1)}
        status={{ label: obj.statusLabel, color: statusBadge[obj.statusKind].color }}
        metadata={[
          { label: "Owner", value: obj.owner },
          { label: "Department", value: <Link to={`/commons/departments/${obj.department}`} className="font-medium text-brand-600 hover:underline">{deptLabel(obj.department)}</Link> },
          ...(obj.dueAt ? [{ label: "Due", value: obj.dueAt }] : []),
          ...(obj.meta ?? []),
        ]}
        actions={obj.nextAction ? <Button>{obj.nextAction}</Button> : undefined}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader><CardTitle className="text-base">{obj.typeLabel}</CardTitle></CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-theme-sm leading-relaxed text-gray-700 dark:text-gray-200">
              {obj.body ?? obj.preview}
            </p>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle className="text-base">History</CardTitle></CardHeader>
          <CardContent>
            <ActivityTimeline
              items={[
                { title: "Created", timestamp: "Earlier", status: "neutral" },
                { title: `Prepared by ${obj.owner}`, timestamp: "Today", status: "info", description: obj.preview },
                { title: obj.statusLabel, timestamp: obj.dueAt ? `Due ${obj.dueAt}` : "Now", status: timelineStatus[obj.statusKind] },
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
