export interface MarketingDashboardSummary {
  total_campaigns: number;
  total_mailing_lists: number;
  total_mailing_contacts: number;
  total_tracked_links: number;
  total_events: number;
  total_registrations: number;
  scheduled_campaigns: number;
  recent_campaigns: number;
  upcoming_events: number;
}

export interface Campaign {
  id: number;
  name: string;
  subject?: string;
  body_html?: string;
  state: string;
  mailing_model_id?: number;
  mailing_model_name?: string;
  contact_list_ids?: number[];
  sent?: number;
  delivered?: number;
  opened?: number;
  clicked?: number;
  replied?: number;
  bounced?: number;
  scheduled_date?: string;
  create_date?: string;
}

export interface CampaignAnalytics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
}

export interface MailingList {
  id: number;
  name: string;
  contact_count?: number;
  is_public?: boolean;
  active?: boolean;
}

export interface MailingContact {
  id: number;
  name: string;
  email: string;
  list_ids?: number[];
  opt_out?: boolean;
  tag_ids?: number[];
  create_date?: string;
}

export interface TrackedLink {
  id: number;
  url: string;
  title?: string;
  short_url?: string;
  count?: number;
  campaign_id?: number;
  source_id?: number;
  medium_id?: number;
}

export interface LinkClick {
  id: number;
  click_date: string;
  ip?: string;
  country_id?: number;
}

export interface MarketingEvent {
  id: number;
  name: string;
  date_begin: string;
  date_end: string;
  location?: string;
  description?: string;
  state: string;
  seats_max?: number;
  seats_available?: number;
  registration_count?: number;
}

export interface EventRegistration {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  state: string;
  event_id: number;
  create_date?: string;
}
