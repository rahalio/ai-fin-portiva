/**
 * PolicyWatch Domain Facade
 *
 * High-level API for policy-watch domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { policy-watchService } from "./policy-watch.service";
// TODO: Import types
// import type { ... } from "./policy-watch.api-types";

/**
 * PolicyWatch Facade
 *
 * High-level API for policy-watch operations.
 * Components should use this facade instead of services directly.
 */
export const policy-watchFacade = {
  /**
   * List policy watch items
   */
  async getPolicyWatch(...args: Parameters<typeof policy-watchService.getPolicyWatch>): Promise<any> {
    return policy-watchService.getPolicyWatch(...args);
  }

  /**
   * Create policy watch item
   */
  async createPolicyWatch(...args: Parameters<typeof policy-watchService.createPolicyWatch>): Promise<any> {
    return policy-watchService.createPolicyWatch(...args);
  }

  /**
   * Get policy watch item
   */
  async getPolicyWatch(...args: Parameters<typeof policy-watchService.getPolicyWatch>): Promise<any> {
    return policy-watchService.getPolicyWatch(...args);
  }

  /**
   * Waive policy blocker
   */
  async getWaive(...args: Parameters<typeof policy-watchService.getWaive>): Promise<any> {
    return policy-watchService.getWaive(...args);
  }

  /**
   * Resolve / clear policy blocker
   */
  async getResolve(...args: Parameters<typeof policy-watchService.getResolve>): Promise<any> {
    return policy-watchService.getResolve(...args);
  }
};
