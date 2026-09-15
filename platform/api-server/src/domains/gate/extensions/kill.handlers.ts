/**
 * Extension handler stub — implement Portiva workflow logic here.
 * Preserved across codegen cleans via x-codegen.preserveOnClean.
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { GateDomainModule } from "../dependencies/gate-ddd.dependencies.js";

export async function killStageGate(
  request: FastifyRequest,
  reply: FastifyReply,
  _deps: GateDomainModule
): Promise<void> {
  void request;
  void _deps;
  return reply.code(501).send({
    type: "about:blank",
    title: "Not Implemented",
    status: 501,
    detail: "killStageGate extension handler stub — wire use-case / sandbox next",
  });
}
