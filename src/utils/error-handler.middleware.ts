import { Response, Request, NextFunction } from "express";

const createErrorHandler = () => ({
  async handle(error: Error, res: Response) {
    if (error instanceof Error) {
      const err = error as Error & { statusCode?: number };
      res.status(err.statusCode ?? 500).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
      return;
    }
    res.status(500).json({
      error: {
        name: "UnexpectedError",
        message: "An unexpected error error ocurred",
      },
    });
  },
});

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler.handle(err, res);
};
const errorHandler = createErrorHandler();
