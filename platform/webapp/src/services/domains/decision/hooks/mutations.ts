/**
 * Decision Mutation Hooks
 *
 * React Query hooks for mutating decision data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { decisionService } from "../decision.service";
// TODO: Import types
// import type { ... } from "../decision.api-types";

/**
 * Hook to record an immutable funding decision
 *
 * Automatically invalidates decision queries on success.
 */
export function useCreateDecision() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return decisionService.createDecision(data);
    },
    {
      invalidateQueries: [["decision", "Decision"]],
    }
  );
}
