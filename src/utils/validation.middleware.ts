import { Request, Response, NextFunction } from "express";
import { z, Schema, ZodTypeAny, ZodError } from "zod";

export const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
