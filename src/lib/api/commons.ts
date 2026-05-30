import type { ApiSuccess } from "@/lib/types/api";
import type {
  WorkObject,
  InboxItem,
  QueueAction,
  OutputRecord,
  ToolConn,
  SurfaceMeta,
} from "@/lib/types/commons";
import { apiGet, apiPost, ApiClientError } from "./client";
import * as fallback from "@/lib/data/commons";

function pending(route: string): SurfaceMeta {
  return { source: "prototype", contractStatus: "pending", route };
}

function live(route: string): SurfaceMeta {
  return { source: "api", contractStatus: "live", route };
}

export async function getObjects(): Promise<{ data: WorkObject[]; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/objects";
  try {
    const res: ApiSuccess<WorkObject[]> = await apiGet(route);
    return { data: res.data ?? [], meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getObjects(), meta: pending(route) };
    }
    throw e;
  }
}

export async function getObject(id: string): Promise<{ data: WorkObject | undefined; meta: SurfaceMeta }> {
  const route = `/api/v1/jo/objects/${id}`;
  try {
    const res: ApiSuccess<WorkObject> = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getObject(id), meta: pending(route) };
    }
    throw e;
  }
}

export async function getInbox(): Promise<{ data: InboxItem[]; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/inbox";
  try {
    const res: ApiSuccess<InboxItem[]> = await apiGet(route);
    return { data: res.data ?? [], meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getInbox(), meta: pending(route) };
    }
    throw e;
  }
}

export async function approveInboxItem(id: string): Promise<{ meta: SurfaceMeta }> {
  const route = `/api/v1/jo/inbox/${id}/approve`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { meta: pending(route) };
    }
    throw e;
  }
}

export async function rejectInboxItem(id: string, reason: string): Promise<{ meta: SurfaceMeta }> {
  const route = `/api/v1/jo/inbox/${id}/reject`;
  try {
    await apiPost(route, { reason });
    return { meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { meta: pending(route) };
    }
    throw e;
  }
}

export async function getQueue(): Promise<{ data: QueueAction[]; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/queue";
  try {
    const res: ApiSuccess<QueueAction[]> = await apiGet(route);
    return { data: res.data ?? [], meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getQueue(), meta: pending(route) };
    }
    throw e;
  }
}

export async function getOutputs(): Promise<{ data: OutputRecord[]; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/outputs";
  try {
    const res: ApiSuccess<OutputRecord[]> = await apiGet(route);
    return { data: res.data ?? [], meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getOutputs(), meta: pending(route) };
    }
    throw e;
  }
}

export async function getOrgChart(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/orgchart";
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getOrgChart(), meta: pending(route) };
    }
    throw e;
  }
}

export async function getTools(): Promise<{ data: ToolConn[]; meta: SurfaceMeta }> {
  const route = "/api/v1/jo/tools";
  try {
    const res: ApiSuccess<ToolConn[]> = await apiGet(route);
    return { data: res.data ?? [], meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getTools(), meta: pending(route) };
    }
    throw e;
  }
}

export async function toggleTool(id: string): Promise<{ meta: SurfaceMeta }> {
  const route = `/api/v1/jo/tools/${id}/toggle`;
  try {
    await apiPost(route);
    return { meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { meta: pending(route) };
    }
    throw e;
  }
}

export async function getDepartmentCategories(departmentId: string): Promise<{ data: unknown; meta: SurfaceMeta }> {
  const route = `/api/v1/jo/departments/${departmentId}/categories`;
  try {
    const res = await apiGet(route);
    return { data: res.data, meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.getDepartmentCategories(departmentId), meta: pending(route) };
    }
    throw e;
  }
}

export async function search(q: string): Promise<{ data: WorkObject[]; meta: SurfaceMeta }> {
  const route = `/api/v1/jo/search?q=${encodeURIComponent(q)}`;
  try {
    const res: ApiSuccess<WorkObject[]> = await apiGet(route);
    return { data: res.data ?? [], meta: live(route) };
  } catch (e) {
    if (e instanceof ApiClientError) {
      return { data: fallback.search(q), meta: pending(route) };
    }
    throw e;
  }
}
