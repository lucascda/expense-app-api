import "dotenv/config";
import express from "express";
import { createServer } from "http";
import connectToDatabase from "./db/db";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import userRouter from "user/user.router";
import { validate } from "utils/validation.middleware";
import { CreateUserSchema } from "user/user.dto";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use("/users", validate(CreateUserSchema), userRouter);
const server = createServer(app);

const port = process.env.PORT ?? 8080;

async function startServer() {
  try {
    await connectToDatabase();
    server.listen(process.env.PORT, () => {
      console.log(`Server listening on localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server", error);
    process.exit(1);
  }
}

startServer();
