import { and, count, desc, eq, sql } from "drizzle-orm";
import { NewTransaction, transactions } from "../db/schema/transaction";
import { db } from "../utils/database";

export async function getUserTransactionsBy(
  userId: string | number,
  options?: {
    type?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    minAmount?: string;
    maxAmount?: string;
    search?: string;
    limit?: string;
    offset?: string;
  }
) {
  let filters = [`user_id = ${userId}`];

  if (options?.type) {
    filters.push(`transaction_type = '${options.type}'`);
  }

  if (options?.category) {
    filters.push(`category = '${options.category}'`);
  }

  if (options?.search) {
    filters.push(`name LIKE '%${options.search}%'`);
  }

  if (options?.minAmount) {
    if (options?.maxAmount) {
      filters.push(
        `(amount >= ${options.minAmount} AND amount <= ${options.maxAmount})`
      );
    } else {
      filters.push(`amount >= ${options.minAmount}`);
    }
  }

  if (options?.maxAmount) {
    filters.push(`amount <= ${options.maxAmount})`);
  }

  if (options?.startDate) {
    if (options?.endDate) {
      filters.push(
        `(date >= '${options.startDate}' AND date <= '${options.endDate}')`
      );
    } else {
      filters.push(`date >= '${options.startDate}'`);
    }
  }

  if (options?.endDate) {
    filters.push(`date <= '${options.endDate}'`);
  }

  return db
    .select()
    .from(transactions)
    .where(sql.raw(`${filters.join(" AND ")}`))
    .orderBy(desc(transactions.date))
    .limit(Number(options?.limit) || 50)
    .offset(Number(options?.offset) || 0);
}

export async function getTransactionById(transactionId: string | number) {
  return db
    .select()
    .from(transactions)
    .where(eq(transactions.id, Number(transactionId)));
}

export async function getMaxTransactions(userId: string | number) {
  return db
    .select({ count: count() })
    .from(transactions)
    .where(eq(transactions.user, Number(userId)));
}

export async function getAverageTransactionsByMonth(userId: string | number) {
  return db
    .select({
      month: sql`TO_CHAR(${transactions.date}, 'YYYY-MM')`,
      averageIncome: sql`AVG(CASE WHEN ${transactions.type} = 'income' THEN ${transactions.amount} END)`,
      averageOutcome: sql`AVG(CASE WHEN ${transactions.type} = 'outcome' THEN ${transactions.amount} END)`,
    })
    .from(transactions)
    .where(eq(transactions.user, Number(userId)))
    .groupBy(sql`TO_CHAR(${transactions.date}, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(${transactions.date}, 'YYYY-MM')`);
}

export async function getCategories(userId: string | number) {
  return db
    .selectDistinct({ category: transactions.category })
    .from(transactions)
    .where(eq(transactions.user, Number(userId)));
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
