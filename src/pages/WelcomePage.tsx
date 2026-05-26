import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/5 to-transparent" />
      <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[#9333ea] text-white shadow-lg">
        <Sparkles className="size-7" />
      </span>
      <h1 className="relative mt-6 text-4xl font-semibold tracking-tight">
        Welcome to The Commons
      </h1>
      <p className="relative mt-3 max-w-md text-lg text-muted-foreground">
        Your Human + Machine operating workspace. Review approvals, track work, and
        see what Jo from has prepared across your company.
      </p>
      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="bg-gradient-to-br from-primary to-[#9333ea] text-white hover:opacity-90">
          <Link to="/onboarding">Start onboarding <ArrowRight className="size-4" /></Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/commons">Enter The Commons</Link>
        </Button>
      </div>
      <p className="relative mt-10 text-xs text-muted-foreground/60">
        Clickable prototype · fixture data · no sign-in required
      </p>
    </div>
  );
}
