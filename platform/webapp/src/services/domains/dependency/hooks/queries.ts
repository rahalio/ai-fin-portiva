/**
 * Dependency Query Hooks
 *
 * React Query hooks for fetching dependency data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { dependencyService } from "../dependency.service";

/**
 * Hook to list vendor dependencies
 *
 * Query key: ["dependency", "Dependency", ]
 */
export function useDependency(params?: Record<string, any>) {
  return useTenantQuery(
    ["dependency", "Dependency", ],
    async (orgId: string, signal?: AbortSignal) => {
      return dependencyService.getDependency(params, signal);
    }
  );
}

/**
 * Hook to portfolio vendor concentration rollup
 *
 * Query key: ["dependency", "Concentration", ]
 */
export function useConcentration(params?: Record<string, any>) {
  return useTenantQuery(
    ["dependency", "Concentration", ],
    async (orgId: string, signal?: AbortSignal) => {
      return dependencyService.getConcentration(params, signal);
    }
  );
}

/**
 * Hook to get vendor dependency
 *
 * Query key: ["dependency", "Dependency", dependencyId]
 */
export function useDependency(dependencyId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["dependency", "Dependency", dependencyId],
    async (orgId: string, signal?: AbortSignal) => {
      return dependencyService.getDependency(dependencyId, params, signal);
    },
    {
      enabled: !!dependencyId
    }
  );
}
