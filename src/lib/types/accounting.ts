export interface Invoice {
  id: number;
  name: string;
  move_type: string;
  partner_id?: number;
  partner_name?: string;
  amount_total?: number;
  amount_residual?: number;
  payment_state?: string;
  invoice_date?: string;
  journal_id?: number;
  journal_name?: string;
  state: string;
  currency_id?: number;
}

export interface MoveLine {
  id: number;
  name: string;
  debit: number;
  credit: number;
  balance: number;
  account_id?: number;
  account_name?: string;
  partner_id?: number;
  partner_name?: string;
  move_id?: number;
  move_name?: string;
  date: string;
}

export interface Account {
  id: number;
  name: string;
  code: string;
  account_type?: string;
  company_id?: number;
  currency_id?: number;
  deprecated?: boolean;
  active?: boolean;
}

export interface AccountingPayment {
  id: number;
  name: string;
  partner_id?: number;
  partner_name?: string;
  amount: number;
  date: string;
  journal_id?: number;
  journal_name?: string;
  state: string;
}
