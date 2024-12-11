import { Router } from "express";
import { createUserController } from "./user.controller";
import { createUserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { createJwtService } from "utils/jwt";
import { validate } from "utils/validation.middleware";
import { CreateUserSchema } from "./user.dto";
import { authMiddleware } from "utils/auth.middleware";

const userRouter = Router();
const jwtService = createJwtService();
const userService = createUserService(UserRepository, jwtService);
const userController = createUserController(userService);

userRouter.post("/", validate(CreateUserSchema), userController.createUser);
userRouter.post("/signin", userController.signIn);
userRouter.get(
  "/me",
  authMiddleware.authenticateRequest,
  userController.profile
);

export default userRouter;
