/**
 * BoardPack Query Hooks
 *
 * React Query hooks for fetching board-pack data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { board-packService } from "../board-pack.service";

/**
 * Hook to list board packs
 *
 * Query key: ["board-pack", "BoardPack", ]
 */
export function useBoardPack(params?: Record<string, any>) {
  return useTenantQuery(
    ["board-pack", "BoardPack", ],
    async (orgId: string, signal?: AbortSignal) => {
      return board-packService.getBoardPack(params, signal);
    }
  );
}

/**
 * Hook to get board pack
 *
 * Query key: ["board-pack", "BoardPack", boardPackId]
 */
export function useBoardPack(boardPackId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["board-pack", "BoardPack", boardPackId],
    async (orgId: string, signal?: AbortSignal) => {
      return board-packService.getBoardPack(boardPackId, params, signal);
    },
    {
      enabled: !!boardPackId
    }
  );
}
