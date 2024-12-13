import { CreateExpenseRequest } from "./expense.dto";
import { ExpenseRepository } from "./expense.repository";

export const createExpenseService = (repository: typeof ExpenseRepository) => ({
  async create(data: CreateExpenseRequest) {
    const expense = await repository.save({
      ...data,
      amount: data.amount.toString(),
    });
    return expense[0];
  },
});
