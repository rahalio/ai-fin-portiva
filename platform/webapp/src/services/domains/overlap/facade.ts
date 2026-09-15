/**
 * Overlap Domain Facade
 *
 * High-level API for overlap domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { overlapService } from "./overlap.service";
// TODO: Import types
// import type { ... } from "./overlap.api-types";

/**
 * Overlap Facade
 *
 * High-level API for overlap operations.
 * Components should use this facade instead of services directly.
 */
export const overlapFacade = {
  /**
   * List overlap clusters
   */
  async getOverlap(...args: Parameters<typeof overlapService.getOverlap>): Promise<any> {
    return overlapService.getOverlap(...args);
  }

  /**
   * Get overlap cluster
   */
  async getOverlap(...args: Parameters<typeof overlapService.getOverlap>): Promise<any> {
    return overlapService.getOverlap(...args);
  }

  /**
   * Merge overlapping initiatives into one survivor
   */
  async getMerge(...args: Parameters<typeof overlapService.getMerge>): Promise<any> {
    return overlapService.getMerge(...args);
  }

  /**
   * Kill a member initiative in the cluster
   */
  async getKillMember(...args: Parameters<typeof overlapService.getKillMember>): Promise<any> {
    return overlapService.getKillMember(...args);
  }

  /**
   * Keep members as differentiated outcomes
   */
  async getKeepDifferentiated(...args: Parameters<typeof overlapService.getKeepDifferentiated>): Promise<any> {
    return overlapService.getKeepDifferentiated(...args);
  }
};
