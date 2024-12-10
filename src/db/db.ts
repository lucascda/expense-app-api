import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);

export default async function connectToDatabase() {
  try {
    console.log("Trying to connect to database...");

    await db.execute("SELECT 1");
    console.log("Succesfully connected to database.");
    return db;
  } catch (error) {
    console.error("Error while connecting to database", error);
    throw error;
  }
}
