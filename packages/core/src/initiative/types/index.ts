/**
 * Initiative Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/initiative.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Initiative = components["schemas"]["Initiative"];
export type InitiativeId = components["schemas"]["InitiativeId"];
export type InitiativeListData = components["schemas"]["InitiativeListData"];
export type InitiativeStage = components["schemas"]["InitiativeStage"];
export type InitiativeStatus = components["schemas"]["InitiativeStatus"];
export type OverlapClusterId = components["schemas"]["OverlapClusterId"];
export type StrategicArc = components["schemas"]["StrategicArc"];
export type InitiativeCreateRequest = components["schemas"]["InitiativeCreateRequest"];
export type InitiativeUpdateRequest = components["schemas"]["InitiativeUpdateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateInitiativeRequestInput = NonNullable<operations["createInitiative"]["requestBody"]>["content"]["application/json"];
export type UpdateInitiativeRequestInput = NonNullable<operations["updateInitiative"]["requestBody"]>["content"]["application/json"];
export type UpdateInitiativeRequest = UpdateInitiativeRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListInitiativesParams = NonNullable<operations["listInitiatives"]["parameters"]["query"]>;
export type GetInitiativeParams = operations["getInitiative"]["parameters"]["path"];
export type UpdateInitiativeParams = operations["updateInitiative"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListInitiativesResponse = operations["listInitiatives"]["responses"]["200"]["content"]["application/json"];
export type CreateInitiativeResponse = operations["createInitiative"]["responses"]["201"]["content"]["application/json"];
export type GetInitiativeResponse = operations["getInitiative"]["responses"]["200"]["content"]["application/json"];
export type UpdateInitiativeResponse = operations["updateInitiative"]["responses"]["200"]["content"]["application/json"];


