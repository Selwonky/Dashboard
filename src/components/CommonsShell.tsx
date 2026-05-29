import * as React from "react";
import { Link, NavLink, useLocation, Outlet } from "react-router-dom";
import { Search, Bell, PanelLeftClose, PanelLeft, Sparkles, Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { navGroups } from "@/lib/navigation";
import { Input } from "@jofrom/design-system/form";
import { Button } from "@jofrom/design-system/ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@jofrom/design-system/ui";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCommons } from "@/lib/store";
import { objectById, departments } from "@/lib/prototype-data";

function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link to="/home" className="flex items-center gap-2 px-2 py-1">
      <span className="grid size-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-primary to-[#9333ea] text-white">
        <Sparkles className="size-4" />
      </span>
      {!compact && (
        <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
          Jo from <span className="font-normal text-sidebar-foreground/60">· The Commons</span>
        </span>
      )}
    </Link>
  );
}

function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const { inbox, inboxState } = useCommons();
  const pendingInbox = inbox.filter((i) => inboxState[i.id] === "pending").length;
  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-4">
      {navGroups.map((group) => (
        <div key={group.label}>
          {!collapsed && (
            <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
              {group.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const Icon = item.icon;
              const badge = item.to === "/inbox" && pendingInbox > 0 ? pendingInbox : null;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/home"}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        isActive && "bg-sidebar-accent font-medium text-sidebar-foreground",
                        collapsed && "justify-center px-0"
                      )
                    }
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && badge && (
                      <Badge variant="solid" color="brand" size="sm" className="ml-auto">{badge}</Badge>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-2">
        <Logo compact={collapsed} />
      </div>
      <NavList collapsed={collapsed} />
      {!collapsed && (
        <div className="border-t border-sidebar-border p-3 text-[11px] text-sidebar-foreground/40">
          Prototype · fixture data
        </div>
      )}
    </aside>
  );
}

const crumbLabels: Record<string, string> = {
  home: "Home", inbox: "Inbox", queue: "Queue", recent: "Recent",
  objects: "Objects", departments: "Departments", settings: "Settings",
  orgchart: "Maestro OrgChart", detail: "Object", tools: "Tools",
  security: "Security & Access", billing: "Billing", onboarding: "Onboarding",
};

function TopBar({
  onToggle,
  collapsed,
  onOpenMobile,
}: {
  onToggle: () => void;
  collapsed: boolean;
  onOpenMobile: () => void;
}) {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const parts = pathname.split("/").filter(Boolean);
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
      <Button variant="ghost" size="icon" onClick={onOpenMobile} className="h-9 w-9 md:hidden" aria-label="Open menu">
        <Menu className="size-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onToggle} className="hidden h-9 w-9 md:inline-flex" aria-label="Toggle sidebar">
        {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
      </Button>
      <nav aria-label="Breadcrumb" className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
        {parts.map((p, i) => {
          const label =
            crumbLabels[p] ??
            objectById(p)?.title ??
            departments.find((d) => d.id === p)?.label ??
            p.charAt(0).toUpperCase() + p.slice(1);
          return (
            <span key={i} className="flex items-center gap-1">
              <span className="text-muted-foreground/40">/</span>
              <span className={cn("max-w-[16rem] truncate", i === parts.length - 1 && "font-medium text-foreground")}>
                {label}
              </span>
            </span>
          );
        })}
      </nav>
      <div className="relative ml-auto hidden w-64 md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search work…" className="h-9 pl-8" />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="ml-auto h-9 w-9 md:ml-0"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Notifications">
        <Bell className="size-4" />
      </Button>
      <Avatar size="sm">
        <AvatarFallback>JK</AvatarFallback>
      </Avatar>
    </header>
  );
}

export function CommonsShell() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar collapsed={collapsed} />

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-14 items-center border-b border-sidebar-border px-2">
            <Logo />
          </div>
          <NavList collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onToggle={() => setCollapsed((c) => !c)} collapsed={collapsed} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
