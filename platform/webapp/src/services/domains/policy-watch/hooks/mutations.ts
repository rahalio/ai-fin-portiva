/**
 * PolicyWatch Mutation Hooks
 *
 * React Query hooks for mutating policy-watch data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { policy-watchService } from "../policy-watch.service";
// TODO: Import types
// import type { ... } from "../policy-watch.api-types";

/**
 * Hook to create policy watch item
 *
 * Automatically invalidates policy-watch queries on success.
 */
export function useCreatePolicyWatch() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policy-watchService.createPolicyWatch(data);
    },
    {
      invalidateQueries: [["policy-watch", "PolicyWatch"]],
    }
  );
}

/**
 * Hook to waive policy blocker
 *
 * Automatically invalidates policy-watch queries on success.
 */
export function useGetWaive() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policy-watchService.getWaive(data);
    },
    {
      invalidateQueries: [["policy-watch", "Waive"]],
    }
  );
}

/**
 * Hook to resolve / clear policy blocker
 *
 * Automatically invalidates policy-watch queries on success.
 */
export function useGetResolve() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return policy-watchService.getResolve(data);
    },
    {
      invalidateQueries: [["policy-watch", "Resolve"]],
    }
  );
}
