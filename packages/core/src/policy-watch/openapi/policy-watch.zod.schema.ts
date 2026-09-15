import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPolicyWatchItem_Body = z
  .object({
    topic: z.string().min(1).max(300),
    blocksScale: z.boolean(),
    thresholdDays: z.number().int().gte(1),
    initiativeIds: z
      .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
  })
  .passthrough();
const waivePolicyWatchItem_Body = z
  .object({
    rationale: z.string().min(1).max(4000),
    waivedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const PolicyWatchStatus = z.enum(['open', 'waived', 'resolved']);
const InitiativeId = z.string();
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
const PolicyWatchId = z.string();
const UserId = z.string();
const PolicyWatchItem = z
  .object({
    policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    topic: z.string().min(1).max(300),
    blocksScale: z.boolean(),
    status: z.enum(['open', 'waived', 'resolved']),
    thresholdDays: z.number().int().gte(1),
    initiativeIds: z
      .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
    openedAt: z.string().datetime({ offset: true }).optional(),
    waivedAt: z.string().datetime({ offset: true }).optional(),
    waivedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    waiverRationale: z.string().max(4000).optional(),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
    resolutionNotes: z.string().max(4000).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PolicyWatchItemListData = z
  .object({
    items: z.array(
      z
        .object({
          policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
          topic: z.string().min(1).max(300),
          blocksScale: z.boolean(),
          status: z.enum(['open', 'waived', 'resolved']),
          thresholdDays: z.number().int().gte(1),
          initiativeIds: z
            .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
            .min(1),
          openedAt: z.string().datetime({ offset: true }).optional(),
          waivedAt: z.string().datetime({ offset: true }).optional(),
          waivedByUserId: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          waiverRationale: z.string().max(4000).optional(),
          resolvedAt: z.string().datetime({ offset: true }).optional(),
          resolutionNotes: z.string().max(4000).optional(),
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
const PolicyWatchItemListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              topic: z.string().min(1).max(300),
              blocksScale: z.boolean(),
              status: z.enum(['open', 'waived', 'resolved']),
              thresholdDays: z.number().int().gte(1),
              initiativeIds: z
                .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
                .min(1),
              openedAt: z.string().datetime({ offset: true }).optional(),
              waivedAt: z.string().datetime({ offset: true }).optional(),
              waivedByUserId: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              waiverRationale: z.string().max(4000).optional(),
              resolvedAt: z.string().datetime({ offset: true }).optional(),
              resolutionNotes: z.string().max(4000).optional(),
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
const PolicyWatchCreateRequest = z
  .object({
    topic: z.string().min(1).max(300),
    blocksScale: z.boolean(),
    thresholdDays: z.number().int().gte(1),
    initiativeIds: z
      .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
      .min(1),
  })
  .passthrough();
const PolicyWatchItemResponse = z
  .object({
    data: z
      .object({
        policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        topic: z.string().min(1).max(300),
        blocksScale: z.boolean(),
        status: z.enum(['open', 'waived', 'resolved']),
        thresholdDays: z.number().int().gte(1),
        initiativeIds: z
          .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
          .min(1),
        openedAt: z.string().datetime({ offset: true }).optional(),
        waivedAt: z.string().datetime({ offset: true }).optional(),
        waivedByUserId: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        waiverRationale: z.string().max(4000).optional(),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
        resolutionNotes: z.string().max(4000).optional(),
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
const PolicyWatchWaiveRequest = z
  .object({
    rationale: z.string().min(1).max(4000),
    waivedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const PolicyWatchResolveRequest = z
  .object({ notes: z.string().max(4000) })
  .partial()
  .passthrough();

export const schemas: any = {
  createPolicyWatchItem_Body,
  waivePolicyWatchItem_Body,
  PolicyWatchStatus,
  InitiativeId,
  Problem,
  PolicyWatchId,
  UserId,
  PolicyWatchItem,
  PolicyWatchItemListData,
  ResponseMeta,
  PolicyWatchItemListResponse,
  PolicyWatchCreateRequest,
  PolicyWatchItemResponse,
  PolicyWatchWaiveRequest,
  PolicyWatchResolveRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/policy-watch',
    alias: 'listPolicyWatchItems',
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
        schema: z.enum(['open', 'waived', 'resolved']).optional(),
      },
      {
        name: 'blocksScale',
        type: 'Query',
        schema: z.boolean().optional(),
      },
      {
        name: 'initiativeId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  policyWatchId: z
                    .string()
                    .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  topic: z.string().min(1).max(300),
                  blocksScale: z.boolean(),
                  status: z.enum(['open', 'waived', 'resolved']),
                  thresholdDays: z.number().int().gte(1),
                  initiativeIds: z
                    .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .min(1),
                  openedAt: z.string().datetime({ offset: true }).optional(),
                  waivedAt: z.string().datetime({ offset: true }).optional(),
                  waivedByUserId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  waiverRationale: z.string().max(4000).optional(),
                  resolvedAt: z.string().datetime({ offset: true }).optional(),
                  resolutionNotes: z.string().max(4000).optional(),
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
    method: 'post',
    path: '/v1/policy-watch',
    alias: 'createPolicyWatchItem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPolicyWatchItem_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            topic: z.string().min(1).max(300),
            blocksScale: z.boolean(),
            status: z.enum(['open', 'waived', 'resolved']),
            thresholdDays: z.number().int().gte(1),
            initiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            openedAt: z.string().datetime({ offset: true }).optional(),
            waivedAt: z.string().datetime({ offset: true }).optional(),
            waivedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            waiverRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolutionNotes: z.string().max(4000).optional(),
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
    method: 'get',
    path: '/v1/policy-watch/:policyWatchId',
    alias: 'getPolicyWatchItem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyWatchId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            topic: z.string().min(1).max(300),
            blocksScale: z.boolean(),
            status: z.enum(['open', 'waived', 'resolved']),
            thresholdDays: z.number().int().gte(1),
            initiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            openedAt: z.string().datetime({ offset: true }).optional(),
            waivedAt: z.string().datetime({ offset: true }).optional(),
            waivedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            waiverRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolutionNotes: z.string().max(4000).optional(),
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
    path: '/v1/policy-watch/:policyWatchId/resolve',
    alias: 'resolvePolicyWatchItem',
    description: `Clears an open or waived blocker as resolved (BR-6).`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ notes: z.string().max(4000) })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'policyWatchId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            topic: z.string().min(1).max(300),
            blocksScale: z.boolean(),
            status: z.enum(['open', 'waived', 'resolved']),
            thresholdDays: z.number().int().gte(1),
            initiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            openedAt: z.string().datetime({ offset: true }).optional(),
            waivedAt: z.string().datetime({ offset: true }).optional(),
            waivedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            waiverRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolutionNotes: z.string().max(4000).optional(),
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
    path: '/v1/policy-watch/:policyWatchId/waive',
    alias: 'waivePolicyWatchItem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: waivePolicyWatchItem_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'policyWatchId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            policyWatchId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            topic: z.string().min(1).max(300),
            blocksScale: z.boolean(),
            status: z.enum(['open', 'waived', 'resolved']),
            thresholdDays: z.number().int().gte(1),
            initiativeIds: z
              .array(z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/))
              .min(1),
            openedAt: z.string().datetime({ offset: true }).optional(),
            waivedAt: z.string().datetime({ offset: true }).optional(),
            waivedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            waiverRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolutionNotes: z.string().max(4000).optional(),
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
