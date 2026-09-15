/**
 * BoardPack Mutation Hooks
 *
 * React Query hooks for mutating board-pack data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { board-packService } from "../board-pack.service";
// TODO: Import types
// import type { ... } from "../board-pack.api-types";

/**
 * Hook to create draft board pack
 *
 * Automatically invalidates board-pack queries on success.
 */
export function useCreateBoardPack() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return board-packService.createBoardPack(data);
    },
    {
      invalidateQueries: [["board-pack", "BoardPack"]],
    }
  );
}

/**
 * Hook to publish board pack
 *
 * Automatically invalidates board-pack queries on success.
 */
export function useGetPublish() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return board-packService.getPublish(data);
    },
    {
      invalidateQueries: [["board-pack", "Publish"]],
    }
  );
}
