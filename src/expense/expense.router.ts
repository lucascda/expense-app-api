import { Router } from "express";
import { authMiddleware } from "utils/auth.middleware";
import { createExpenseService } from "./expense.service";
import { ExpenseRepository } from "./expense.repository";
import { createExpenseController } from "./expense.controller";

const expenseRouter = Router();
const expenseService = createExpenseService(ExpenseRepository);
const expenseController = createExpenseController(expenseService);

expenseRouter.post(
  "/:userId/expenses",
  authMiddleware.authenticateRequest,
  expenseController.create
);

export default expenseRouter;
