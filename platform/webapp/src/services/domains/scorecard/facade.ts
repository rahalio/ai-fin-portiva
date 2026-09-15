/**
 * Scorecard Domain Facade
 *
 * High-level API for scorecard domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { scorecardService } from "./scorecard.service";
// TODO: Import types
// import type { ... } from "./scorecard.api-types";

/**
 * Scorecard Facade
 *
 * High-level API for scorecard operations.
 * Components should use this facade instead of services directly.
 */
export const scorecardFacade = {
  /**
   * List scorecards
   */
  async getScorecard(...args: Parameters<typeof scorecardService.getScorecard>): Promise<any> {
    return scorecardService.getScorecard(...args);
  }

  /**
   * Upsert scorecard for an initiative
   */
  async getScorecard(...args: Parameters<typeof scorecardService.getScorecard>): Promise<any> {
    return scorecardService.getScorecard(...args);
  }

  /**
   * Get scorecard by id
   */
  async getScorecard(...args: Parameters<typeof scorecardService.getScorecard>): Promise<any> {
    return scorecardService.getScorecard(...args);
  }

  /**
   * Get scorecard for an initiative
   */
  async getScorecard(...args: Parameters<typeof scorecardService.getScorecard>): Promise<any> {
    return scorecardService.getScorecard(...args);
  }
};
