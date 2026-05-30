export interface SalesDashboardSummary {
  total_leads: number;
  total_opportunities: number;
  total_contacts: number;
  total_companies: number;
  total_pipeline: number;
  weighted_pipeline: number;
  won_this_month: number;
  lost_this_month: number;
  activities_due_today: number;
  overdue_activities: number;
}

export interface CrmStage {
  id: number;
  name: string;
  sequence: number;
  fold: boolean;
}

export interface CrmLead {
  id: number;
  name: string;
  contact_name?: string;
  email_from?: string;
  phone?: string;
  stage_id?: number;
  stage_name?: string;
  probability?: number;
  expected_revenue?: number;
  priority?: string;
  user_id?: number;
  partner_id?: number;
  partner_name?: string;
  type?: string;
  date_deadline?: string;
  create_date?: string;
  tag_ids?: number[];
  source_id?: number;
  medium_id?: number;
  campaign_id?: number;
  lost_reason_id?: number;
  description?: string;
  active?: boolean;
}

export interface Contact {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  company_id?: number;
  company_name?: string;
  title?: string;
  function?: string;
  street?: string;
  city?: string;
  state_id?: number;
  country_id?: number;
  zip?: string;
  website?: string;
  category_id?: number[];
  is_company: boolean;
  active?: boolean;
}

export interface Company {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  industry_id?: number;
  street?: string;
  city?: string;
  state_id?: number;
  country_id?: number;
  zip?: string;
  employee_count?: number;
  active?: boolean;
}

export interface SalesActivity {
  id: number;
  activity_type_id: number;
  activity_type_name?: string;
  summary?: string;
  note?: string;
  date_deadline: string;
  user_id?: number;
  res_model?: string;
  res_id?: number;
  res_name?: string;
  state?: string;
}

export interface SalesActivityType {
  id: number;
  name: string;
  category?: string;
  delay_count?: number;
  delay_unit?: string;
}

export interface CrmTag {
  id: number;
  name: string;
  color?: number;
}

export interface UtmSource {
  id: number;
  name: string;
}

export interface UtmMedium {
  id: number;
  name: string;
}

export interface UtmCampaign {
  id: number;
  name: string;
  title?: string;
}

export interface CrmLostReason {
  id: number;
  name: string;
}
