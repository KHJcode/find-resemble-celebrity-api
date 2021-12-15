import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateCelebritySchema } from "./schema/create-celebrity";
import { celebrityService } from "./celebrity-module";
import { celebrityTest } from "./celebrity-module";
import { Celebrity, CelebrityItem } from "./types/celebrity";
import { upload } from "./commons";

export const celebrityRouter = async (
  server: FastifyInstance,
  _options: FastifyPluginOptions
) => {
  server.get("/", async (_request, _reply): Promise<CelebrityItem[]> => {
    return await celebrityService.findAllCelebrityItems();
  });

  server.get(
    "/resemble",
    { preHandler: upload.single("photo") },
    async (request, _reply): Promise<Celebrity | undefined> => {
      const { photoId } = request as any;
      return await celebrityService.findMostResembleCelebrityByPhotoId(photoId);
    }
  );

  server.get(
    "/:id",
    async (request, _reply): Promise<CelebrityItem | undefined> => {
      return await celebrityService.findCelebrityItemById(
        (request as any).params.id
      );
    }
  );

  server.post(
    "/",
    { schema: CreateCelebritySchema },
    async (request, reply) => {
      await celebrityService.createCelebrity(request.body as any);
      return reply.status(201).send("success");
    }
  );

  server.post(
    "/upload",
    {
      preHandler: upload.single("photo"),
    },
    async (request, reply) => {
      const { photoId } = request as any;
      return reply.status(201).send(photoId);
    }
  );

  server.post("/test", async (_request, reply) => {
    await celebrityTest.run();
    return reply.status(201).send("success");
  });
};
