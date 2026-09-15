/**
 * Extension handler stub — implement Portiva workflow logic here.
 * Preserved across codegen cleans via x-codegen.preserveOnClean.
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { OverlapDomainModule } from "../dependencies/overlap-ddd.dependencies.js";

export async function mergeOverlapCluster(
  request: FastifyRequest,
  reply: FastifyReply,
  _deps: OverlapDomainModule
): Promise<void> {
  void request;
  void _deps;
  return reply.code(501).send({
    type: "about:blank",
    title: "Not Implemented",
    status: 501,
    detail: "mergeOverlapCluster extension handler stub — wire use-case / sandbox next",
  });
}
