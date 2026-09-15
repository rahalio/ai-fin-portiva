const TOKEN_KEY = 'portiva.accessToken';
const ROLE_KEY = 'portiva.role';
const NAME_KEY = 'portiva.name';
const USER_KEY = 'portiva.userId';
const API_KEY_STORAGE = 'portiva.apiKey';

/** Demo key used when no Bearer session (sandbox identity). Override with VITE_API_KEY. */
const DEFAULT_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) ||
  'ddd_demo_local_dev_key';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY) ?? 'admin';
}

export function getDisplayName() {
  return localStorage.getItem(NAME_KEY) ?? '';
}

export function getUserId() {
  return localStorage.getItem(USER_KEY) ?? '';
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) || DEFAULT_API_KEY;
}

export function setSession(token: string, role: string, name: string, userId?: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(NAME_KEY, name);
  if (userId) localStorage.setItem(USER_KEY, userId);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const apiKey = getApiKey();
  if (apiKey) headers.set('X-API-Key', apiKey);

  if (init.method && init.method !== 'GET') {
    headers.set('Idempotency-Key', crypto.randomUUID());
  }

  const res = await fetch(path, { ...init, headers });
  if (res.status === 204) return undefined as T;

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail =
      (json as { detail?: string; message?: string; title?: string }).detail ||
      (json as { message?: string }).message ||
      (json as { title?: string }).title ||
      res.statusText;
    const err = new Error(detail);
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }
  return json as T;
}

export type Envelope<T> = { data: T; meta?: unknown };
export type ListEnvelope<T> = { data: { items: T[]; nextCursor?: string }; meta?: unknown };
