import { pgTable, serial, text, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("name").notNull(),
  createdAt: date("date", { mode: "string" }),
  updatedAt: date("date", { mode: "string" }),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
