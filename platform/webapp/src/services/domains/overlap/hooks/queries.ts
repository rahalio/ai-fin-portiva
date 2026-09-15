/**
 * Overlap Query Hooks
 *
 * React Query hooks for fetching overlap data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { overlapService } from "../overlap.service";

/**
 * Hook to list overlap clusters
 *
 * Query key: ["overlap", "Overlap", ]
 */
export function useOverlap(params?: Record<string, any>) {
  return useTenantQuery(
    ["overlap", "Overlap", ],
    async (orgId: string, signal?: AbortSignal) => {
      return overlapService.getOverlap(params, signal);
    }
  );
}

/**
 * Hook to get overlap cluster
 *
 * Query key: ["overlap", "Overlap", overlapClusterId]
 */
export function useOverlap(overlapClusterId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["overlap", "Overlap", overlapClusterId],
    async (orgId: string, signal?: AbortSignal) => {
      return overlapService.getOverlap(overlapClusterId, params, signal);
    },
    {
      enabled: !!overlapClusterId
    }
  );
}
