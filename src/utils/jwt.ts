import { sign } from "jsonwebtoken";
import "dotenv/config";

export const createJwtService = () => ({
  signToken(user_id: string) {
    const token = sign({ user_id }, process.env.JWT_SECRET!, {
      expiresIn: 3600,
    });

    return token;
  },
});
