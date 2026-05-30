export interface DepartmentReport {
  department_key: string;
  department_label: string;
  model_count: number;
  record_count: number;
  available_models: string[];
  unavailable_models: string[];
}

export interface ModelReport {
  model: string;
  department: string;
  record_count: number;
  available: boolean;
  fields: string[];
}

export interface CoverageReport {
  total_departments: number;
  total_models: number;
  available_models: number;
  unavailable_models: number;
  coverage_pct: number;
}

export interface OverviewReport {
  departments: DepartmentReport[];
  coverage: CoverageReport;
}

export interface DepartmentModelRecords {
  model: string;
  department: string;
  records: Record<string, unknown>[];
  count: number;
  limit: number;
  offset: number;
}
