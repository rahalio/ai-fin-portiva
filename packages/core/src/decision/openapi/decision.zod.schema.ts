import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createFundingDecision_Body = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['fund', 'kill', 'scale', 'pause']),
    rationale: z.string().min(1).max(8000),
    amount: z.number().gte(0).optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
    talentReskillNotes: z.string().max(4000).optional(),
  })
  .passthrough();
const InitiativeId = z.string();
const FundingDecisionType = z.enum(['fund', 'kill', 'scale', 'pause']);
const UserId = z.string();
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
const DecisionId = z.string();
const Currency = z.string();
const FundingDecision = z
  .object({
    decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['fund', 'kill', 'scale', 'pause']),
    rationale: z.string().min(1).max(8000),
    amount: z.number().gte(0).optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
    talentReskillNotes: z.string().max(4000).optional(),
    lockedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const FundingDecisionListData = z
  .object({
    items: z.array(
      z
        .object({
          decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
          initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
          decision: z.enum(['fund', 'kill', 'scale', 'pause']),
          rationale: z.string().min(1).max(8000),
          amount: z.number().gte(0).optional(),
          currency: z
            .string()
            .min(3)
            .max(3)
            .regex(/^[A-Z]{3}$/)
            .optional(),
          decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
          dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
          talentReskillNotes: z.string().max(4000).optional(),
          lockedAt: z.string().datetime({ offset: true }),
          createdAt: z.string().datetime({ offset: true }),
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
const FundingDecisionListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
              initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
              decision: z.enum(['fund', 'kill', 'scale', 'pause']),
              rationale: z.string().min(1).max(8000),
              amount: z.number().gte(0).optional(),
              currency: z
                .string()
                .min(3)
                .max(3)
                .regex(/^[A-Z]{3}$/)
                .optional(),
              decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
              dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
              talentReskillNotes: z.string().max(4000).optional(),
              lockedAt: z.string().datetime({ offset: true }),
              createdAt: z.string().datetime({ offset: true }),
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
const FundingDecisionCreateRequest = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['fund', 'kill', 'scale', 'pause']),
    rationale: z.string().min(1).max(8000),
    amount: z.number().gte(0).optional(),
    currency: z
      .string()
      .min(3)
      .max(3)
      .regex(/^[A-Z]{3}$/)
      .optional(),
    decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
    talentReskillNotes: z.string().max(4000).optional(),
  })
  .passthrough();
const FundingDecisionResponse = z
  .object({
    data: z
      .object({
        decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
        initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
        decision: z.enum(['fund', 'kill', 'scale', 'pause']),
        rationale: z.string().min(1).max(8000),
        amount: z.number().gte(0).optional(),
        currency: z
          .string()
          .min(3)
          .max(3)
          .regex(/^[A-Z]{3}$/)
          .optional(),
        decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
        dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
        talentReskillNotes: z.string().max(4000).optional(),
        lockedAt: z.string().datetime({ offset: true }),
        createdAt: z.string().datetime({ offset: true }),
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
  createFundingDecision_Body,
  InitiativeId,
  FundingDecisionType,
  UserId,
  Problem,
  DecisionId,
  Currency,
  FundingDecision,
  FundingDecisionListData,
  ResponseMeta,
  FundingDecisionListResponse,
  FundingDecisionCreateRequest,
  FundingDecisionResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/decisions',
    alias: 'listFundingDecisions',
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
        name: 'initiativeId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
      {
        name: 'decision',
        type: 'Query',
        schema: z.enum(['fund', 'kill', 'scale', 'pause']).optional(),
      },
      {
        name: 'decidedByUserId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
                  initiativeId: z
                    .string()
                    .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
                  decision: z.enum(['fund', 'kill', 'scale', 'pause']),
                  rationale: z.string().min(1).max(8000),
                  amount: z.number().gte(0).optional(),
                  currency: z
                    .string()
                    .min(3)
                    .max(3)
                    .regex(/^[A-Z]{3}$/)
                    .optional(),
                  decidedByUserId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
                  talentReskillNotes: z.string().max(4000).optional(),
                  lockedAt: z.string().datetime({ offset: true }),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/decisions',
    alias: 'createFundingDecision',
    description: `Locks rationale, amount, decidedByUserId, and dissentNotes. Scale decisions
should include talentReskillNotes (BR-5, BR-10).
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createFundingDecision_Body,
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
            decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            decision: z.enum(['fund', 'kill', 'scale', 'pause']),
            rationale: z.string().min(1).max(8000),
            amount: z.number().gte(0).optional(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
            dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
            talentReskillNotes: z.string().max(4000).optional(),
            lockedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/decisions/:decisionId',
    alias: 'getFundingDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'decisionId',
        type: 'Path',
        schema: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            decisionId: z.string().regex(/^dec_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            decision: z.enum(['fund', 'kill', 'scale', 'pause']),
            rationale: z.string().min(1).max(8000),
            amount: z.number().gte(0).optional(),
            currency: z
              .string()
              .min(3)
              .max(3)
              .regex(/^[A-Z]{3}$/)
              .optional(),
            decidedByUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
            dissentNotes: z.array(z.string().min(1).max(2000)).optional(),
            talentReskillNotes: z.string().max(4000).optional(),
            lockedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
