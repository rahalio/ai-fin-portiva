/**
 * Scorecard Mutation Hooks
 *
 * React Query hooks for mutating scorecard data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { scorecardService } from "../scorecard.service";
// TODO: Import types
// import type { ... } from "../scorecard.api-types";

/**
 * Hook to upsert scorecard for an initiative
 *
 * Automatically invalidates scorecard queries on success.
 */
export function useGetScorecard() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return scorecardService.getScorecard(data);
    },
    {
      invalidateQueries: [["scorecard", "Scorecard"]],
    }
  );
}
