import { useParams, useNavigate } from "react-router-dom";
import { KanbanColumn, KanbanCard } from "@jofrom/design-system/data-display";
import { PageHeader } from "@/components/primitives";
import { workObjects, statusBadge, deptLabel, type StatusKind } from "@/lib/prototype-data";
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

  return (
    <>
      <PageHeader
        title={title}
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
