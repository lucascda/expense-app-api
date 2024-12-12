import z from "zod";

export type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
};

export type SignInResponse = {
  token: string;
};

export interface User {
  name: string;
  email: string;
  password: string;
}

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required and cannot be empty" }),
  password: z
    .string()
    .min(1, { message: "Password is required and cannot be empty" }),
});
export type SignInRequest = z.infer<typeof SignInSchema>;

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
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
