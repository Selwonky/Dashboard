export interface Ticket {
  id: number;
  name: string;
  partner_id?: number;
  partner_name?: string;
  team_id?: number;
  team_name?: string;
  user_id?: number;
  user_name?: string;
  stage_id?: number;
  stage_name?: string;
  priority?: string;
  description?: string;
  create_date?: string;
  active?: boolean;
}

export interface SupportMessage {
  id: number;
  subject?: string;
  body: string;
  model?: string;
  res_id?: number;
  author_id?: number;
  author_name?: string;
  date: string;
}

export interface Rating {
  id: number;
  rating?: number;
  feedback?: string;
  res_model?: string;
  res_id?: number;
  partner_id?: number;
  partner_name?: string;
  consumed?: boolean;
  create_date?: string;
}

export interface LivechatChannel {
  id: number;
  name: string;
  user_ids?: number[];
  available_operator_ids?: number[];
  button_text?: string;
  default_message?: string;
  active?: boolean;
}
