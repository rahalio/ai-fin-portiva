/**
 * Tenant / org state for non-React callers (generated services).
 * Default demo tenant matches api-server seed conventions.
 */

const DEFAULT_ORG_ID = "tnt_demo";

let currentOrgId: string | null = DEFAULT_ORG_ID;
let authOrgId: string | null = null;

export function setCurrentOrgId(orgId: string | null) {
  currentOrgId = orgId;
}

export function setAuthOrgId(orgId: string | null) {
  authOrgId = orgId;
}

export function getEffectiveOrgId(): string | null {
  if (currentOrgId || authOrgId) {
    return currentOrgId || authOrgId;
  }
  if (typeof window === "undefined") return DEFAULT_ORG_ID;
  return (
    localStorage.getItem("orgId") ||
    localStorage.getItem("org_id") ||
    localStorage.getItem("portiva.orgId") ||
    DEFAULT_ORG_ID
  );
}

const DEFAULT_API_KEY = "ddd_demo_local_dev_key";

export function getApiKey(): string {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("portiva.apiKey") ||
      localStorage.getItem("apiKey") ||
      import.meta.env.VITE_API_KEY ||
      DEFAULT_API_KEY
    );
  }
  return import.meta.env.VITE_API_KEY || DEFAULT_API_KEY;
}

export function setApiKey(key: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("portiva.apiKey", key);
  }
}
