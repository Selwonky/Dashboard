import { Link } from "react-router-dom";
import { Inbox, Compass, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader, Section } from "@/components/commons/primitives";
import { ObjectCard } from "@/components/commons/ObjectCard";
import { StatusBadge } from "@/components/commons/StatusBadge";
import { deptIcon } from "@/lib/commons/navigation";
import { departments, workObjects, outputs } from "@/lib/commons/prototype-data";
import { useCommons } from "@/lib/commons/store";

export function HomePage() {
  const { inbox, inboxState } = useCommons();
  const pending = inbox.filter((i) => inboxState[i.id] === "pending");
  const todays = workObjects.filter((o) => o.statusKind === "attention").slice(0, 3);

  return (
    <>
      <PageHeader
        title="Home"
        description="Review approvals, track work, and see what Jo from has prepared across your company."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/commons/orgchart"><Compass className="size-4" /> Maestro OrgChart</Link>
            </Button>
            <Button asChild>
              <Link to="/commons/inbox"><Inbox className="size-4" /> Review Inbox{pending.length ? ` (${pending.length})` : ""}</Link>
            </Button>
          </>
        }
      />

      <Section title="Today's work">
        <div className="grid gap-4 md:grid-cols-3">
          {todays.map((o) => <ObjectCard key={o.id} obj={o} />)}
        </div>
      </Section>

      <Section
        title="Inbox requiring you"
        action={<Link to="/commons/inbox" className="text-sm font-medium text-primary hover:underline">View all →</Link>}
      >
        <Card className="gap-0 py-0">
          {pending.slice(0, 4).map((item, i) => (
            <Link
              key={item.id}
              to="/commons/inbox"
              className={`flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-accent ${i > 0 ? "border-t" : ""}`}
            >
              <StatusBadge kind={item.statusKind} label={item.statusLabel} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title} · {item.objectTitle}</p>
                <p className="truncate text-xs text-muted-foreground">{item.preview}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{item.dueAt}</span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
          {pending.length === 0 && (
            <p className="px-5 py-6 text-center text-sm text-muted-foreground">
              Nothing needs your review right now.
            </p>
          )}
        </Card>
      </Section>

      <Section
        title="Work areas"
        action={<Link to="/commons/departments/sales" className="text-sm font-medium text-primary hover:underline">All departments →</Link>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.filter((d) => d.rich).map((d) => {
            const Icon = deptIcon[d.id];
            return (
              <Card key={d.id} className="gap-3 transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="size-4 text-muted-foreground" aria-hidden /> {d.label}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{d.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Badge variant="secondary">{d.activeCount} active</Badge>
                  {d.needsApprovalCount > 0 && (
                    <Badge variant="warning">{d.needsApprovalCount} approval{d.needsApprovalCount > 1 ? "s" : ""}</Badge>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" size="sm" className="ml-auto">
                    <Link to={`/commons/departments/${d.id}`}>Open <ArrowRight className="size-3.5" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section
        title="Recent outputs"
        action={<Link to="/commons/recent" className="text-sm font-medium text-primary hover:underline">View all →</Link>}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {outputs.slice(0, 3).map((o) => (
            <Card key={o.id} className="gap-2">
              <CardHeader>
                <CardTitle className="text-sm">{o.title}</CardTitle>
                <CardDescription>{o.type} · {o.timestamp}</CardDescription>
              </CardHeader>
              <CardFooter>
                <StatusBadge kind={o.statusKind} label={o.statusLabel} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
