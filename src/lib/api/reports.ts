import type {
  DepartmentReport,
  ModelReport,
  CoverageReport,
  OverviewReport,
  DepartmentModelRecords,
} from "@/lib/types/reports";
import { reportsRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, ApiClientError, ModelUnavailableError } from "./client";
import type { SurfaceMeta } from "@/lib/types/commons";

const R = reportsRoutes;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Departments ──
export async function getDepartments(): Promise<{ data: DepartmentReport[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<DepartmentReport>(R.departments); return { data: res.data, meta: live(R.departments) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.departments) }; throw e; }
}

export async function getDepartmentDetail(departmentKey: string): Promise<{ data: DepartmentReport | undefined; meta: SurfaceMeta }> {
  const route = `${R.departments}/${departmentKey}`;
  try { const res = await apiGet<DepartmentReport>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

// ── Models ──
export async function getModels(): Promise<{ data: ModelReport[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<ModelReport>(R.models); return { data: res.data, meta: live(R.models) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.models) }; throw e; }
}

export async function getDepartmentModel(departmentKey: string, modelKey: string): Promise<{ data: ModelReport | undefined; meta: SurfaceMeta }> {
  const route = `${R.departments}/${departmentKey}/models/${modelKey}`;
  try { const res = await apiGet<ModelReport>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function getDepartmentModelRecords(departmentKey: string, modelKey: string): Promise<{ data: DepartmentModelRecords | undefined; meta: SurfaceMeta }> {
  const route = `${R.departments}/${departmentKey}/models/${modelKey}/records`;
  try { const res = await apiGet<DepartmentModelRecords>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

// ── Summary ──
export async function getSummary(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  try { const res = await apiGet<unknown>(R.summary); return { data: res.data ?? null, meta: live(R.summary) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.summary) }; throw e; }
}

// ── Coverage ──
export async function getCoverage(): Promise<{ data: CoverageReport | null; meta: SurfaceMeta }> {
  try { const res = await apiGet<CoverageReport>(R.coverage); return { data: res.data ?? null, meta: live(R.coverage) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.coverage) }; throw e; }
}

// ── Overview ──
export async function getOverview(): Promise<{ data: OverviewReport | null; meta: SurfaceMeta }> {
  try { const res = await apiGet<OverviewReport>(R.overview); return { data: res.data ?? null, meta: live(R.overview) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.overview) }; throw e; }
}
