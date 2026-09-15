/**
 * Scorecard Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/scorecard.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CompetitivePosture = components["schemas"]["CompetitivePosture"];
export type InitiativeId = components["schemas"]["InitiativeId"];
export type MoatDeclaration = components["schemas"]["MoatDeclaration"];
export type Scorecard = components["schemas"]["Scorecard"];
export type ScorecardId = components["schemas"]["ScorecardId"];
export type ScorecardListData = components["schemas"]["ScorecardListData"];
export type ScorecardUpsertRequest = components["schemas"]["ScorecardUpsertRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type UpsertScorecardRequestInput = NonNullable<operations["upsertScorecard"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListScorecardsParams = NonNullable<operations["listScorecards"]["parameters"]["query"]>;
export type GetScorecardParams = operations["getScorecard"]["parameters"]["path"];
export type GetScorecardByInitiativeParams = operations["getScorecardByInitiative"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListScorecardsResponse = operations["listScorecards"]["responses"]["200"]["content"]["application/json"];
export type UpsertScorecardResponse = operations["upsertScorecard"]["responses"]["200"]["content"]["application/json"];
export type GetScorecardResponse = operations["getScorecard"]["responses"]["200"]["content"]["application/json"];
export type GetScorecardByInitiativeResponse = operations["getScorecardByInitiative"]["responses"]["200"]["content"]["application/json"];


