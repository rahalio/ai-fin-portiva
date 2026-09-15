/**
 * Gate Query Hooks
 *
 * React Query hooks for fetching gate data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { gateService } from "../gate.service";

/**
 * Hook to list stage gates
 *
 * Query key: ["gate", "Gate", ]
 */
export function useGate(params?: Record<string, any>) {
  return useTenantQuery(
    ["gate", "Gate", ],
    async (orgId: string, signal?: AbortSignal) => {
      return gateService.getGate(params, signal);
    }
  );
}

/**
 * Hook to get stage gate
 *
 * Query key: ["gate", "Gate", gateId]
 */
export function useGate(gateId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["gate", "Gate", gateId],
    async (orgId: string, signal?: AbortSignal) => {
      return gateService.getGate(gateId, params, signal);
    },
    {
      enabled: !!gateId
    }
  );
}
