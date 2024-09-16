import {
  integer,
  pgTable,
  serial,
  text,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./user";

export const TransactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "outcome",
]);

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").notNull(),
  date: date("date", { mode: "string" }).notNull(),
  type: TransactionTypeEnum("transaction_type").notNull(),
  category: text("category"),
  user: integer("user_id")
    .references(() => users.id)
    .notNull(),
});

export type Transaction = typeof transactions.$inferSelect; // return type when queried
export type NewTransaction = typeof transactions.$inferInsert; // insert type
