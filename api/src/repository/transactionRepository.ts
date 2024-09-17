import { and, eq } from "drizzle-orm";
import { NewTransaction, transactions } from "../db/schema/transaction";
import { db } from "../utils/database";

export async function getUserTransactionsByType(
  userId: string | number,
  type?: string
) {
  const filter = type
    ? type === "income"
      ? and(
          eq(transactions.user, Number(userId)),
          eq(transactions.type, "income")
        )
      : and(
          eq(transactions.user, Number(userId)),
          eq(transactions.type, "outcome")
        )
    : eq(transactions.user, Number(userId));

  return db.select().from(transactions).where(filter);
}

export async function getTransactionById(transactionId: string | number) {
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.id, Number(transactionId)));
}

export async function createTransaction(
  transaction: NewTransaction,
  userId: string | number
) {
  return db
    .insert(transactions)
    .values({ ...transaction, user: Number(userId) })
    .returning();
}

export async function removeTransaction(
  userId: string | number,
  transactionId: string | number
) {
  return db
    .delete(transactions)
    .where(
      and(
        eq(transactions.id, Number(transactionId)),
        eq(transactions.user, Number(userId))
      )
    );
}
