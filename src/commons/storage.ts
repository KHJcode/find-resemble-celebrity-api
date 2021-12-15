import { FastifyRequest } from "fastify";
import multer from "fastify-multer";
import { v4 } from "uuid";

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

export const upload = multer({ storage });
