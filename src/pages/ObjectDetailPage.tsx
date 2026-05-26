import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Boxes } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/commons/primitives";
import { StatusBadge } from "@/components/commons/StatusBadge";
import { getInitials } from "@/lib/utils";
import { objectById, deptLabel } from "@/lib/commons/prototype-data";

export function ObjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const obj = id ? objectById(id) : undefined;

  if (!obj) return <EmptyState icon={Boxes} title="Object not found" />;

  return (
    <>
      <Button variant="ghost" size="sm" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4" /> Back
      </Button>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <StatusBadge kind={obj.statusKind} label={obj.statusLabel} />
            <span className="text-xs text-muted-foreground">{obj.typeLabel}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{obj.title}</h1>
        </div>
        {obj.nextAction && <Button>{obj.nextAction}</Button>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardHeader><CardTitle className="text-base">{obj.typeLabel}</CardTitle></CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {obj.body ?? obj.preview}
            </p>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardContent className="space-y-3 pt-6 text-sm">
            <div className="flex items-center gap-2">
              <Avatar size="sm"><AvatarFallback>{getInitials(obj.owner.replace("Jo from ", ""))}</AvatarFallback></Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Owner</p>
                <p className="font-medium">{obj.owner}</p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between"><span className="text-muted-foreground">Department</span>
              <Link to={`/commons/departments/${obj.department}`} className="font-medium text-primary hover:underline">{deptLabel(obj.department)}</Link>
            </div>
            {obj.dueAt && <div className="flex justify-between"><span className="text-muted-foreground">Due</span><span className="font-medium">{obj.dueAt}</span></div>}
            {obj.meta?.map((m) => (
              <div key={m.label} className="flex justify-between"><span className="text-muted-foreground">{m.label}</span><span className="font-medium">{m.value}</span></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
