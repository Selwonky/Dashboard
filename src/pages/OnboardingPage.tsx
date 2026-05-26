import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Check, Star, Plus, Globe, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";
import { industryMatches, moreIndustries, type IndustryMatch } from "@/lib/commons/prototype-data";

const steps = [
  { label: "Scan" }, { label: "Identity" }, { label: "Operations" },
  { label: "Market" }, { label: "Connect" }, { label: "Review" }, { label: "Finish" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);

  // Scan
  const [url, setUrl] = React.useState("");
  const [scanState, setScanState] = React.useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = React.useState(0);

  // Identity
  const [company, setCompany] = React.useState("");
  const [mission, setMission] = React.useState("");
  const [tone, setTone] = React.useState("professional");

  // Operations / industry
  const [selected, setSelected] = React.useState<IndustryMatch[]>([]);
  const [primary, setPrimary] = React.useState<string | null>(null);
  const [size, setSize] = React.useState("");

  const runScan = () => {
    setScanState("scanning");
    setProgress(0);
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setScanState("done"); setCompany("Square One Foundry"); setSelected(industryMatches); setPrimary(industryMatches[0].id); return 100; }
        return p + 20;
      });
    }, 200);
  };

  const toggleIndustry = (m: IndustryMatch) => {
    setSelected((s) => {
      const has = s.find((x) => x.id === m.id);
      if (has) {
        const next = s.filter((x) => x.id !== m.id);
        if (primary === m.id) setPrimary(next[0]?.id ?? null);
        return next;
      }
      if (s.length >= 5) return s;
      return [...s, m];
    });
  };

  const addable = moreIndustries.filter((m) => !selected.find((s) => s.id === m.id));
  const canContinueOps = selected.length > 0 && !!primary;

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const stepBody = () => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Let's learn about your company.</CardTitle>
              <CardDescription>We'll find likely industry matches from your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="url">Website URL</Label>
                <div className="relative">
                  <Globe className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="url" type="url" placeholder="https://yourcompany.com" className="pl-8"
                    value={url} onChange={(e) => setUrl(e.target.value)} disabled={scanState === "scanning"} />
                </div>
              </div>
              {scanState === "scanning" && (
                <div className="space-y-2" role="status" aria-busy>
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground">Scanning your website…</p>
                </div>
              )}
              {scanState === "done" && (
                <div className="rounded-lg border bg-accent/40 p-4">
                  <Badge variant="success"><Check className="size-3" /> Scan complete</Badge>
                  <p className="mt-2 text-sm font-medium">{company}</p>
                  <p className="text-sm text-muted-foreground">A precision-parts operation. We found 3 likely industry matches — confirm them in the next steps.</p>
                </div>
              )}
              {scanState !== "done" && (
                <Button onClick={runScan} disabled={!url || scanState === "scanning"}>
                  <Sparkles className="size-4" /> Scan website
                </Button>
              )}
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card><CardHeader><CardTitle className="text-base">Company name</CardTitle></CardHeader>
              <CardContent><Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" /></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base">Tone</CardTitle><CardDescription>How does your company sound?</CardDescription></CardHeader>
              <CardContent>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["formal", "professional", "casual", "friendly"].map((t) => <SelectItem key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </CardContent></Card>
            <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">Mission</CardTitle></CardHeader>
              <CardContent><Textarea value={mission} onChange={(e) => setMission(e.target.value)} placeholder="What does your company set out to do?" /></CardContent></Card>
          </div>
        );
      case 2:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Industry</CardTitle>
                <CardDescription>We found likely matches from your website. Choose the best fit so Jo from can show the right work areas. Star one as primary.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Suggested</p>
                  <div className="flex flex-wrap gap-2">
                    {industryMatches.map((m) => {
                      const on = !!selected.find((s) => s.id === m.id);
                      return (
                        <button key={m.id} onClick={() => toggleIndustry(m)}
                          className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                            on ? "border-primary bg-primary text-primary-foreground" : "hover:bg-accent")}>
                          {on && <Check className="size-3.5" />}{m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selected.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Selected · star your primary</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.map((m) => (
                        <span key={m.id} className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm">
                          <button onClick={() => setPrimary(m.id)} aria-label="Set primary">
                            <Star className={cn("size-3.5", primary === m.id ? "fill-warning text-warning" : "text-muted-foreground")} />
                          </button>
                          {m.label}
                          <button onClick={() => toggleIndustry(m)} className="text-muted-foreground hover:text-foreground">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {addable.length > 0 && selected.length < 5 && (
                  <div className="flex items-center gap-2">
                    <Plus className="size-4 text-muted-foreground" />
                    <Select onValueChange={(id) => { const m = moreIndustries.find((x) => x.id === id); if (m) toggleIndustry(m); }}>
                      <SelectTrigger className="w-64"><SelectValue placeholder="Add another industry" /></SelectTrigger>
                      <SelectContent>{addable.map((m) => <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
                {primary && (
                  <div className="rounded-lg border bg-accent/40 p-3 text-sm">
                    <span className="text-muted-foreground">Work areas unlocked: </span>
                    {selected.find((s) => s.id === primary)?.workAreas.join(", ")}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card><CardHeader><CardTitle className="text-base">Company size</CardTitle></CardHeader>
              <CardContent>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger><SelectValue placeholder="Select size" /></SelectTrigger>
                  <SelectContent>{["1–10", "11–50", "51–200", "201+"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base">Regions</CardTitle></CardHeader>
              <CardContent><Input placeholder="e.g. Midwest US" /></CardContent></Card>
          </div>
        );
      case 3:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card><CardHeader><CardTitle className="text-base">Ideal customer</CardTitle></CardHeader><CardContent><Textarea placeholder="Who are your best customers?" /></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base">Competitors</CardTitle></CardHeader><CardContent><Input placeholder="Add a competitor" /></CardContent></Card>
            <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">Goals</CardTitle><CardDescription>What does success look like this year?</CardDescription></CardHeader><CardContent><Textarea placeholder="e.g. faster quote turnaround, 20% more pipeline" /></CardContent></Card>
          </div>
        );
      case 4:
        return (
          <Card>
            <CardHeader><CardTitle>Connect your Tools</CardTitle><CardDescription>Tools can be connected later. Jo from can still prepare work inside The Commons.</CardDescription></CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {["Google Drive", "Google Calendar", "Gmail", "Jira"].map((t) => (
                <div key={t} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">{t}</span>
                  <Button size="sm" variant="outline">Connect</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <Card><CardHeader><CardTitle className="text-base">Company &amp; Identity</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {company || "—"}</p>
                <p><span className="text-muted-foreground">Tone:</span> {tone}</p>
              </CardContent></Card>
            <Card><CardHeader><CardTitle className="text-base">Operations</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-1.5">
                  {selected.map((m) => <Badge key={m.id} variant={primary === m.id ? "default" : "secondary"}>{primary === m.id && <Star className="size-3" />}{m.label}</Badge>)}
                </div>
                <p><span className="text-muted-foreground">Size:</span> {size || "—"}</p>
              </CardContent></Card>
            <Card className="md:col-span-2"><CardHeader><CardTitle className="text-base">Tools &amp; Knowledge</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">No Tools connected yet — you can connect them anytime from Settings.</CardContent></Card>
          </div>
        );
      case 6:
        return (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[#9333ea] text-white"><Check className="size-7" /></span>
              <div>
                <h2 className="text-xl font-semibold">You're all set.</h2>
                <p className="mt-1 text-muted-foreground">We'll set up your workspace and show the right work areas.</p>
              </div>
              <Button size="lg" className="bg-gradient-to-br from-primary to-[#9333ea] text-white hover:opacity-90" onClick={() => navigate("/commons")}>
                Enter The Commons <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const nextDisabled = (step === 0 && scanState !== "done") || (step === 2 && !canContinueOps);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <Stepper steps={steps} currentStep={step} size="sm" onStepClick={(i) => i <= step && setStep(i)} />
        </div>
        {stepBody()}
        {step < 6 && (
          <>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft className="size-4" /> Back</Button>
              <div className="flex items-center gap-2">
                {step === 4 && <Button variant="ghost" onClick={next}>Skip</Button>}
                <Button onClick={next} disabled={nextDisabled}>
                  Continue <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
            {step === 2 && !canContinueOps && (
              <p className="mt-2 text-right text-xs text-muted-foreground">Select at least one industry and star a primary to continue.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
