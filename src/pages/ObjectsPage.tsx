import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { workObjects, type StatusKind } from "@/lib/commons/prototype-data";

const dotColor: Record<StatusKind, string> = {
  attention: "bg-warning", in_progress: "bg-info", scheduled: "bg-muted-foreground/50",
  neutral: "bg-secondary-foreground/40", done: "bg-success", failed: "bg-destructive",
};

const typeTitle: Record<string, string> = {
  workflow: "Workflows", signal: "Signals", job: "Jobs", task: "Tasks",
  action: "Actions", block: "Blocks",
};

const columns: { kind: StatusKind; label: string }[] = [
  { kind: "attention", label: "Needs you" },
  { kind: "in_progress", label: "In progress" },
  { kind: "scheduled", label: "Scheduled" },
  { kind: "neutral", label: "Draft" },
  { kind: "done", label: "Done" },
];

export function ObjectsPage() {
  const { type } = useParams<{ type: string }>();
  const title = typeTitle[type ?? ""] ?? "Objects";

  return (
    <>
      <PageHeader
        title={title}
        description="An object-first view of work, grouped by status. (Object types are backend-owned; the prototype shows the shared card + board across the current work pool.)"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((col) => {
          const items = workObjects.filter((o) => o.statusKind === col.kind);
          if (!items.length) return null;
          return (
            <div key={col.kind} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${dotColor[col.kind]}`} />
                <h2 className="text-sm font-semibold">{col.label}</h2>
                <span className="text-xs text-muted-foreground">{items.length}</span>
              </div>
              {items.map((o) => <ObjectCard key={o.id} obj={o} />)}
            </div>
          );
        })}
      </div>
    </>
  );
}
