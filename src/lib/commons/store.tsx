import * as React from "react";
import {
  inboxItems as seedInbox,
  tools as seedTools,
  queueActions as seedQueue,
  type InboxItem,
  type ToolConn,
  type QueueAction,
} from "./prototype-data";

type InboxState = Record<string, "pending" | "approved" | "rejected" | "edited">;

interface CommonsState {
  inbox: InboxItem[];
  inboxState: InboxState;
  rejectReasons: Record<string, string>;
  edits: Record<string, string>;
  toolState: Record<string, ToolConn["status"]>;
  queue: QueueAction[];
  approve: (id: string) => void;
  reject: (id: string, reason: string) => void;
  saveEdit: (id: string, text: string) => void;
  toggleTool: (id: string) => void;
}

const Ctx = React.createContext<CommonsState | null>(null);

export function CommonsProvider({ children }: { children: React.ReactNode }) {
  const [inboxState, setInboxState] = React.useState<InboxState>(
    () => Object.fromEntries(seedInbox.map((i) => [i.id, "pending"]))
  );
  const [rejectReasons, setRejectReasons] = React.useState<Record<string, string>>({});
  const [edits, setEdits] = React.useState<Record<string, string>>({});
  const [toolState, setToolState] = React.useState<Record<string, ToolConn["status"]>>(
    () => Object.fromEntries(seedTools.map((t) => [t.id, t.status]))
  );
  const [queue, setQueue] = React.useState<QueueAction[]>(seedQueue);

  const approve = (id: string) => {
    setInboxState((s) => ({ ...s, [id]: "approved" }));
    const item = seedInbox.find((i) => i.id === id);
    if (item)
      setQueue((q) =>
        q.map((a) =>
          a.sourceObjectId === item.objectId ? { ...a, status: "completed", updatedAt: "just now" } : a
        )
      );
  };
  const reject = (id: string, reason: string) => {
    setInboxState((s) => ({ ...s, [id]: "rejected" }));
    setRejectReasons((r) => ({ ...r, [id]: reason }));
  };
  const saveEdit = (id: string, text: string) => {
    setEdits((e) => ({ ...e, [id]: text }));
    setInboxState((s) => ({ ...s, [id]: s[id] === "pending" ? "edited" : s[id] }));
  };
  const toggleTool = (id: string) =>
    setToolState((s) => ({
      ...s,
      [id]: s[id] === "connected" ? "not_connected" : s[id] === "not_connected" ? "connected" : s[id],
    }));

  const value: CommonsState = {
    inbox: seedInbox,
    inboxState,
    rejectReasons,
    edits,
    toolState,
    queue,
    approve,
    reject,
    saveEdit,
    toggleTool,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCommons() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCommons must be used within CommonsProvider");
  return ctx;
}
