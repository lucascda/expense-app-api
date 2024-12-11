import { Router } from "express";
import { createUserController } from "./user.controller";
import { createUserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { createJwtService } from "utils/jwt";
import { validate } from "utils/validation.middleware";
import { CreateUserSchema } from "./user.dto";

const userRouter = Router();
const jwtService = createJwtService();
const userService = createUserService(UserRepository, jwtService);
const userController = createUserController(userService);

userRouter.post("/", validate(CreateUserSchema), userController.createUser);
userRouter.post("/signin", userController.signIn);

export default userRouter;
