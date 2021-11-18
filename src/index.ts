import fastify from "fastify";

const server = fastify();
const PORT = process.env.PORT || 8080;

server.get('/', async (req, rep) => {
  return 'Hello, World!';
});

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
