export interface Payment {
  id: number;
  name: string;
  partner_id?: number;
  partner_name?: string;
  amount: number;
  date: string;
  journal_id?: number;
  journal_name?: string;
  payment_method_id?: number;
  payment_method_name?: string;
  state: string;
  payment_type?: string;
  currency_id?: number;
}

export interface AccountMove {
  id: number;
  name: string;
  move_type: string;
  partner_id?: number;
  partner_name?: string;
  amount_total?: number;
  amount_residual?: number;
  state: string;
  payment_state?: string;
  journal_id?: number;
  journal_name?: string;
  invoice_date?: string;
  date?: string;
  currency_id?: number;
}

export interface AccountJournal {
  id: number;
  name: string;
  code: string;
  type: string;
  company_id?: number;
  currency_id?: number;
  active?: boolean;
}

export interface PaymentProvider {
  id: number;
  name: string;
  code: string;
  state: string;
  is_published?: boolean;
  company_id?: number;
}
