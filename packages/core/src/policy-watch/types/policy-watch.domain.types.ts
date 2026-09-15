/**
 * Policy Watch Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/policy-watch.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type InitiativeId = components["schemas"]["InitiativeId"];
export type PolicyWatchId = components["schemas"]["PolicyWatchId"];
export type PolicyWatchItem = components["schemas"]["PolicyWatchItem"];
export type PolicyWatchItemListData = components["schemas"]["PolicyWatchItemListData"];
export type PolicyWatchStatus = components["schemas"]["PolicyWatchStatus"];
export type PolicyWatchCreateRequest = components["schemas"]["PolicyWatchCreateRequest"];
export type PolicyWatchResolveRequest = components["schemas"]["PolicyWatchResolveRequest"];
export type PolicyWatchWaiveRequest = components["schemas"]["PolicyWatchWaiveRequest"];
export type PolicyWatch = operations["listPolicyWatchItems"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreatePolicyWatchItemRequestInput = NonNullable<operations["createPolicyWatchItem"]["requestBody"]>["content"]["application/json"];
export type WaivePolicyWatchItemRequestInput = NonNullable<operations["waivePolicyWatchItem"]["requestBody"]>["content"]["application/json"];
export type ResolvePolicyWatchItemRequestInput = NonNullable<operations["resolvePolicyWatchItem"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListPolicyWatchItemsParams = NonNullable<operations["listPolicyWatchItems"]["parameters"]["query"]>;
export type GetPolicyWatchItemParams = operations["getPolicyWatchItem"]["parameters"]["path"];
export type WaivePolicyWatchItemParams = operations["waivePolicyWatchItem"]["parameters"]["path"];
export type ResolvePolicyWatchItemParams = operations["resolvePolicyWatchItem"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListPolicyWatchItemsResponse = operations["listPolicyWatchItems"]["responses"]["200"]["content"]["application/json"];
export type CreatePolicyWatchItemResponse = operations["createPolicyWatchItem"]["responses"]["201"]["content"]["application/json"];
export type GetPolicyWatchItemResponse = operations["getPolicyWatchItem"]["responses"]["200"]["content"]["application/json"];
export type WaivePolicyWatchItemResponse = operations["waivePolicyWatchItem"]["responses"]["200"]["content"]["application/json"];
export type ResolvePolicyWatchItemResponse = operations["resolvePolicyWatchItem"]["responses"]["200"]["content"]["application/json"];


