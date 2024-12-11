import { Request, Response } from "express";
import { createUserService } from "./user.service";

export const createUserController = (
  userService: ReturnType<typeof createUserService>
) => ({
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message, name: error.name });
      }
    }
  },
  async signIn(req: Request, res: Response) {
    try {
      const token = await userService.signIn(req.body);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message, name: error.name });
      }
    }
  },
  async profile(req: Request, res: Response) {
    try {
      const user = await userService.findById((req as any).user_id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message, name: error.name });
      }
    }
  },
});
