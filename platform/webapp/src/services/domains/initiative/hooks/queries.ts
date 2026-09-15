/**
 * Initiative Query Hooks
 *
 * React Query hooks for fetching initiative data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { initiativeService } from "../initiative.service";

/**
 * Hook to list initiatives
 *
 * Query key: ["initiative", "Initiative", ]
 */
export function useInitiative(params?: Record<string, any>) {
  return useTenantQuery(
    ["initiative", "Initiative", ],
    async (orgId: string, signal?: AbortSignal) => {
      return initiativeService.getInitiative(params, signal);
    }
  );
}

/**
 * Hook to get initiative
 *
 * Query key: ["initiative", "Initiative", initiativeId]
 */
export function useInitiative(initiativeId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["initiative", "Initiative", initiativeId],
    async (orgId: string, signal?: AbortSignal) => {
      return initiativeService.getInitiative(initiativeId, params, signal);
    },
    {
      enabled: !!initiativeId
    }
  );
}
