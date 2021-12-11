import fastify from "fastify";
import multer from "fastify-multer";
import { celebrityRouter } from "./celebrity-router";
import fastifyCors from "fastify-cors";
import fastifyStatic from "fastify-static";
import path from "path";

const server = fastify();
const PORT = process.env.PORT || 8080;

server.register(multer.contentParser);
server.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});
server.register(fastifyCors, { origin: true });
server.register(celebrityRouter, { prefix: "/celebrity" });

server.get("/", async (_request, reply) => {
  reply.code(200).send("Hello, World!");
});

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
