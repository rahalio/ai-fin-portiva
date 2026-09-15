/**
 * Dependency Domain Contracts
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
 * @see @portiva/core/dependency for the source schemas
 */

import { dependencySchemas as coreDependencySchemas } from "@portiva/core/dependency";
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
} = coreDependencySchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const dependencySchemas = coreDependencySchemas;
