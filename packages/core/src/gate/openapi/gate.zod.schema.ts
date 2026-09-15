import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createStageGate_Body = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
    toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
    killMetrics: z.array(z.string().min(1).max(500)).min(1),
  })
  .passthrough();
const killStageGate_Body = z
  .object({ killMetricHit: z.array(z.string()), notes: z.string().max(2000) })
  .partial()
  .passthrough();
const exceptionStageGate_Body = z
  .object({
    rationale: z.string().min(1).max(4000),
    approvedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const InitiativeId = z.string();
const GateStatus = z.enum(['open', 'passed', 'failed', 'paused']);
const InitiativeStage = z.enum(['explore', 'pilot', 'scale', 'coe_service']);
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
const GateId = z.string();
const UserId = z.string();
const StageGate = z
  .object({
    gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
    toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
    killMetrics: z.array(z.string().min(1).max(500)).min(1),
    status: z.enum(['open', 'passed', 'failed', 'paused']),
    exceptionRationale: z.string().max(4000).optional(),
    resolvedAt: z.string().datetime({ offset: true }).optional(),
    resolvedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const StageGateListData = z
  .object({
    items: z.array(
      z
        .object({
          gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
          initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
          fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
          toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
          killMetrics: z.array(z.string().min(1).max(500)).min(1),
          status: z.enum(['open', 'passed', 'failed', 'paused']),
          exceptionRationale: z.string().max(4000).optional(),
          resolvedAt: z.string().datetime({ offset: true }).optional(),
          resolvedByUserId: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
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
const StageGateListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
              initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
              fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
              toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
              killMetrics: z.array(z.string().min(1).max(500)).min(1),
              status: z.enum(['open', 'passed', 'failed', 'paused']),
              exceptionRationale: z.string().max(4000).optional(),
              resolvedAt: z.string().datetime({ offset: true }).optional(),
              resolvedByUserId: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
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
const StageGateCreateRequest = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
    fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
    toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
    killMetrics: z.array(z.string().min(1).max(500)).min(1),
  })
  .passthrough();
const StageGateResponse = z
  .object({
    data: z
      .object({
        gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
        initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
        fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
        toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
        killMetrics: z.array(z.string().min(1).max(500)).min(1),
        status: z.enum(['open', 'passed', 'failed', 'paused']),
        exceptionRationale: z.string().max(4000).optional(),
        resolvedAt: z.string().datetime({ offset: true }).optional(),
        resolvedByUserId: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
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
const GatePassRequest = z
  .object({ evidenceNotes: z.string().max(2000) })
  .partial()
  .passthrough();
const GateKillRequest = z
  .object({ killMetricHit: z.array(z.string()), notes: z.string().max(2000) })
  .partial()
  .passthrough();
const GatePauseRequest = z
  .object({ reason: z.string().max(2000) })
  .partial()
  .passthrough();
const GateExceptionRequest = z
  .object({
    rationale: z.string().min(1).max(4000),
    approvedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createStageGate_Body,
  killStageGate_Body,
  exceptionStageGate_Body,
  InitiativeId,
  GateStatus,
  InitiativeStage,
  Problem,
  GateId,
  UserId,
  StageGate,
  StageGateListData,
  ResponseMeta,
  StageGateListResponse,
  StageGateCreateRequest,
  StageGateResponse,
  GatePassRequest,
  GateKillRequest,
  GatePauseRequest,
  GateExceptionRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/gates',
    alias: 'listStageGates',
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
        name: 'status',
        type: 'Query',
        schema: z.enum(['open', 'passed', 'failed', 'paused']).optional(),
      },
      {
        name: 'fromStage',
        type: 'Query',
        schema: z.enum(['explore', 'pilot', 'scale', 'coe_service']).optional(),
      },
      {
        name: 'toStage',
        type: 'Query',
        schema: z.enum(['explore', 'pilot', 'scale', 'coe_service']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
                  initiativeId: z
                    .string()
                    .regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
                  fromStage: z.enum([
                    'explore',
                    'pilot',
                    'scale',
                    'coe_service',
                  ]),
                  toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
                  killMetrics: z.array(z.string().min(1).max(500)).min(1),
                  status: z.enum(['open', 'passed', 'failed', 'paused']),
                  exceptionRationale: z.string().max(4000).optional(),
                  resolvedAt: z.string().datetime({ offset: true }).optional(),
                  resolvedByUserId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
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
    path: '/v1/gates',
    alias: 'createStageGate',
    description: `killMetrics is required on create (BR-3).`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createStageGate_Body,
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
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            killMetrics: z.array(z.string().min(1).max(500)).min(1),
            status: z.enum(['open', 'passed', 'failed', 'paused']),
            exceptionRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolvedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/gates/:gateId',
    alias: 'getStageGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            killMetrics: z.array(z.string().min(1).max(500)).min(1),
            status: z.enum(['open', 'passed', 'failed', 'paused']),
            exceptionRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolvedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/gates/:gateId/exception',
    alias: 'exceptionStageGate',
    description: `Required when kill metrics were missed but leadership elects to continue (BR-3).`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: exceptionStageGate_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            killMetrics: z.array(z.string().min(1).max(500)).min(1),
            status: z.enum(['open', 'passed', 'failed', 'paused']),
            exceptionRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolvedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/gates/:gateId/kill',
    alias: 'killStageGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: killStageGate_Body.optional(),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
      {
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            killMetrics: z.array(z.string().min(1).max(500)).min(1),
            status: z.enum(['open', 'passed', 'failed', 'paused']),
            exceptionRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolvedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/gates/:gateId/pass',
    alias: 'passStageGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ evidenceNotes: z.string().max(2000) })
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
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            killMetrics: z.array(z.string().min(1).max(500)).min(1),
            status: z.enum(['open', 'passed', 'failed', 'paused']),
            exceptionRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolvedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
    path: '/v1/gates/:gateId/pause',
    alias: 'pauseStageGate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ reason: z.string().max(2000) })
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
        name: 'gateId',
        type: 'Path',
        schema: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            gateId: z.string().regex(/^gat_[0-9A-HJKMNP-TV-Z]{26}$/),
            initiativeId: z.string().regex(/^ini_[0-9A-HJKMNP-TV-Z]{26}$/),
            fromStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            toStage: z.enum(['explore', 'pilot', 'scale', 'coe_service']),
            killMetrics: z.array(z.string().min(1).max(500)).min(1),
            status: z.enum(['open', 'passed', 'failed', 'paused']),
            exceptionRationale: z.string().max(4000).optional(),
            resolvedAt: z.string().datetime({ offset: true }).optional(),
            resolvedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
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
