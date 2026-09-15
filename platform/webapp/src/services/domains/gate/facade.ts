/**
 * Gate Domain Facade
 *
 * High-level API for gate domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { gateService } from "./gate.service";
// TODO: Import types
// import type { ... } from "./gate.api-types";

/**
 * Gate Facade
 *
 * High-level API for gate operations.
 * Components should use this facade instead of services directly.
 */
export const gateFacade = {
  /**
   * List stage gates
   */
  async getGate(...args: Parameters<typeof gateService.getGate>): Promise<any> {
    return gateService.getGate(...args);
  }

  /**
   * Open a stage gate
   */
  async createGate(...args: Parameters<typeof gateService.createGate>): Promise<any> {
    return gateService.createGate(...args);
  }

  /**
   * Get stage gate
   */
  async getGate(...args: Parameters<typeof gateService.getGate>): Promise<any> {
    return gateService.getGate(...args);
  }

  /**
   * Pass gate to next stage
   */
  async getPass(...args: Parameters<typeof gateService.getPass>): Promise<any> {
    return gateService.getPass(...args);
  }

  /**
   * Fail gate / kill initiative path
   */
  async getKill(...args: Parameters<typeof gateService.getKill>): Promise<any> {
    return gateService.getKill(...args);
  }

  /**
   * Pause open gate
   */
  async getPause(...args: Parameters<typeof gateService.getPause>): Promise<any> {
    return gateService.getPause(...args);
  }

  /**
   * Executive exception for missed kill metrics
   */
  async getException(...args: Parameters<typeof gateService.getException>): Promise<any> {
    return gateService.getException(...args);
  }
};
