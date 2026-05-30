import type { SurfaceMeta } from "@/lib/types/commons";
import type {
  OperationsDashboardSummary, Project, ProjectTask, TaskStage, TaskTag,
  Todo, OperationsNote, PurchaseOrder, MaintenanceRequest,
} from "@/lib/types/operations";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiPost, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.operations;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Dashboard ──
export async function getDashboardSummary(): Promise<{ data: OperationsDashboardSummary | null; meta: SurfaceMeta }> {
  try { const res = await apiGet<OperationsDashboardSummary>(R.summary); return { data: res.data ?? null, meta: live(R.summary) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.summary) }; throw e; }
}

export async function getDashboardToday(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  try { const res = await apiGet<unknown>(R.today); return { data: res.data ?? null, meta: live(R.today) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.today) }; throw e; }
}

// ── Projects ──
export async function getProjects(): Promise<{ data: Project[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Project>(R.projects); return { data: res.data, meta: live(R.projects) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.projects) }; throw e; }
}

export async function getProject(id: number): Promise<{ data: Project | undefined; meta: SurfaceMeta }> {
  const route = `${R.projects}/${id}`;
  try { const res = await apiGet<Project>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createProject(body: Partial<Project>): Promise<{ data: Project | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Project>(R.projects, body); return { data: res.data, id: res.id, meta: live(R.projects) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.projects) }; throw e; }
}

export async function updateProject(id: number, body: Partial<Project>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.projects}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteProject(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.projects}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getProjectTasks(projectId: number): Promise<{ data: ProjectTask[]; meta: SurfaceMeta }> {
  const route = `${R.projects}/${projectId}/tasks`;
  try { const res = await apiGetList<ProjectTask>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function getProjectMilestones(projectId: number): Promise<{ data: unknown[]; meta: SurfaceMeta }> {
  const route = `${R.projects}/${projectId}/milestones`;
  try { const res = await apiGetList(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

// ── Tasks ──
export async function getTasks(): Promise<{ data: ProjectTask[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<ProjectTask>(R.tasks); return { data: res.data, meta: live(R.tasks) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.tasks) }; throw e; }
}

export async function getTask(id: number): Promise<{ data: ProjectTask | undefined; meta: SurfaceMeta }> {
  const route = `${R.tasks}/${id}`;
  try { const res = await apiGet<ProjectTask>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createTask(body: Partial<ProjectTask>): Promise<{ data: ProjectTask | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<ProjectTask>(R.tasks, body); return { data: res.data, id: res.id, meta: live(R.tasks) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.tasks) }; throw e; }
}

export async function updateTask(id: number, body: Partial<ProjectTask>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.tasks}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteTask(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.tasks}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function moveTaskStage(taskId: number, stageId: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.tasks}/${taskId}/stage`;
  try { await apiPut(route, { stage_id: stageId }); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getSubtasks(taskId: number): Promise<{ data: ProjectTask[]; meta: SurfaceMeta }> {
  const route = `${R.tasks}/${taskId}/subtasks`;
  try { const res = await apiGetList<ProjectTask>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function createSubtask(taskId: number, body: Partial<ProjectTask>): Promise<{ data: ProjectTask | undefined; id?: number; meta: SurfaceMeta }> {
  const route = `${R.tasks}/${taskId}/subtasks`;
  try { const res = await apiCreate<ProjectTask>(route, body); return { data: res.data, id: res.id, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

// ── Task Reference Data ──
export async function getTaskStages(): Promise<{ data: TaskStage[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<TaskStage>(R.taskStages); return { data: res.data, meta: live(R.taskStages) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.taskStages) }; throw e; }
}

export async function getTaskTags(): Promise<{ data: TaskTag[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<TaskTag>(R.taskTags); return { data: res.data, meta: live(R.taskTags) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.taskTags) }; throw e; }
}

// ── Todos ──
export async function getTodos(): Promise<{ data: Todo[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Todo>(R.todos); return { data: res.data, meta: live(R.todos) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.todos) }; throw e; }
}

export async function createTodo(body: Partial<Todo>): Promise<{ data: Todo | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Todo>(R.todos, body); return { data: res.data, id: res.id, meta: live(R.todos) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.todos) }; throw e; }
}

export async function updateTodo(id: number, body: Partial<Todo>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.todos}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteTodo(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.todos}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function markTodoDone(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.todos}/${id}/done`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function convertTodoToTask(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.todos}/${id}/convert-to-task`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Notes ──
export async function getNotes(): Promise<{ data: OperationsNote[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<OperationsNote>(R.notes); return { data: res.data, meta: live(R.notes) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.notes) }; throw e; }
}

export async function createNote(body: Partial<OperationsNote>): Promise<{ data: OperationsNote | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<OperationsNote>(R.notes, body); return { data: res.data, id: res.id, meta: live(R.notes) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.notes) }; throw e; }
}

export async function getNote(id: number): Promise<{ data: OperationsNote | undefined; meta: SurfaceMeta }> {
  const route = `${R.notes}/${id}`;
  try { const res = await apiGet<OperationsNote>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function updateNote(id: number, body: Partial<OperationsNote>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.notes}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteNote(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.notes}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function searchNotes(q: string): Promise<{ data: OperationsNote[]; meta: SurfaceMeta }> {
  const route = `${R.notes}/search`;
  try { const res = await apiGetList<OperationsNote>(`${route}?q=${encodeURIComponent(q)}`); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function linkNote(noteId: number, body: { model: string; res_id: number }): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.notes}/${noteId}/link`;
  try { await apiPost(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Purchases ──
export async function getPurchases(): Promise<{ data: PurchaseOrder[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<PurchaseOrder>(R.purchases); return { data: res.data, meta: live(R.purchases) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.purchases) }; throw e; }
}

export async function getPurchase(id: number): Promise<{ data: PurchaseOrder | undefined; meta: SurfaceMeta }> {
  const route = `${R.purchases}/${id}`;
  try { const res = await apiGet<PurchaseOrder>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createPurchase(body: Partial<PurchaseOrder>): Promise<{ data: PurchaseOrder | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<PurchaseOrder>(R.purchases, body); return { data: res.data, id: res.id, meta: live(R.purchases) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.purchases) }; throw e; }
}

export async function updatePurchase(id: number, body: Partial<PurchaseOrder>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.purchases}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deletePurchase(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.purchases}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Maintenance ──
export async function getMaintenanceRequests(): Promise<{ data: MaintenanceRequest[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<MaintenanceRequest>(R.maintenance); return { data: res.data, meta: live(R.maintenance) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.maintenance) }; throw e; }
}

export async function getMaintenanceRequest(id: number): Promise<{ data: MaintenanceRequest | undefined; meta: SurfaceMeta }> {
  const route = `${R.maintenance}/${id}`;
  try { const res = await apiGet<MaintenanceRequest>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMaintenanceRequest(body: Partial<MaintenanceRequest>): Promise<{ data: MaintenanceRequest | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<MaintenanceRequest>(R.maintenance, body); return { data: res.data, id: res.id, meta: live(R.maintenance) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.maintenance) }; throw e; }
}

export async function updateMaintenanceRequest(id: number, body: Partial<MaintenanceRequest>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.maintenance}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMaintenanceRequest(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.maintenance}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}
