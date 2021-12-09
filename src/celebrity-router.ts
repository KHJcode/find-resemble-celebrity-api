import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function celebrityRouter(
  server: FastifyInstance,
  options: FastifyPluginOptions
) {
  server.get("/", async (request, reply) => {
    return "celebrity";
  });
}

export default celebrityRouter;
