/**
 * Extension handler stub — implement Portiva workflow logic here.
 * Preserved across codegen cleans via x-codegen.preserveOnClean.
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { DependencyDomainModule } from "../dependencies/dependency-ddd.dependencies.js";

export async function getDependencyConcentration(
  request: FastifyRequest,
  reply: FastifyReply,
  _deps: DependencyDomainModule
): Promise<void> {
  void request;
  void _deps;
  return reply.code(501).send({
    type: "about:blank",
    title: "Not Implemented",
    status: 501,
    detail: "getDependencyConcentration extension handler stub — wire use-case / sandbox next",
  });
}
