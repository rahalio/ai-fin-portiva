/**
 * Scorecard Query Hooks
 *
 * React Query hooks for fetching scorecard data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { scorecardService } from "../scorecard.service";

/**
 * Hook to list scorecards
 *
 * Query key: ["scorecard", "Scorecard", ]
 */
export function useScorecard(params?: Record<string, any>) {
  return useTenantQuery(
    ["scorecard", "Scorecard", ],
    async (orgId: string, signal?: AbortSignal) => {
      return scorecardService.getScorecard(params, signal);
    }
  );
}

/**
 * Hook to get scorecard by id
 *
 * Query key: ["scorecard", "Scorecard", scorecardId]
 */
export function useScorecard(scorecardId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["scorecard", "Scorecard", scorecardId],
    async (orgId: string, signal?: AbortSignal) => {
      return scorecardService.getScorecard(scorecardId, params, signal);
    },
    {
      enabled: !!scorecardId
    }
  );
}

/**
 * Hook to get scorecard for an initiative
 *
 * Query key: ["scorecard", "Scorecard", initiativeId]
 */
export function useScorecard(initiativeId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["scorecard", "Scorecard", initiativeId],
    async (orgId: string, signal?: AbortSignal) => {
      return scorecardService.getScorecard(initiativeId, params, signal);
    },
    {
      enabled: !!initiativeId
    }
  );
}
