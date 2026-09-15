/**
 * Overlap Mutation Hooks
 *
 * React Query hooks for mutating overlap data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { overlapService } from "../overlap.service";
// TODO: Import types
// import type { ... } from "../overlap.api-types";

/**
 * Hook to merge overlapping initiatives into one survivor
 *
 * Automatically invalidates overlap queries on success.
 */
export function useGetMerge() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return overlapService.getMerge(data);
    },
    {
      invalidateQueries: [["overlap", "Merge"]],
    }
  );
}

/**
 * Hook to kill a member initiative in the cluster
 *
 * Automatically invalidates overlap queries on success.
 */
export function useGetKillMember() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return overlapService.getKillMember(data);
    },
    {
      invalidateQueries: [["overlap", "KillMember"]],
    }
  );
}

/**
 * Hook to keep members as differentiated outcomes
 *
 * Automatically invalidates overlap queries on success.
 */
export function useGetKeepDifferentiated() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return overlapService.getKeepDifferentiated(data);
    },
    {
      invalidateQueries: [["overlap", "KeepDifferentiated"]],
    }
  );
}
