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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <CardContent className="space-y-1.5">
                  {connected ? (
                    <Badge variant="success"><Check className="size-3" /> {t.note}</Badge>
                  ) : backend ? (
                    <Badge variant="secondary">{t.note}</Badge>
                  ) : (
                    <Badge variant="outline">{t.note}</Badge>
                  )}
                  {connected && (
                    <p className="text-xs text-muted-foreground">Synced {t.lastSynced ?? "just now"}</p>
                  )}
                  {backend && (
                    <p className="text-xs text-muted-foreground">Syncs continuously</p>
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

  if (setting === "security") {
    return (
      <>
        <PageHeader title="Security & Access" description="Who can review, approve, and connect Tools in your workspace." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Shield className="size-4 text-muted-foreground" /> Access mode</CardTitle>
              <CardDescription>Customer Zero — single-user.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Jeremy Knowles</span>
                <Badge variant="success"><Check className="size-3" /> Full access · Outcome Owner</Badge>
              </div>
              <p className="text-muted-foreground">You can review, approve, edit, reject, and connect Tools.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Team access</CardTitle>
              <CardDescription>Inviting teammates with scoped access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Badge variant="outline">Coming later</Badge>
              <p className="text-muted-foreground">Multi-user access is deferred for the Customer Zero prototype — no enterprise controls are live yet.</p>
            </CardContent>
          </Card>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Prototype: access state is illustrative. No sign-in, sessions, or credentials are stored.</p>
      </>
    );
  }

  // billing
  return (
    <>
      <PageHeader title="Billing" description="Plan and access — a commercial placeholder for the prototype." />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><CreditCard className="size-4 text-muted-foreground" /> Current plan</CardTitle>
            <CardDescription>Customer Zero</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Badge variant="secondary">Internal · not billed</Badge>
            <p className="text-muted-foreground">The commercial version will show plan tier, usage, and invoices here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payment</CardTitle>
            <CardDescription>No payment processing in the prototype.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Billing and entitlements are part of commercial hardening — intentionally not wired here.
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>Manage plan (coming later)</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
