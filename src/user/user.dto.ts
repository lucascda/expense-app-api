import z from "zod";

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInUser {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export const CreateUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required and cannot be empty" }),
    email: z
      .string()
      .min(1, { message: "Email is required and cannot be empty" }),
    password: z
      .string()
      .min(1, { message: "Password is required and cannot be empty" }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "Password is required and cannot be empty" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
