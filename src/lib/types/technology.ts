export interface User {
  id: number;
  name: string;
  login: string;
  email?: string;
  company_id?: number;
  company_name?: string;
  groups_id?: number[];
  active?: boolean;
}

export interface CorpusModel {
  id: number;
  name: string;
  model: string;
  state?: string;
  modules?: string;
  transient?: boolean;
}

export interface InstalledModule {
  id: number;
  name: string;
  shortdesc?: string;
  description?: string;
  installed_version?: string;
  application?: boolean;
  category_id?: number;
  category_name?: string;
  state: string;
}

export interface MailServer {
  id: number;
  name: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user?: string;
  smtp_encryption?: string;
  sequence?: number;
  active?: boolean;
}
