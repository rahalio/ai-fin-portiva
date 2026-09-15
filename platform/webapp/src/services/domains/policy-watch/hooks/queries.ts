/**
 * PolicyWatch Query Hooks
 *
 * React Query hooks for fetching policy-watch data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { policy-watchService } from "../policy-watch.service";

/**
 * Hook to list policy watch items
 *
 * Query key: ["policy-watch", "PolicyWatch", ]
 */
export function usePolicyWatch(params?: Record<string, any>) {
  return useTenantQuery(
    ["policy-watch", "PolicyWatch", ],
    async (orgId: string, signal?: AbortSignal) => {
      return policy-watchService.getPolicyWatch(params, signal);
    }
  );
}

/**
 * Hook to get policy watch item
 *
 * Query key: ["policy-watch", "PolicyWatch", policyWatchId]
 */
export function usePolicyWatch(policyWatchId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["policy-watch", "PolicyWatch", policyWatchId],
    async (orgId: string, signal?: AbortSignal) => {
      return policy-watchService.getPolicyWatch(policyWatchId, params, signal);
    },
    {
      enabled: !!policyWatchId
    }
  );
}
