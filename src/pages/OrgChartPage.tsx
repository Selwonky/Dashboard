import * as React from "react";
import { ChevronRight, Sparkles, FileCheck2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/commons/primitives";
import { cn } from "@/lib/utils";
import { orgChart, type OrgJob } from "@/lib/commons/prototype-data";

const levelVariant = { IC: "secondary", "Team Lead": "info", Manager: "warning", "Head of": "default" } as const;

export function OrgChartPage() {
  const [deptId, setDeptId] = React.useState(orgChart[0].id);
  const dept = orgChart.find((d) => d.id === deptId)!;
  const [job, setJob] = React.useState<OrgJob | null>(dept.jobs[0] ?? null);
  const [seed, setSeed] = React.useState(0);

  const selectDept = (id: typeof deptId) => {
    setDeptId(id);
    const d = orgChart.find((x) => x.id === id)!;
    setJob(d.jobs[0] ?? null);
    setSeed(0);
  };

  return (
    <>
      <PageHeader
        title="Maestro OrgChart"
        description="How work is structured beneath you. Tasks roll up to jobs, jobs roll up to departments, and Workflow Seeds produce Compiler Records."
      />
      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border bg-gradient-to-r from-primary/5 to-[#9333ea]/5 px-4 py-3 text-sm">
        <Sparkles className="size-4 text-[#9333ea]" />
        <span><span className="font-medium">You're the Outcome Owner</span> (Head of). Jo from handles IC through Manager work and brings decisions to your Inbox.</span>
      </div>
      <div className="mb-5 flex flex-wrap gap-2 text-xs">
        {(["IC", "Team Lead", "Manager", "Head of"] as const).map((lv) => (
          <span key={lv} className="flex items-center gap-1.5 rounded-full border px-2.5 py-1">
            <span className="size-2 rounded-full bg-primary/70" />{lv}{lv === "Head of" && " · you"}
          </span>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[200px_1fr_1fr]">
        {/* Departments */}
        <Card className="h-fit gap-0 py-2">
          {orgChart.map((d) => (
            <button
              key={d.id}
              onClick={() => selectDept(d.id)}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent",
                d.id === deptId && "bg-accent font-medium"
              )}
            >
              {d.label}
              <ChevronRight className="size-4 text-muted-foreground" />
            </button>
          ))}
        </Card>

        {/* Jobs */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{dept.label} · Jobs</h2>
          {dept.jobs.map((j) => (
            <Card
              key={j.id}
              onClick={() => { setJob(j); setSeed(0); }}
              className={cn(
                "cursor-pointer gap-2 transition-shadow hover:shadow-md",
                job?.id === j.id && "ring-2 ring-ring"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 text-base">
                  {j.title}
                  <Badge variant={levelVariant[j.level]}>{j.level}</Badge>
                </CardTitle>
                <CardDescription>{j.subFamily}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-1.5">
                {j.tasks.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Job detail + workflow seeds */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Workflow seeds</h2>
          {job ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{job.title}</CardTitle>
                <CardDescription>{job.level} · {job.subFamily}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">Tasks</p>
                  <ul className="space-y-1 text-sm">
                    {job.tasks.map((t) => <li key={t} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-primary" />{t}</li>)}
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">Workflow seeds</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.workflowSeeds.map((s, i) => (
                      <button key={s.name} onClick={() => setSeed(i)}
                        className={cn("rounded-full border px-3 py-1 text-xs transition-colors",
                          seed === i ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent")}>
                        {s.name}
                      </button>
                    ))}
                  </div>
                  {job.workflowSeeds[seed] && (
                    <div className="mt-3 rounded-lg border bg-gradient-to-br from-primary/5 to-[#9333ea]/10 p-3">
                      <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-[#9333ea]">
                        <Sparkles className="size-3.5" /> Output preview
                      </p>
                      <p className="text-sm">{job.workflowSeeds[seed].outputPreview}</p>
                    </div>
                  )}
                </div>
                <Separator />
                <div>
                  <p className="mb-1.5 text-xs font-medium uppercase text-muted-foreground">Compiler Records</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.compilerRecords.map((c) => (
                      <Badge key={c} variant="secondary"><FileCheck2 className="size-3" /> {c}</Badge>
                    ))}
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">Structured outputs this job produces — they appear in Recent.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-sm text-muted-foreground">Select a job to see its tasks and workflow seeds.</p>
          )}
        </div>
      </div>
    </>
  );
}
