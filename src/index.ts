import "dotenv/config";
import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

const port = process.env.PORT ?? 8080;
server.listen(process.env.port, () => {
  console.log(`Server listening on localhost:${port}`);
});
