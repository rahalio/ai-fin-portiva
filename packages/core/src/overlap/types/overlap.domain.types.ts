/**
 * Overlap Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/overlap.openapi.types";

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
export type OverlapCluster = components["schemas"]["OverlapCluster"];
export type OverlapClusterId = components["schemas"]["OverlapClusterId"];
export type OverlapClusterListData = components["schemas"]["OverlapClusterListData"];
export type OverlapStatus = components["schemas"]["OverlapStatus"];
export type OverlapKeepDifferentiatedRequest = components["schemas"]["OverlapKeepDifferentiatedRequest"];
export type OverlapKillMemberRequest = components["schemas"]["OverlapKillMemberRequest"];
export type OverlapMergeRequest = components["schemas"]["OverlapMergeRequest"];
export type Overlap = operations["listOverlapClusters"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type MergeOverlapClusterRequestInput = NonNullable<operations["mergeOverlapCluster"]["requestBody"]>["content"]["application/json"];
export type KillOverlapMemberRequestInput = NonNullable<operations["killOverlapMember"]["requestBody"]>["content"]["application/json"];
export type KeepOverlapDifferentiatedRequestInput = NonNullable<operations["keepOverlapDifferentiated"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListOverlapClustersParams = NonNullable<operations["listOverlapClusters"]["parameters"]["query"]>;
export type GetOverlapClusterParams = operations["getOverlapCluster"]["parameters"]["path"];
export type MergeOverlapClusterParams = operations["mergeOverlapCluster"]["parameters"]["path"];
export type KillOverlapMemberParams = operations["killOverlapMember"]["parameters"]["path"];
export type KeepOverlapDifferentiatedParams = operations["keepOverlapDifferentiated"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListOverlapClustersResponse = operations["listOverlapClusters"]["responses"]["200"]["content"]["application/json"];
export type GetOverlapClusterResponse = operations["getOverlapCluster"]["responses"]["200"]["content"]["application/json"];
export type MergeOverlapClusterResponse = operations["mergeOverlapCluster"]["responses"]["200"]["content"]["application/json"];
export type KillOverlapMemberResponse = operations["killOverlapMember"]["responses"]["200"]["content"]["application/json"];
export type KeepOverlapDifferentiatedResponse = operations["keepOverlapDifferentiated"]["responses"]["200"]["content"]["application/json"];


