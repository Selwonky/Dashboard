import { useParams, useNavigate } from "react-router-dom";
import { KanbanColumn, KanbanCard } from "@jofrom/design-system/data-display";
import { PageHeader } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { workObjects, statusBadge, deptLabel, type StatusKind } from "@/lib/commons/prototype-data";
import { getInitials } from "@/lib/utils";

const typeTitle: Record<string, string> = {
  workflow: "Workflows", signal: "Signals", job: "Jobs", task: "Tasks",
  action: "Actions", block: "Blocks",
};

const dotClass: Record<StatusKind, string> = {
  attention: "bg-warning-500", in_progress: "bg-brand-500", scheduled: "bg-accent-500",
  neutral: "bg-gray-400", done: "bg-success-500", failed: "bg-error-500",
};

// 5 columns, one row (a kanban).
const columns: { kind: StatusKind; label: string }[] = [
  { kind: "attention", label: "Needs you" },
  { kind: "in_progress", label: "In progress" },
  { kind: "scheduled", label: "Scheduled" },
  { kind: "neutral", label: "Draft" },
  { kind: "done", label: "Done" },
];

export function ObjectsPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const title = typeTitle[type ?? ""] ?? "Objects";

  if (type === "block") {
    return (
      <>
        <PageHeader
          title="Blocks"
          description="Every work object on one board, by status. Drag-and-drop is a later step; click a card to open it."
        />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((col) => {
            const items = workObjects.filter((o) => o.statusKind === col.kind);
            return (
              <KanbanColumn key={col.kind} title={col.label} count={items.length} dotClassName={dotClass[col.kind]} className="flex-1">
                {items.map((o) => (
                  <KanbanCard
                    key={o.id}
                    title={o.title}
                    description={o.preview}
                    tag={o.typeLabel}
                    tagColor={statusBadge[o.statusKind].color}
                    timestamp={o.dueAt}
                    metadata={<span className="text-theme-xs text-gray-500 dark:text-gray-400">{deptLabel(o.department)}</span>}
                    assignee={getInitials(o.owner.replace("Jo from ", ""))}
                    onClick={() => navigate(`/commons/objects/detail/${o.id}`)}
                  />
                ))}
              </KanbanColumn>
            );
          })}
        </div>
      </>
    );
  }

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
                <span className={`size-2 rounded-full ${dotClass[col.kind]}`} />
                <h2 className="text-theme-sm font-semibold text-gray-900 dark:text-white">{col.label}</h2>
                <span className="text-theme-xs text-gray-500">{items.length}</span>
              </div>
              {items.map((o) => <ObjectCard key={o.id} obj={o} />)}
            </div>
          );
        })}
      </div>
    </>
  );
}
