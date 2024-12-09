import "dotenv/config";
import express from "express";
import { createServer } from "http";
import connectToDatabase from "./db/db";

const app = express();
const server = createServer(app);

const port = process.env.PORT ?? 8080;

async function startServer() {
  try {
    await connectToDatabase();
    server.listen(process.env.port, () => {
      console.log(`Server listening on localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
}

startServer();
