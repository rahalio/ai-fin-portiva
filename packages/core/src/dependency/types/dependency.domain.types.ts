/**
 * Dependency Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/dependency.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DependencyConcentration = components["schemas"]["DependencyConcentration"];
export type DependencyCriticality = components["schemas"]["DependencyCriticality"];
export type DependencyId = components["schemas"]["DependencyId"];
export type InitiativeId = components["schemas"]["InitiativeId"];
export type VendorConcentrationItem = components["schemas"]["VendorConcentrationItem"];
export type VendorDependency = components["schemas"]["VendorDependency"];
export type VendorDependencyListData = components["schemas"]["VendorDependencyListData"];
export type VendorDependencyCreateRequest = components["schemas"]["VendorDependencyCreateRequest"];
export type Dependency = operations["listVendorDependencies"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateVendorDependencyRequestInput = NonNullable<operations["createVendorDependency"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListVendorDependenciesParams = NonNullable<operations["listVendorDependencies"]["parameters"]["query"]>;
export type GetVendorDependencyParams = operations["getVendorDependency"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListVendorDependenciesResponse = operations["listVendorDependencies"]["responses"]["200"]["content"]["application/json"];
export type CreateVendorDependencyResponse = operations["createVendorDependency"]["responses"]["201"]["content"]["application/json"];
export type GetDependencyConcentrationResponse = operations["getDependencyConcentration"]["responses"]["200"]["content"]["application/json"];
export type GetVendorDependencyResponse = operations["getVendorDependency"]["responses"]["200"]["content"]["application/json"];


