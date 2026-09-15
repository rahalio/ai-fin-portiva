import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const mergeOverlapCluster_Body = z
  .object({
    survivingInitiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    notes: z.string().max(4000).optional(),
  })
  .passthrough();
const killOverlapMember_Body = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    notes: z.string().max(4000).optional(),
  })
  .passthrough();
const OverlapStatus = z.enum(['open', 'resolved']);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const OverlapClusterId = z.string();
const InitiativeId = z.string();
const OverlapCluster = z
  .object({
    overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
    sharedOutcomeLabel: z.string().min(1).max(300),
    memberInitiativeIds: z
      .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(2),
    capitalAtRisk: z.number().gte(0),
    status: z.enum(['open', 'resolved']),
    resolutionNotes: z.string().max(4000).optional(),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const OverlapClusterListData = z
  .object({
    items: z.array(
      z
        .object({
          overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
          sharedOutcomeLabel: z.string().min(1).max(300),
          memberInitiativeIds: z
            .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
            .min(2),
          capitalAtRisk: z.number().gte(0),
          status: z.enum(['open', 'resolved']),
          resolutionNotes: z.string().max(4000).optional(),
          resolvedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const OverlapClusterListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              overlapClusterId: z
                .string()
                .regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
              sharedOutcomeLabel: z.string().min(1).max(300),
              memberInitiativeIds: z
                .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
                .min(2),
              capitalAtRisk: z.number().gte(0),
              status: z.enum(['open', 'resolved']),
              resolutionNotes: z.string().max(4000).optional(),
              resolvedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const OverlapClusterResponse = z
  .object({
    data: z
      .object({
        overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
        sharedOutcomeLabel: z.string().min(1).max(300),
        memberInitiativeIds: z
          .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
          .min(2),
        capitalAtRisk: z.number().gte(0),
        status: z.enum(['open', 'resolved']),
        resolutionNotes: z.string().max(4000).optional(),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const OverlapMergeRequest = z
  .object({
    survivingInitiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    notes: z.string().max(4000).optional(),
  })
  .passthrough();
const OverlapKillMemberRequest = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    notes: z.string().max(4000).optional(),
  })
  .passthrough();
const OverlapKeepDifferentiatedRequest = z
  .object({ differentiationNotes: z.string().min(1).max(4000) })
  .passthrough();

export const schemas: any = {
  mergeOverlapCluster_Body,
  killOverlapMember_Body,
  OverlapStatus,
  Problem,
  OverlapClusterId,
  InitiativeId,
  OverlapCluster,
  OverlapClusterListData,
  ResponseMeta,
  OverlapClusterListResponse,
  OverlapClusterResponse,
  OverlapMergeRequest,
  OverlapKillMemberRequest,
  OverlapKeepDifferentiatedRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/overlaps',
    alias: 'listOverlapClusters',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'resolved']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  overlapClusterId: z
                    .string()
                    .regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  sharedOutcomeLabel: z.string().min(1).max(300),
                  memberInitiativeIds: z
                    .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .min(2),
                  capitalAtRisk: z.number().gte(0),
                  status: z.enum(['open', 'resolved']),
                  resolutionNotes: z.string().max(4000).optional(),
                  resolvedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/overlaps/:overlapClusterId',
    alias: 'getOverlapCluster',
    requestFormat: 'json',
    parameters: [
      {
        name: 'overlapClusterId',
        type: 'Path',
        schema: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            sharedOutcomeLabel: z.string().min(1).max(300),
            memberInitiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(2),
            capitalAtRisk: z.number().gte(0),
            status: z.enum(['open', 'resolved']),
            resolutionNotes: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/overlaps/:overlapClusterId/keep-differentiated',
    alias: 'keepOverlapDifferentiated',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ differentiationNotes: z.string().min(1).max(4000) })
          .passthrough(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'overlapClusterId',
        type: 'Path',
        schema: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            sharedOutcomeLabel: z.string().min(1).max(300),
            memberInitiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(2),
            capitalAtRisk: z.number().gte(0),
            status: z.enum(['open', 'resolved']),
            resolutionNotes: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/overlaps/:overlapClusterId/kill-member',
    alias: 'killOverlapMember',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: killOverlapMember_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'overlapClusterId',
        type: 'Path',
        schema: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            sharedOutcomeLabel: z.string().min(1).max(300),
            memberInitiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(2),
            capitalAtRisk: z.number().gte(0),
            status: z.enum(['open', 'resolved']),
            resolutionNotes: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/overlaps/:overlapClusterId/merge',
    alias: 'mergeOverlapCluster',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: mergeOverlapCluster_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'overlapClusterId',
        type: 'Path',
        schema: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            overlapClusterId: z.string().regex(/^ovl_[0-9A-HJKMNP-TV-Z]{26}$/),
            sharedOutcomeLabel: z.string().min(1).max(300),
            memberInitiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(2),
            capitalAtRisk: z.number().gte(0),
            status: z.enum(['open', 'resolved']),
            resolutionNotes: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
