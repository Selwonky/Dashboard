import { useParams } from "react-router-dom";
import { Shield, CreditCard, Compass, Plug, Check, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} from "@/components/ui/tooltip";
import { PageHeader, EmptyState } from "@/components/commons/primitives";
import { tools } from "@/lib/commons/prototype-data";
import { useCommons } from "@/lib/commons/store";

function ToolsSettings() {
  const { toolState, toggleTool } = useCommons();
  return (
    <>
      <PageHeader
        title="Tools"
        description="Connect Drive, Calendar, or Gmail when you're ready. Jo from can still prepare work inside The Commons."
      />
      <TooltipProvider>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => {
            const status = toolState[t.id];
            const connected = status === "connected";
            const backend = status === "backend";
            return (
              <Card key={t.id} className="gap-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="grid size-8 place-items-center rounded-md border bg-accent/50"><Plug className="size-4 text-muted-foreground" /></span>
                    {t.label}
                  </CardTitle>
                  <CardDescription>{t.why}</CardDescription>
                </CardHeader>
                <CardContent>
                  {connected ? (
                    <Badge variant="success"><Check className="size-3" /> {t.note}</Badge>
                  ) : backend ? (
                    <Badge variant="secondary">{t.note}</Badge>
                  ) : (
                    <Badge variant="outline">{t.note}</Badge>
                  )}
                </CardContent>
                <CardFooter className="gap-2">
                  {!backend && (
                    <Button size="sm" variant={connected ? "outline" : "default"} onClick={() => toggleTool(t.id)}>
                      {connected ? "Disconnect" : "Connect"}
                    </Button>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="ghost"><HelpCircle className="size-4" /> Why needed</Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-56">{t.why}</TooltipContent>
                  </Tooltip>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </TooltipProvider>
      <p className="mt-6 text-xs text-muted-foreground">
        Connections are local to this prototype. Security &amp; Access settings control who can connect Tools.
      </p>
    </>
  );
}

export function SettingsPage() {
  const { setting } = useParams<{ setting: string }>();

  if (setting === "tools") return <ToolsSettings />;

  if (setting === "onboarding") {
    return (
      <>
        <PageHeader title="Onboarding" description="Your company profile and the work areas it unlocked." />
        <EmptyState
          icon={Compass}
          title="Company profile complete"
          description="Industries: Professional Services (primary), Field Services. Work areas unlocked: Sales, Operations, Finance, Workforce. Re-run onboarding to extend your profile."
          action={<Button variant="outline">Re-run onboarding</Button>}
        />
      </>
    );
  }

  const placeholder = setting === "security"
    ? { icon: Shield, title: "Security & Access", desc: "Manage who can review, approve, and connect Tools. This area is on the way." }
    : { icon: CreditCard, title: "Billing", desc: "Plans, usage, and invoices. This area is on the way." };

  return (
    <>
      <PageHeader title={placeholder.title} />
      <EmptyState icon={placeholder.icon} title="We're preparing this part of your workspace." description={placeholder.desc} />
    </>
  );
}
