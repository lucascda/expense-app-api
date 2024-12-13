import z from "zod";

type ExpenseCategory = "home" | "health" | "personal" | "food";

export interface Expense {
  title: string;
  amount: string;
  category: ExpenseCategory;
  userId: string;
}

const createExpenseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required and cannot be empty" }),
  amount: z
    .number()
    .min(1, { message: "Amount is required and cannot be empty" }),
  category: z.enum(["home", "health", "personal", "food"]),
  userId: z
    .string({ required_error: "UserId is required and cannot be empty" })
    .uuid(),
});
export type CreateExpenseRequest = z.infer<typeof createExpenseSchema>;
