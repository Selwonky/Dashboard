export interface OperationsDashboardSummary {
  total_projects: number;
  total_tasks: number;
  tasks_due_today: number;
  overdue_tasks: number;
  total_todos: number;
  total_notes: number;
  total_purchases: number;
  total_maintenance: number;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  partner_id?: number;
  partner_name?: string;
  user_id?: number;
  date_start?: string;
  date?: string;
  task_count?: number;
  active?: boolean;
}

export interface ProjectTask {
  id: number;
  name: string;
  project_id?: number;
  project_name?: string;
  stage_id?: number;
  stage_name?: string;
  user_ids?: number[];
  date_deadline?: string;
  priority?: string;
  tag_ids?: number[];
  description?: string;
  parent_id?: number;
  child_ids?: number[];
  active?: boolean;
}

export interface TaskStage {
  id: number;
  name: string;
  sequence: number;
  fold: boolean;
}

export interface TaskTag {
  id: number;
  name: string;
  color?: number;
}

export interface Todo {
  id: number;
  name: string;
  note?: string;
  date_deadline?: string;
  user_id?: number;
  state: string;
  active?: boolean;
}

export interface OperationsNote {
  id: number;
  name: string;
  memo?: string;
  date?: string;
  user_id?: number;
  model?: string;
  res_id?: number;
}

export interface PurchaseOrder {
  id: number;
  name: string;
  partner_id?: number;
  partner_name?: string;
  date_order?: string;
  state: string;
  amount_total?: number;
  currency_id?: number;
}

export interface MaintenanceRequest {
  id: number;
  name: string;
  description?: string;
  request_date?: string;
  user_id?: number;
  stage_id?: number;
  priority?: string;
  schedule_date?: string;
  active?: boolean;
}
