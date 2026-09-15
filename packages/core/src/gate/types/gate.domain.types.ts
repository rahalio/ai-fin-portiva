/**
 * Gate Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/gate.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type GateId = components["schemas"]["GateId"];
export type GateStatus = components["schemas"]["GateStatus"];
export type InitiativeId = components["schemas"]["InitiativeId"];
export type InitiativeStage = components["schemas"]["InitiativeStage"];
export type StageGate = components["schemas"]["StageGate"];
export type StageGateListData = components["schemas"]["StageGateListData"];
export type GateExceptionRequest = components["schemas"]["GateExceptionRequest"];
export type GateKillRequest = components["schemas"]["GateKillRequest"];
export type GatePassRequest = components["schemas"]["GatePassRequest"];
export type GatePauseRequest = components["schemas"]["GatePauseRequest"];
export type StageGateCreateRequest = components["schemas"]["StageGateCreateRequest"];
export type Gate = operations["listStageGates"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateStageGateRequestInput = NonNullable<operations["createStageGate"]["requestBody"]>["content"]["application/json"];
export type PassStageGateRequestInput = NonNullable<operations["passStageGate"]["requestBody"]>["content"]["application/json"];
export type KillStageGateRequestInput = NonNullable<operations["killStageGate"]["requestBody"]>["content"]["application/json"];
export type PauseStageGateRequestInput = NonNullable<operations["pauseStageGate"]["requestBody"]>["content"]["application/json"];
export type ExceptionStageGateRequestInput = NonNullable<operations["exceptionStageGate"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListStageGatesParams = NonNullable<operations["listStageGates"]["parameters"]["query"]>;
export type GetStageGateParams = operations["getStageGate"]["parameters"]["path"];
export type PassStageGateParams = operations["passStageGate"]["parameters"]["path"];
export type KillStageGateParams = operations["killStageGate"]["parameters"]["path"];
export type PauseStageGateParams = operations["pauseStageGate"]["parameters"]["path"];
export type ExceptionStageGateParams = operations["exceptionStageGate"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListStageGatesResponse = operations["listStageGates"]["responses"]["200"]["content"]["application/json"];
export type CreateStageGateResponse = operations["createStageGate"]["responses"]["201"]["content"]["application/json"];
export type GetStageGateResponse = operations["getStageGate"]["responses"]["200"]["content"]["application/json"];
export type PassStageGateResponse = operations["passStageGate"]["responses"]["200"]["content"]["application/json"];
export type KillStageGateResponse = operations["killStageGate"]["responses"]["200"]["content"]["application/json"];
export type PauseStageGateResponse = operations["pauseStageGate"]["responses"]["200"]["content"]["application/json"];
export type ExceptionStageGateResponse = operations["exceptionStageGate"]["responses"]["200"]["content"]["application/json"];


