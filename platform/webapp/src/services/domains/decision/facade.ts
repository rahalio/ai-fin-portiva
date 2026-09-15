/**
 * Decision Domain Facade
 *
 * High-level API for decision domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { decisionService } from "./decision.service";
// TODO: Import types
// import type { ... } from "./decision.api-types";

/**
 * Decision Facade
 *
 * High-level API for decision operations.
 * Components should use this facade instead of services directly.
 */
export const decisionFacade = {
  /**
   * List funding decisions
   */
  async getDecision(...args: Parameters<typeof decisionService.getDecision>): Promise<any> {
    return decisionService.getDecision(...args);
  }

  /**
   * Record an immutable funding decision
   */
  async createDecision(...args: Parameters<typeof decisionService.createDecision>): Promise<any> {
    return decisionService.createDecision(...args);
  }

  /**
   * Get funding decision
   */
  async getDecision(...args: Parameters<typeof decisionService.getDecision>): Promise<any> {
    return decisionService.getDecision(...args);
  }
};
