import { Request, Response, NextFunction } from "express";
import { InvalidCredentialsError } from "user/user.error";
import { createJwtService, UserJwtPayload } from "./jwt";
import { MissingJwtToken } from "./utils.error";

const createAuthMiddleware = (
  jwtService: ReturnType<typeof createJwtService>
) => ({
  authenticateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const token = extractTokenFromHeader(req);

      if (!token) {
        throw new MissingJwtToken();
      }
      const payload = jwtService.verifyToken(token);

      (req as any).user_id = (payload as UserJwtPayload).user_id;
      next();
    } catch (error) {
      //throw new InvalidCredentialsError();

      next(error);
    }
  },
});

const extractTokenFromHeader = (req: Request) => {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
};

export const authMiddleware = createAuthMiddleware(createJwtService());
