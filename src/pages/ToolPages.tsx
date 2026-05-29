import { Mail, Calendar, ListChecks, StickyNote, type LucideIcon } from "lucide-react";
import { PageHeader, EmptyState } from "@/components/primitives";

function ToolPlaceholder({
  title,
  description,
  icon,
  body,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  body: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <EmptyState icon={icon} title={`${title} is on the way.`} description={body} />
    </>
  );
}

export function EmailPage() {
  return (
    <ToolPlaceholder
      title="Email"
      description="Drafts Jo from has prepared, sent threads, and inbox messages that need your attention."
      icon={Mail}
      body="Drafts and threads will appear here once Tools are connected."
    />
  );
}

export function CalendarPage() {
  return (
    <ToolPlaceholder
      title="Calendar"
      description="Meetings, kickoffs, and time blocks across your workspace."
      icon={Calendar}
      body="Your calendar will appear here once Tools are connected."
    />
  );
}

export function TasksPage() {
  return (
    <ToolPlaceholder
      title="Tasks"
      description="Your task list — assigned, due, and tracked across departments."
      icon={ListChecks}
      body="Tasks will appear here once Tools are connected."
    />
  );
}

export function NotesPage() {
  return (
    <ToolPlaceholder
      title="Notes"
      description="Quick captures, decisions, and reference notes."
      icon={StickyNote}
      body="Your notes will appear here once Tools are connected."
    />
  );
}
