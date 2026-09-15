/**
 * Initiative Domain Facade
 *
 * High-level API for initiative domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { initiativeService } from "./initiative.service";
// TODO: Import types
// import type { ... } from "./initiative.api-types";

/**
 * Initiative Facade
 *
 * High-level API for initiative operations.
 * Components should use this facade instead of services directly.
 */
export const initiativeFacade = {
  /**
   * List initiatives
   */
  async getInitiative(...args: Parameters<typeof initiativeService.getInitiative>): Promise<any> {
    return initiativeService.getInitiative(...args);
  }

  /**
   * File a new initiative
   */
  async createInitiative(...args: Parameters<typeof initiativeService.createInitiative>): Promise<any> {
    return initiativeService.createInitiative(...args);
  }

  /**
   * Get initiative
   */
  async getInitiative(...args: Parameters<typeof initiativeService.getInitiative>): Promise<any> {
    return initiativeService.getInitiative(...args);
  }

  /**
   * Update initiative
   */
  async updateInitiative(...args: Parameters<typeof initiativeService.updateInitiative>): Promise<any> {
    return initiativeService.updateInitiative(...args);
  }
};
