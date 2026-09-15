/**
 * Dependency Mutation Hooks
 *
 * React Query hooks for mutating dependency data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { dependencyService } from "../dependency.service";
// TODO: Import types
// import type { ... } from "../dependency.api-types";

/**
 * Hook to record a vendor dependency
 *
 * Automatically invalidates dependency queries on success.
 */
export function useCreateDependency() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return dependencyService.createDependency(data);
    },
    {
      invalidateQueries: [["dependency", "Dependency"]],
    }
  );
}
