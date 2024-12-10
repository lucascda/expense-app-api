import { Router } from "express";
import { createUserController } from "./user.controller";
import { createUserService } from "./user.service";
import { UserRepository } from "./user.repository";

const userRouter = Router();
const userService = createUserService(UserRepository);
const userController = createUserController(userService);

userRouter.post("/", userController.createUser);

export default userRouter;
