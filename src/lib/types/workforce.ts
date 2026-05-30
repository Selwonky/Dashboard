export interface Employee {
  id: number;
  name: string;
  job_title?: string;
  department_id?: number;
  department_name?: string;
  manager_id?: number;
  manager_name?: string;
  work_email?: string;
  work_phone?: string;
  resource_id?: number;
  active?: boolean;
}

export interface Applicant {
  id: number;
  partner_name?: string;
  email_from?: string;
  partner_phone?: string;
  job_id?: number;
  job_name?: string;
  stage_id?: number;
  stage_name?: string;
  priority?: string;
  salary_expected?: number;
  availability?: string;
  description?: string;
  active?: boolean;
}

export interface Job {
  id: number;
  name: string;
  department_id?: number;
  department_name?: string;
  no_of_recruitment?: number;
  no_of_hired_employee?: number;
  requirements?: string;
  description?: string;
  state?: string;
  active?: boolean;
}

export interface Attendance {
  id: number;
  employee_id: number;
  employee_name?: string;
  check_in: string;
  check_out?: string;
  worked_hours?: number;
}

export interface Resource {
  id: number;
  name: string;
  resource_type?: string;
  user_id?: number;
  company_id?: number;
  calendar_id?: number;
  active?: boolean;
}

export interface LunchOrder {
  id: number;
  user_id?: number;
  product_id?: number;
  product_name?: string;
  date: string;
  state: string;
  price?: number;
  quantity?: number;
}
