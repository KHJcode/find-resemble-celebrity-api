import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { CreateCelebritySchema } from "./schema/create-celebrity";
import multer from "fastify-multer";
import { v4 } from "uuid";
import { celebrityService } from "./celebrity-service";
import { Celebrity, CelebrityItem } from "./types/celebrity";

const storage = multer.diskStorage({
  destination(
    _request: FastifyRequest,
    _file: any,
    cb: (arg0: null, arg1: string) => void
  ) {
    cb(null, "uploads/");
  },
  filename(
    request: FastifyRequest,
    _file: any,
    cb: (arg0: null, arg1: string) => void
  ) {
    const id = v4();
    (request as any).photoId = id;
    cb(null, `${id}.jpg`);
  },
});
const upload = multer({ storage });

export const celebrityRouter = async (
  server: FastifyInstance,
  _options: FastifyPluginOptions
) => {
  server.get("/", async (_request, _reply): Promise<CelebrityItem[]> => {
    return await celebrityService.getAllCelebrityItems();
  });

  server.get(
    "/resemble",
    { preHandler: upload.single("photo") },
    async (request, _reply): Promise<Celebrity | undefined> => {
      const { photoId } = request as any;
      return await celebrityService.getMostResembleCelebrityByPhotoId(photoId);
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
};
