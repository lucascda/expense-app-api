import { db } from "db/db";
import { User } from "./user.dto";
import { users } from "db/schema";
import { eq } from "drizzle-orm";

export const UserRepository = {
  findByEmail: async (email: string) => {
    const user = await db.select().from(users).where(eq(users.email, email));
    return user;
  },
  findById: async (id: string) => {
    const user = await db.select().from(users).where(eq(users.id, id));
    return user;
  },
  save: async (data: User) => {
    try {
      const user = await db.insert(users).values(data).returning();

      return user;
    } catch (error) {
      throw new Error("Error saving user");
    }
  },
};
