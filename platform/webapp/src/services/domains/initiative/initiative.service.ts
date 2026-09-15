/**
 * Initiative Service
 *
 * API client for initiative domain.
 * Uses ApiResponse<T> pattern - response.data is already T.
 *
 * TODO(client): Migrate all endpoints to typed client when generated.
 * Currently using apiClient.get/post() as temporary fallback.
 */

import { apiClient } from "@/services/shared/infrastructure";
import { makeService } from "@/services/shared/infrastructure/service-wrapper";
import { getEffectiveOrgId } from "@/services/shared/infrastructure/tenant-state";
import { validateApiResponse, formatValidationError } from "@/services/shared/contracts";
// TODO: Import schemas from contracts
// import { ... } from "./contracts";
// TODO: Import types from api-types
// import type { ... } from "./initiative.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawInitiativeService = {
  /**
   * List initiatives
   */
  async getInitiative(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/initiatives` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }

  /**
   * File a new initiative
   */
  async createInitiative(data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/initiatives`;

    // TODO(client): migrate when generated
    const response = await apiClient.post<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }

  /**
   * Get initiative
   */
  async getInitiative(initiativeId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/initiatives/${initiativeId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

    // TODO(client): migrate when generated
    const response = await apiClient.get<any>(url, {

      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }

  /**
   * Update initiative
   */
  async updateInitiative(initiativeId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/initiatives/${initiativeId}`;

    // TODO(client): migrate when generated
    const response = await apiClient.patch<any>(url, {
      body: data,
      signal,
    });

    // TODO: Validate response with Zod schema
    // const validation = validateApiResponse(
    //   ResponseSchema,
    //   response
    // );

    return response.data;
  }
};

// Wrap service with error handling and logging
export const initiativeService = makeService(rawInitiativeService, "initiative");
