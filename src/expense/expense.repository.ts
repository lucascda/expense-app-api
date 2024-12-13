import { expenses } from "db/schema";
import { Expense } from "./expense.dto";
import { db } from "db/db";

export const ExpenseRepository = {
  async save(data: Expense) {
    const expense = db.insert(expenses).values(data).returning();
    return expense;
  },
};
