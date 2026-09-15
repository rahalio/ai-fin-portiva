/**
 * BoardPack Domain Facade
 *
 * High-level API for board-pack domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { board-packService } from "./board-pack.service";
// TODO: Import types
// import type { ... } from "./board-pack.api-types";

/**
 * BoardPack Facade
 *
 * High-level API for board-pack operations.
 * Components should use this facade instead of services directly.
 */
export const board-packFacade = {
  /**
   * List board packs
   */
  async getBoardPack(...args: Parameters<typeof board-packService.getBoardPack>): Promise<any> {
    return board-packService.getBoardPack(...args);
  }

  /**
   * Create draft board pack
   */
  async createBoardPack(...args: Parameters<typeof board-packService.createBoardPack>): Promise<any> {
    return board-packService.createBoardPack(...args);
  }

  /**
   * Get board pack
   */
  async getBoardPack(...args: Parameters<typeof board-packService.getBoardPack>): Promise<any> {
    return board-packService.getBoardPack(...args);
  }

  /**
   * Publish board pack
   */
  async getPublish(...args: Parameters<typeof board-packService.getPublish>): Promise<any> {
    return board-packService.getPublish(...args);
  }
};
