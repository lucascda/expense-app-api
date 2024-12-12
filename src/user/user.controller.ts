import { NextFunction, Request, Response } from "express";
import { createUserService } from "./user.service";

export const createUserController = (
  userService: ReturnType<typeof createUserService>
) => ({
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await userService.signIn(req.body);
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  },
  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById((req as any).user_id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
});
