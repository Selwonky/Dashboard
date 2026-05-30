import type { ApiSuccess, ApiError } from "@/lib/types/api";
import { getAccessToken } from "./auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

class ApiClientError extends Error {
  status: number;
  detail: string;
  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiClientError";
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<ApiSuccess<T>> {
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

  return res.json() as Promise<ApiSuccess<T>>;
}

export async function apiGet<T>(path: string): Promise<ApiSuccess<T>> {
  return request<T>("GET", path);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<ApiSuccess<T>> {
  return request<T>("POST", path, body);
}

export async function apiPut<T>(path: string, body?: unknown): Promise<ApiSuccess<T>> {
  return request<T>("PUT", path, body);
}

export async function apiDelete<T>(path: string): Promise<ApiSuccess<T>> {
  return request<T>("DELETE", path);
}

export { ApiClientError };
