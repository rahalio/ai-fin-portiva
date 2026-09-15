import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createBoardPack_Body = z
  .object({
    period: z.string().min(1).max(40),
    spendTotal: z.number().gte(0),
    expectedValue: z.number(),
    riskSummary: z.string().min(1).max(8000),
    stageDistribution: z
      .object({
        explore: z.number().int().gte(0),
        pilot: z.number().int().gte(0),
        scale: z.number().int().gte(0),
        coe_service: z.number().int().gte(0),
      })
      .passthrough(),
    killCount: z.number().int().gte(0).optional(),
    openPolicyBlockers: z.number().int().gte(0).optional(),
  })
  .passthrough();
const BoardPackStatus = z.enum(['draft', 'published']);
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
const BoardPackId = z.string();
const StageDistribution = z
  .object({
    explore: z.number().int().gte(0),
    pilot: z.number().int().gte(0),
    scale: z.number().int().gte(0),
    coe_service: z.number().int().gte(0),
  })
  .passthrough();
const BoardPack = z
  .object({
    boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
    period: z.string().min(1).max(40),
    spendTotal: z.number().gte(0),
    expectedValue: z.number(),
    riskSummary: z.string().min(1).max(8000),
    stageDistribution: z
      .object({
        explore: z.number().int().gte(0),
        pilot: z.number().int().gte(0),
        scale: z.number().int().gte(0),
        coe_service: z.number().int().gte(0),
      })
      .passthrough(),
    downloadUrl: z.string().url().optional(),
    status: z.enum(['draft', 'published']),
    publishedAt: z.string().datetime({ offset: true }).optional(),
    killCount: z.number().int().gte(0).optional(),
    openPolicyBlockers: z.number().int().gte(0).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const BoardPackListData = z
  .object({
    items: z.array(
      z
        .object({
          boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
          period: z.string().min(1).max(40),
          spendTotal: z.number().gte(0),
          expectedValue: z.number(),
          riskSummary: z.string().min(1).max(8000),
          stageDistribution: z
            .object({
              explore: z.number().int().gte(0),
              pilot: z.number().int().gte(0),
              scale: z.number().int().gte(0),
              coe_service: z.number().int().gte(0),
            })
            .passthrough(),
          downloadUrl: z.string().url().optional(),
          status: z.enum(['draft', 'published']),
          publishedAt: z.string().datetime({ offset: true }).optional(),
          killCount: z.number().int().gte(0).optional(),
          openPolicyBlockers: z.number().int().gte(0).optional(),
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
const BoardPackListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
              period: z.string().min(1).max(40),
              spendTotal: z.number().gte(0),
              expectedValue: z.number(),
              riskSummary: z.string().min(1).max(8000),
              stageDistribution: z
                .object({
                  explore: z.number().int().gte(0),
                  pilot: z.number().int().gte(0),
                  scale: z.number().int().gte(0),
                  coe_service: z.number().int().gte(0),
                })
                .passthrough(),
              downloadUrl: z.string().url().optional(),
              status: z.enum(['draft', 'published']),
              publishedAt: z.string().datetime({ offset: true }).optional(),
              killCount: z.number().int().gte(0).optional(),
              openPolicyBlockers: z.number().int().gte(0).optional(),
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
const BoardPackCreateRequest = z
  .object({
    period: z.string().min(1).max(40),
    spendTotal: z.number().gte(0),
    expectedValue: z.number(),
    riskSummary: z.string().min(1).max(8000),
    stageDistribution: z
      .object({
        explore: z.number().int().gte(0),
        pilot: z.number().int().gte(0),
        scale: z.number().int().gte(0),
        coe_service: z.number().int().gte(0),
      })
      .passthrough(),
    killCount: z.number().int().gte(0).optional(),
    openPolicyBlockers: z.number().int().gte(0).optional(),
  })
  .passthrough();
const BoardPackResponse = z
  .object({
    data: z
      .object({
        boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
        period: z.string().min(1).max(40),
        spendTotal: z.number().gte(0),
        expectedValue: z.number(),
        riskSummary: z.string().min(1).max(8000),
        stageDistribution: z
          .object({
            explore: z.number().int().gte(0),
            pilot: z.number().int().gte(0),
            scale: z.number().int().gte(0),
            coe_service: z.number().int().gte(0),
          })
          .passthrough(),
        downloadUrl: z.string().url().optional(),
        status: z.enum(['draft', 'published']),
        publishedAt: z.string().datetime({ offset: true }).optional(),
        killCount: z.number().int().gte(0).optional(),
        openPolicyBlockers: z.number().int().gte(0).optional(),
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

export const schemas: any = {
  createBoardPack_Body,
  BoardPackStatus,
  Problem,
  BoardPackId,
  StageDistribution,
  BoardPack,
  BoardPackListData,
  ResponseMeta,
  BoardPackListResponse,
  BoardPackCreateRequest,
  BoardPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/board-packs',
    alias: 'listBoardPacks',
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
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['draft', 'published']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  period: z.string().min(1).max(40),
                  spendTotal: z.number().gte(0),
                  expectedValue: z.number(),
                  riskSummary: z.string().min(1).max(8000),
                  stageDistribution: z
                    .object({
                      explore: z.number().int().gte(0),
                      pilot: z.number().int().gte(0),
                      scale: z.number().int().gte(0),
                      coe_service: z.number().int().gte(0),
                    })
                    .passthrough(),
                  downloadUrl: z.string().url().optional(),
                  status: z.enum(['draft', 'published']),
                  publishedAt: z.string().datetime({ offset: true }).optional(),
                  killCount: z.number().int().gte(0).optional(),
                  openPolicyBlockers: z.number().int().gte(0).optional(),
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
    path: '/v1/board-packs',
    alias: 'createBoardPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createBoardPack_Body,
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
            boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string().min(1).max(40),
            spendTotal: z.number().gte(0),
            expectedValue: z.number(),
            riskSummary: z.string().min(1).max(8000),
            stageDistribution: z
              .object({
                explore: z.number().int().gte(0),
                pilot: z.number().int().gte(0),
                scale: z.number().int().gte(0),
                coe_service: z.number().int().gte(0),
              })
              .passthrough(),
            downloadUrl: z.string().url().optional(),
            status: z.enum(['draft', 'published']),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            killCount: z.number().int().gte(0).optional(),
            openPolicyBlockers: z.number().int().gte(0).optional(),
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
    path: '/v1/board-packs/:boardPackId',
    alias: 'getBoardPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'boardPackId',
        type: 'Path',
        schema: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string().min(1).max(40),
            spendTotal: z.number().gte(0),
            expectedValue: z.number(),
            riskSummary: z.string().min(1).max(8000),
            stageDistribution: z
              .object({
                explore: z.number().int().gte(0),
                pilot: z.number().int().gte(0),
                scale: z.number().int().gte(0),
                coe_service: z.number().int().gte(0),
              })
              .passthrough(),
            downloadUrl: z.string().url().optional(),
            status: z.enum(['draft', 'published']),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            killCount: z.number().int().gte(0).optional(),
            openPolicyBlockers: z.number().int().gte(0).optional(),
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
    path: '/v1/board-packs/:boardPackId/publish',
    alias: 'publishBoardPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'boardPackId',
        type: 'Path',
        schema: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            boardPackId: z.string().regex(/^brd_[0-9A-HJKMNP-TV-Z]{26}$/),
            period: z.string().min(1).max(40),
            spendTotal: z.number().gte(0),
            expectedValue: z.number(),
            riskSummary: z.string().min(1).max(8000),
            stageDistribution: z
              .object({
                explore: z.number().int().gte(0),
                pilot: z.number().int().gte(0),
                scale: z.number().int().gte(0),
                coe_service: z.number().int().gte(0),
              })
              .passthrough(),
            downloadUrl: z.string().url().optional(),
            status: z.enum(['draft', 'published']),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            killCount: z.number().int().gte(0).optional(),
            openPolicyBlockers: z.number().int().gte(0).optional(),
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
