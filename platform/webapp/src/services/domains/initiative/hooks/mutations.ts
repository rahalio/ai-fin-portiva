/**
 * Initiative Mutation Hooks
 *
 * React Query hooks for mutating initiative data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { initiativeService } from "../initiative.service";
// TODO: Import types
// import type { ... } from "../initiative.api-types";

/**
 * Hook to file a new initiative
 *
 * Automatically invalidates initiative queries on success.
 */
export function useCreateInitiative() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return initiativeService.createInitiative(data);
    },
    {
      invalidateQueries: [["initiative", "Initiative"]],
    }
  );
}

/**
 * Hook to update initiative
 *
 * Automatically invalidates initiative queries on success.
 */
export function useUpdateInitiative() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return initiativeService.updateInitiative(data);
    },
    {
      invalidateQueries: [["initiative", "Initiative"]],
    }
  );
}
