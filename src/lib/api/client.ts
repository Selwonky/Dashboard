import type { ApiSuccess, ApiListSuccess, ApiCreateSuccess, ApiDeleteSuccess, ApiUnavailable, ApiError } from "@/lib/types/api";
import { getAccessToken } from "./auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export class ApiClientError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiClientError";
    this.status = status;
    this.detail = detail;
  }
}

export class ModelUnavailableError extends Error {
  model: string;
  constructor(model: string, message: string) {
    super(message);
    this.name = "ModelUnavailableError";
    this.model = model;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const token = getAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const err: ApiError = await res.json();
      if (err.detail) detail = err.detail;
    } catch {
      // response was not JSON
    }
    throw new ApiClientError(res.status, detail);
  }

  const json = await res.json();

  if (json.status === "unavailable") {
    const u = json as ApiUnavailable;
    throw new ModelUnavailableError(u.model, u.error);
  }

  return json as T;
}

export async function apiGet<T>(path: string): Promise<ApiSuccess<T>> {
  return request<ApiSuccess<T>>("GET", path);
}

export async function apiGetList<T>(path: string): Promise<ApiListSuccess<T>> {
  return request<ApiListSuccess<T>>("GET", path);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<ApiSuccess<T>> {
  return request<ApiSuccess<T>>("POST", path, body);
}

export async function apiCreate<T>(path: string, body?: unknown): Promise<ApiCreateSuccess<T>> {
  return request<ApiCreateSuccess<T>>("POST", path, body);
}

export async function apiPut<T>(path: string, body?: unknown): Promise<ApiSuccess<T>> {
  return request<ApiSuccess<T>>("PUT", path, body);
}

export async function apiDelete(path: string): Promise<ApiDeleteSuccess> {
  return request<ApiDeleteSuccess>("DELETE", path);
}
