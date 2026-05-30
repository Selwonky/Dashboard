import type { SurfaceMeta } from "@/lib/types/commons";
import type {
  MarketingDashboardSummary, Campaign, CampaignAnalytics,
  MailingList, MailingContact, TrackedLink, LinkClick,
  MarketingEvent, EventRegistration,
} from "@/lib/types/marketing";
import { departmentRoutes } from "@/lib/types/departments";
import { apiGet, apiGetList, apiPost, apiCreate, apiPut, apiDelete, ApiClientError, ModelUnavailableError } from "./client";

const R = departmentRoutes.marketing;

function pending(route: string): SurfaceMeta { return { source: "prototype", contractStatus: "pending", route }; }
function live(route: string): SurfaceMeta { return { source: "api", contractStatus: "live", route }; }
function isFallback(e: unknown) { return e instanceof ApiClientError || e instanceof ModelUnavailableError; }

// ── Dashboard ──
export async function getDashboardSummary(): Promise<{ data: MarketingDashboardSummary | null; meta: SurfaceMeta }> {
  try { const res = await apiGet<MarketingDashboardSummary>(R.summary); return { data: res.data ?? null, meta: live(R.summary) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.summary) }; throw e; }
}

export async function getDashboardToday(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  try { const res = await apiGet<unknown>(R.today); return { data: res.data ?? null, meta: live(R.today) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.today) }; throw e; }
}

// ── Campaigns ──
export async function getCampaigns(): Promise<{ data: Campaign[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<Campaign>(R.campaigns); return { data: res.data, meta: live(R.campaigns) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.campaigns) }; throw e; }
}

export async function getCampaign(id: number): Promise<{ data: Campaign | undefined; meta: SurfaceMeta }> {
  const route = `${R.campaigns}/${id}`;
  try { const res = await apiGet<Campaign>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createCampaign(body: Partial<Campaign>): Promise<{ data: Campaign | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<Campaign>(R.campaigns, body); return { data: res.data, id: res.id, meta: live(R.campaigns) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.campaigns) }; throw e; }
}

export async function updateCampaign(id: number, body: Partial<Campaign>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.campaigns}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function sendCampaign(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.campaigns}/${id}/send`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function testCampaign(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.campaigns}/${id}/test`;
  try { await apiPost(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getCampaignAnalytics(id: number): Promise<{ data: CampaignAnalytics | undefined; meta: SurfaceMeta }> {
  const route = `${R.campaigns}/${id}/analytics`;
  try { const res = await apiGet<CampaignAnalytics>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

// ── Mailing Lists ──
export async function getMailingLists(): Promise<{ data: MailingList[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<MailingList>(R.mailingLists); return { data: res.data, meta: live(R.mailingLists) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.mailingLists) }; throw e; }
}

export async function getMailingList(id: number): Promise<{ data: MailingList | undefined; meta: SurfaceMeta }> {
  const route = `${R.mailingLists}/${id}`;
  try { const res = await apiGet<MailingList>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMailingList(body: Partial<MailingList>): Promise<{ data: MailingList | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<MailingList>(R.mailingLists, body); return { data: res.data, id: res.id, meta: live(R.mailingLists) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.mailingLists) }; throw e; }
}

export async function updateMailingList(id: number, body: Partial<MailingList>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailingLists}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function addContactsToList(listId: number, contactIds: number[]): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailingLists}/${listId}/add-contacts`;
  try { await apiPost(route, { contact_ids: contactIds }); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function removeContactsFromList(listId: number, contactIds: number[]): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailingLists}/${listId}/remove-contacts`;
  try { await apiPost(route, { contact_ids: contactIds }); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Mailing Contacts ──
export async function getMailingContacts(): Promise<{ data: MailingContact[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<MailingContact>(R.mailingContacts); return { data: res.data, meta: live(R.mailingContacts) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.mailingContacts) }; throw e; }
}

export async function getMailingContact(id: number): Promise<{ data: MailingContact | undefined; meta: SurfaceMeta }> {
  const route = `${R.mailingContacts}/${id}`;
  try { const res = await apiGet<MailingContact>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createMailingContact(body: Partial<MailingContact>): Promise<{ data: MailingContact | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<MailingContact>(R.mailingContacts, body); return { data: res.data, id: res.id, meta: live(R.mailingContacts) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.mailingContacts) }; throw e; }
}

export async function updateMailingContact(id: number, body: Partial<MailingContact>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailingContacts}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function deleteMailingContact(id: number): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.mailingContacts}/${id}`;
  try { await apiDelete(route); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Tracked Links ──
export async function getLinks(): Promise<{ data: TrackedLink[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<TrackedLink>(R.links); return { data: res.data, meta: live(R.links) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.links) }; throw e; }
}

export async function getLink(id: number): Promise<{ data: TrackedLink | undefined; meta: SurfaceMeta }> {
  const route = `${R.links}/${id}`;
  try { const res = await apiGet<TrackedLink>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createLink(body: Partial<TrackedLink>): Promise<{ data: TrackedLink | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<TrackedLink>(R.links, body); return { data: res.data, id: res.id, meta: live(R.links) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.links) }; throw e; }
}

export async function getLinkClicks(id: number): Promise<{ data: LinkClick[]; meta: SurfaceMeta }> {
  const route = `${R.links}/${id}/clicks`;
  try { const res = await apiGetList<LinkClick>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

// ── Events ──
export async function getEvents(): Promise<{ data: MarketingEvent[]; meta: SurfaceMeta }> {
  try { const res = await apiGetList<MarketingEvent>(R.events); return { data: res.data, meta: live(R.events) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(R.events) }; throw e; }
}

export async function getEvent(id: number): Promise<{ data: MarketingEvent | undefined; meta: SurfaceMeta }> {
  const route = `${R.events}/${id}`;
  try { const res = await apiGet<MarketingEvent>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(route) }; throw e; }
}

export async function createEvent(body: Partial<MarketingEvent>): Promise<{ data: MarketingEvent | undefined; id?: number; meta: SurfaceMeta }> {
  try { const res = await apiCreate<MarketingEvent>(R.events, body); return { data: res.data, id: res.id, meta: live(R.events) }; }
  catch (e) { if (isFallback(e)) return { data: undefined, meta: pending(R.events) }; throw e; }
}

export async function updateEvent(id: number, body: Partial<MarketingEvent>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.events}/${id}`;
  try { await apiPut(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

export async function getEventRegistrations(id: number): Promise<{ data: EventRegistration[]; meta: SurfaceMeta }> {
  const route = `${R.events}/${id}/registrations`;
  try { const res = await apiGetList<EventRegistration>(route); return { data: res.data, meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { data: [], meta: pending(route) }; throw e; }
}

export async function registerForEvent(eventId: number, body: Partial<EventRegistration>): Promise<{ meta: SurfaceMeta }> {
  const route = `${R.events}/${eventId}/register`;
  try { await apiPost(route, body); return { meta: live(route) }; }
  catch (e) { if (isFallback(e)) return { meta: pending(route) }; throw e; }
}

// ── Event Analytics ──
export async function getEventAnalytics(): Promise<{ data: unknown; meta: SurfaceMeta }> {
  try { const res = await apiGet<unknown>(R.eventAnalytics); return { data: res.data ?? null, meta: live(R.eventAnalytics) }; }
  catch (e) { if (isFallback(e)) return { data: null, meta: pending(R.eventAnalytics) }; throw e; }
}
