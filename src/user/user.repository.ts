import { db } from "db/db";
import { users } from "db/schema";
import { eq } from "drizzle-orm";
import { User } from "./user.dto";

export const UserRepository = {
  findByEmail: async (email: string) => {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user;
  },
  save: async (data: User) => {
    try {
      const user = await db.insert(users).values(data).returning();
      console.log(user);
      return user;
    } catch (error) {
      throw new Error("Error saving user");
    }
  },
};
