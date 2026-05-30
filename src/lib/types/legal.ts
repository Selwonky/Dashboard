export interface Attachment {
  id: number;
  name: string;
  datas_fname?: string;
  mimetype?: string;
  file_size?: number;
  res_model?: string;
  res_id?: number;
  public?: boolean;
  create_uid?: number;
  create_date?: string;
}

export interface LegalMessage {
  id: number;
  subject?: string;
  body: string;
  model?: string;
  res_id?: number;
  author_id?: number;
  author_name?: string;
  date: string;
}

export interface LegalActivity {
  id: number;
  activity_type_id?: number;
  activity_type_name?: string;
  summary?: string;
  note?: string;
  date_deadline: string;
  user_id?: number;
  res_model?: string;
  res_id?: number;
}
