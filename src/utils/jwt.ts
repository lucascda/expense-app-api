import { decode, JwtPayload, sign, verify } from "jsonwebtoken";
import "dotenv/config";

export interface UserJwtPayload {
  user_id: string;
  iat: Number;
  exp: Number;
}

export const createJwtService = () => ({
  signToken(user_id: string) {
    const token = sign({ user_id }, process.env.JWT_SECRET!, {
      expiresIn: 3600,
    });

    return token;
  },
  verifyToken(payload: string): string | JwtPayload | UserJwtPayload {
    const token = verify(payload, process.env.JWT_SECRET!);
    return token;
  },
});
