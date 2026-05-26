import { Link } from "react-router-dom";
import {
  Workflow, Radio, Briefcase, CircleCheck, Zap, FileText, StickyNote,
  Calendar, Megaphone, Wallet, FileSignature, Boxes, Search, Mail,
  Handshake, Users, Shield, ShieldCheck, FileBadge, BadgeCheck, type LucideIcon,
} from "lucide-react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";
import { cn, getInitials } from "@/lib/utils";
import { deptLabel, type ObjectType, type WorkObject } from "@/lib/commons/prototype-data";

const typeGlyph: Partial<Record<ObjectType, LucideIcon>> = {
  workflow: Workflow, signal: Radio, engagement: Briefcase, task: CircleCheck,
  outreach_draft: Mail, prospect: Search, research_brief: FileText, proposal: FileText,
  checklist: CircleCheck, status_report: FileText, content_draft: FileText,
  campaign: Megaphone, invoice: Wallet, agreement: FileSignature, sprint: Boxes,
  ticket: Zap, contract: FileSignature, note: StickyNote,
  // GTM (Sales)
  partner: Handshake, referral: Users, checkin: Handshake,
  insurance_prospect: Shield, quote_package: ShieldCheck, assessment: BadgeCheck,
  licensing: FileBadge,
};

export function ObjectCard({ obj }: { obj: WorkObject }) {
  const Glyph = typeGlyph[obj.type] ?? Calendar;
  const priorityDot =
    obj.priority === "high" ? "bg-destructive" : obj.priority === "medium" ? "bg-warning" : "bg-muted-foreground/40";
  const priorityLabel =
    obj.priority === "high" ? "High priority" : obj.priority === "medium" ? "Medium priority" : "Low priority";
  return (
    <Card className="min-w-0 gap-4 transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex min-w-0 items-center gap-2 text-base">
          {obj.priority && (
            <span className={`size-2 shrink-0 rounded-full ${priorityDot}`} role="img" aria-label={priorityLabel} title={priorityLabel} />
          )}
          <Glyph className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <span className="truncate">{obj.title}</span>
        </CardTitle>
        <CardDescription className="line-clamp-2">{obj.preview}</CardDescription>
        <CardAction>
          <StatusBadge kind={obj.statusKind} label={obj.statusLabel} />
        </CardAction>
      </CardHeader>

      {(obj.meta?.length || obj.nextAction || obj.dueAt) && (
        <CardContent className="space-y-1.5 text-sm">
          {obj.meta?.slice(0, 3).map((m) => (
            <div key={m.label} className="flex justify-between gap-3">
              <span className="shrink-0 text-muted-foreground">{m.label}</span>
              <span className="truncate text-right font-medium text-foreground">{m.value}</span>
            </div>
          ))}
          {obj.nextAction && (
            <div className="flex justify-between gap-3">
              <span className="shrink-0 text-muted-foreground">Next action</span>
              <span className="truncate text-right font-medium text-foreground">{obj.nextAction}</span>
            </div>
          )}
          {obj.dueAt && (
            <div className="flex justify-between gap-3">
              <span className="shrink-0 text-muted-foreground">Due</span>
              <span className="truncate text-right font-medium text-foreground">{obj.dueAt}</span>
            </div>
          )}
        </CardContent>
      )}

      <CardFooter className="gap-2 text-sm text-muted-foreground">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Avatar size="sm" className="shrink-0">
            <AvatarFallback>{getInitials(obj.owner.replace("Jo from ", ""))}</AvatarFallback>
          </Avatar>
          <span className="truncate">{obj.owner}</span>
          <span className="shrink-0 text-muted-foreground/50">·</span>
          <span className="shrink-0">{deptLabel(obj.department)}</span>
        </div>
        <Link
          to={`/commons/objects/detail/${obj.id}`}
          className={cn("shrink-0 font-medium text-primary hover:underline")}
        >
          Open →
        </Link>
      </CardFooter>
    </Card>
  );
}
