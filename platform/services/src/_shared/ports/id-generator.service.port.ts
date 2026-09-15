/**
 * IdGeneratorService Port — starter prefixes (extend in consumer repos).
 */

import type { DomainCode } from '@portiva/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  iniId(): string;
  scrId(): string;
  gatId(): string;
  decId(): string;
  depId(): string;
  polId(): string;
  brdId(): string;
  ovlId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
