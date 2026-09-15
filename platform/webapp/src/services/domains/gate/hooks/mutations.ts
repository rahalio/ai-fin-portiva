/**
 * Gate Mutation Hooks
 *
 * React Query hooks for mutating gate data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { gateService } from "../gate.service";
// TODO: Import types
// import type { ... } from "../gate.api-types";

/**
 * Hook to open a stage gate
 *
 * Automatically invalidates gate queries on success.
 */
export function useCreateGate() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gateService.createGate(data);
    },
    {
      invalidateQueries: [["gate", "Gate"]],
    }
  );
}

/**
 * Hook to pass gate to next stage
 *
 * Automatically invalidates gate queries on success.
 */
export function useGetPass() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gateService.getPass(data);
    },
    {
      invalidateQueries: [["gate", "Pass"]],
    }
  );
}

/**
 * Hook to fail gate / kill initiative path
 *
 * Automatically invalidates gate queries on success.
 */
export function useGetKill() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gateService.getKill(data);
    },
    {
      invalidateQueries: [["gate", "Kill"]],
    }
  );
}

/**
 * Hook to pause open gate
 *
 * Automatically invalidates gate queries on success.
 */
export function useGetPause() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gateService.getPause(data);
    },
    {
      invalidateQueries: [["gate", "Pause"]],
    }
  );
}

/**
 * Hook to executive exception for missed kill metrics
 *
 * Automatically invalidates gate queries on success.
 */
export function useGetException() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return gateService.getException(data);
    },
    {
      invalidateQueries: [["gate", "Exception"]],
    }
  );
}
