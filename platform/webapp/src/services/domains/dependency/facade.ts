/**
 * Dependency Domain Facade
 *
 * High-level API for dependency domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { dependencyService } from "./dependency.service";
// TODO: Import types
// import type { ... } from "./dependency.api-types";

/**
 * Dependency Facade
 *
 * High-level API for dependency operations.
 * Components should use this facade instead of services directly.
 */
export const dependencyFacade = {
  /**
   * List vendor dependencies
   */
  async getDependency(...args: Parameters<typeof dependencyService.getDependency>): Promise<any> {
    return dependencyService.getDependency(...args);
  }

  /**
   * Record a vendor dependency
   */
  async createDependency(...args: Parameters<typeof dependencyService.createDependency>): Promise<any> {
    return dependencyService.createDependency(...args);
  }

  /**
   * Portfolio vendor concentration rollup
   */
  async getConcentration(...args: Parameters<typeof dependencyService.getConcentration>): Promise<any> {
    return dependencyService.getConcentration(...args);
  }

  /**
   * Get vendor dependency
   */
  async getDependency(...args: Parameters<typeof dependencyService.getDependency>): Promise<any> {
    return dependencyService.getDependency(...args);
  }
};
