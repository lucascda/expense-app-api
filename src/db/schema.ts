import { InferSelectModel } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { numeric } from "drizzle-orm/pg-core";
import {
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const expenseCategoryEnum = pgEnum("expense-category", [
  "home",
  "health",
  "personal",
  "food",
]);

export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 30 }).notNull(),
  amount: numeric("amount", { scale: 2, precision: 15 }).notNull(),
  category: expenseCategoryEnum().notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
