import { wrapReturnObject } from "../utils/returnFormat";
import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import {
  createTransaction,
  getAverageTransactionsByMonth,
  getCategories,
  getMaxTransactions,
  getTransactionById,
  getUserTransactionsBy,
  removeTransaction,
} from "../repository/transactionRepository";

export async function getUserTransactions(
  c: Context<BlankEnv, "/:userId", BlankInput>
) {
  const { userId } = c.req.param();

  try {
    const allTransactionsOfUser = await getUserTransactionsBy(
      userId,
      c.req.query()
    );

    const maxTransactions = await getMaxTransactions(userId);

    return c.json(
      wrapReturnObject(200, null, {
        transactions: allTransactionsOfUser,
        maxTransactions: maxTransactions["0"].count,
      }),
      200
    );
  } catch (e) {
    return c.json(wrapReturnObject(400), 400);
  }
}

export async function getUserTransaction(
  c: Context<BlankEnv, "/:userId/:transactionId", BlankInput>
) {
  const { userId, transactionId } = c.req.param();

  try {
    const transaction = await getTransactionById(transactionId);

    if (transaction.length === 0) {
      return c.json(wrapReturnObject(404), 404);
    }

    if (Number(transaction[0].user) !== Number(userId)) {
      return c.json(wrapReturnObject(403), 403);
    }

    return c.json(wrapReturnObject(200, null, transaction[0]), 200);
  } catch (e) {
    return c.json(wrapReturnObject(400), 400);
  }
}

export async function getTransactionsCategories(
  c: Context<BlankEnv, "/:userId", BlankInput>
) {
  const { userId } = c.req.param();

  try {
    const categories = await getCategories(userId);
    return c.json(wrapReturnObject(200, null, categories), 200);
  } catch (e) {
    return c.json(wrapReturnObject(400), 400);
  }
}

export async function getAverageTransactions(
  c: Context<BlankEnv, "/:userId", BlankInput>
) {
  const { userId } = c.req.param();

  try {
    const averageResults = await getAverageTransactionsByMonth(userId);
    return c.json(
      wrapReturnObject(200, null, { transactions: averageResults }),
      200
    );
  } catch (e) {
    return c.json(wrapReturnObject(400), 400);
  }
}

export async function newTransaction(
  c: Context<BlankEnv, "/:userId", BlankInput>
) {
  const { userId } = c.req.param();
  const body = await c.req.json();

  try {
    const transaction = await createTransaction(body, userId);
    return c.json(
      wrapReturnObject(201, "Transaction created !", transaction),
      201
    );
  } catch (e) {
    return c.json(wrapReturnObject(400), 400);
  }
}

export async function deleteUserTransaction(
  c: Context<BlankEnv, "/:userId/:transactionId", BlankInput>
) {
  const { userId, transactionId } = c.req.param();

  try {
    const transaction = await getTransactionById(transactionId);

    if (transaction.length === 0) {
      return c.json(wrapReturnObject(404), 404);
    }

    if (Number(transaction[0].user) !== Number(userId)) {
      return c.json(wrapReturnObject(403), 403);
    }

    await removeTransaction(userId, transactionId);

    return c.json(wrapReturnObject(200, "Transaction deleted!"), 200);
  } catch (e) {
    return c.json(wrapReturnObject(400), 400);
  }
}
