/**
 * Slim API client matching generated webapp service call style:
 *   apiClient.get/post(url, { body?, signal? }) → ApiResponse<T>
 *
 * Always sends X-API-Key (demo default matches api-server seed).
 * Optional Bearer token from localStorage after operator login.
 * Strips codegen `/orgs/{orgId}` prefixes for Portiva's unscoped routes.
 */

import type { ApiError, ApiResponse, RequestOptions } from "./types";
import {
  getApiKey,
  getEffectiveOrgId,
  setAuthOrgId,
  setCurrentOrgId,
} from "./tenant-state";

const TOKEN_KEY = "portiva.accessToken";
const DEFAULT_API_BASE = "";

function getApiBase(): string {
  try {
    const vite =
      import.meta.env?.VITE_API_BASE_URL || import.meta.env?.VITE_API_BASE;
    if (typeof vite === "string" && vite.length > 0) {
      return vite.replace(/\/$/, "");
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_API_BASE;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Codegen emits /orgs/{orgId}/v1/... — Portiva HTTP is /v1/... */
function normalizePath(endpoint: string): string {
  return endpoint
    .replace(/^\/orgs\/[^/]+\/?/, "/")
    .replace(/\/{2,}/g, "/")
    .replace(/^(?!\/)/, "/");
}

export class ApiClient {
  setToken = (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  };

  getToken = (): string | null => getToken();

  clearToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  };

  setOrgId = (orgId: string | null) => {
    setCurrentOrgId(orgId);
    setAuthOrgId(orgId);
    if (typeof window !== "undefined") {
      if (orgId) localStorage.setItem("portiva.orgId", orgId);
      else localStorage.removeItem("portiva.orgId");
    }
  };

  getOrgId = (): string | null => getEffectiveOrgId();

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const base = getApiBase();
    const path = normalizePath(endpoint);
    const url = `${base}${path}`;

    const method = (options.method || "GET").toUpperCase();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": getApiKey(),
      ...((options.headers as Record<string, string>) || {}),
    };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    if (
      ["POST", "PUT", "PATCH"].includes(method) &&
      !headers["Idempotency-Key"] &&
      !headers["idempotency-key"]
    ) {
      headers["Idempotency-Key"] =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `idem_${Date.now()}`;
    }

    let body = options.body;
    if (body !== undefined && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    const { timeout: _timeout, headers: _headers, ...rest } = options;
    void _timeout;
    void _headers;

    const response = await fetch(url, {
      ...rest,
      method,
      headers,
      body: body as BodyInit | null | undefined,
    });

    if (!response.ok) {
      const errJson = (await response.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
        code?: string;
      };
      const err: ApiError = {
        error: errJson.error || "Error",
        message: errJson.message || `HTTP ${response.status}`,
        statusCode: response.status,
        code: errJson.code,
      };
      throw Object.assign(new Error(err.message), err);
    }

    if (response.status === 204) {
      return { data: undefined as T };
    }

    const json = await response.json();
    if (json && typeof json === "object" && "data" in json) {
      return json as ApiResponse<T>;
    }
    return { data: json as T };
  }

  get = async <T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> => {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  };

  post = async <T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> => {
    return this.request<T>(endpoint, { ...options, method: "POST" });
  };

  put = async <T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> => {
    return this.request<T>(endpoint, { ...options, method: "PUT" });
  };

  patch = async <T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> => {
    return this.request<T>(endpoint, { ...options, method: "PATCH" });
  };

  delete = async <T>(
    endpoint: string,
    options?: RequestOptions,
  ): Promise<ApiResponse<T>> => {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  };
}

const g = globalThis as typeof globalThis & {
  __portivaApiClient?: ApiClient;
};

/** HMR-stable singleton — reuse the same instance across Vite hot updates. */
export const apiClient: ApiClient = g.__portivaApiClient ?? new ApiClient();

g.__portivaApiClient = apiClient;

{
  const fresh = new ApiClient();
  apiClient.setToken = fresh.setToken;
  apiClient.getToken = fresh.getToken;
  apiClient.clearToken = fresh.clearToken;
  apiClient.setOrgId = fresh.setOrgId;
  apiClient.getOrgId = fresh.getOrgId;
  apiClient.get = fresh.get;
  apiClient.post = fresh.post;
  apiClient.put = fresh.put;
  apiClient.patch = fresh.patch;
  apiClient.delete = fresh.delete;
}

export function getAccessToken(): string | null {
  return getToken();
}

export function setAccessToken(token: string | null) {
  if (token) apiClient.setToken(token);
  else apiClient.clearToken();
}
