import { ExpenseRepository } from "./expense.repository";
import { NextFunction, Request, Response } from "express";
import { createExpenseService } from "./expense.service";

export const createExpenseController = (
  service: ReturnType<typeof createExpenseService>
) => ({
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenUserId = (req as any).user_id;
      const userId = req.params.userId;
      if (tokenUserId != userId) {
        throw new Error("User ids dont match");
      }
      const expense = await service.create({
        ...req.body,
        userId: (req as any).user_id,
      });
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  },
});
