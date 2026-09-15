/**
 * Decision Query Hooks
 *
 * React Query hooks for fetching decision data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { decisionService } from "../decision.service";

/**
 * Hook to list funding decisions
 *
 * Query key: ["decision", "Decision", ]
 */
export function useDecision(params?: Record<string, any>) {
  return useTenantQuery(
    ["decision", "Decision", ],
    async (orgId: string, signal?: AbortSignal) => {
      return decisionService.getDecision(params, signal);
    }
  );
}

/**
 * Hook to get funding decision
 *
 * Query key: ["decision", "Decision", decisionId]
 */
export function useDecision(decisionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["decision", "Decision", decisionId],
    async (orgId: string, signal?: AbortSignal) => {
      return decisionService.getDecision(decisionId, params, signal);
    },
    {
      enabled: !!decisionId
    }
  );
}
