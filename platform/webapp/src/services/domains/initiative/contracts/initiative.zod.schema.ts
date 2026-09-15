/**
 * Initiative Domain Contracts
 *
 * Re-exports Zod schemas from @portiva/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @portiva/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @portiva/core/initiative for the source schemas
 */

import { initiativeSchemas as coreInitiativeSchemas } from "@portiva/core/initiative";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreInitiativeSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const initiativeSchemas = coreInitiativeSchemas;
