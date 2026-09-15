/**
 * Overlap Service
 *
 * API client for overlap domain.
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
// import type { ... } from "./overlap.api-types";

// ============================================================================
// Response Type Definitions (for API responses)
// ============================================================================

const rawOverlapService = {
  /**
   * List overlap clusters
   */
  async getOverlap(params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/overlaps` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Get overlap cluster
   */
  async getOverlap(overlapClusterId: string, params?: Record<string, any>, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/overlaps/${overlapClusterId}` + (params ? `?${new URLSearchParams(params).toString()}` : '');

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
   * Merge overlapping initiatives into one survivor
   */
  async getMerge(overlapClusterId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/overlaps/${overlapClusterId}/merge`;

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
   * Kill a member initiative in the cluster
   */
  async getKillMember(overlapClusterId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/overlaps/${overlapClusterId}/kill-member`;

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
   * Keep members as differentiated outcomes
   */
  async getKeepDifferentiated(overlapClusterId: string, data?: any, signal?: AbortSignal): Promise<any> {
    const orgId = getEffectiveOrgId();
    if (!orgId) {
      throw new Error("Organization ID is required");
    }

    const url = `/orgs/${orgId}//v1/overlaps/${overlapClusterId}/keep-differentiated`;

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
};

// Wrap service with error handling and logging
export const overlapService = makeService(rawOverlapService, "overlap");
