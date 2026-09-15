/**
 * ID Generator Service Implementation — Portiva prefixes.
 */

import type { DomainCode } from '@portiva/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@portiva/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@portiva/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  iniId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.initiative);
  }
  scrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.scorecard);
  }
  gatId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.gate);
  }
  decId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.decision);
  }
  depId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.dependency);
  }
  polId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.policyWatch);
  }
  brdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.boardPack);
  }
  ovlId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.overlap);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
