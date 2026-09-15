/**
 * Extension handler stub — implement Portiva workflow logic here.
 * Preserved across codegen cleans via x-codegen.preserveOnClean.
 */

import type { FastifyRequest, FastifyReply } from "fastify";
import type { BoardPackDomainModule } from "../dependencies/board-pack-ddd.dependencies.js";

export async function publishBoardPack(
  request: FastifyRequest,
  reply: FastifyReply,
  _deps: BoardPackDomainModule
): Promise<void> {
  void request;
  void _deps;
  return reply.code(501).send({
    type: "about:blank",
    title: "Not Implemented",
    status: 501,
    detail: "publishBoardPack extension handler stub — wire use-case / sandbox next",
  });
}
