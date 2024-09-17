import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { db } from "../utils/database";
import { transactions } from "../db/schema/transaction";
import { verifyToken } from "../utils/authUtils";
import { and, eq } from "drizzle-orm";

const transactionRouter = new Hono();

transactionRouter.use(
  "*",
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

//Authorization middleware
transactionRouter.use("*", async (c, next) => {
  const { userId } = c.req.param() as { userId: string };

  const { authorization } = await c.req.header();

  if (!authorization) {
    return c.json({ error: "Missing credential" }, 401);
  }

  const token = authorization.replace("Bearer ", "");
  const payload = await verifyToken(token);

  if (Number(payload.sub) === Number(userId)) {
    return next();
  } else {
    return c.json({ error: "Unhautorized" }, 403);
  }
});

//Get all tasks of user
transactionRouter.on("GET", ["/", "/type/:type?"], async (c) => {
  const { userId, type } = c.req.param() as { userId: string; type?: string };

  try {
    const filter = type
      ? type === "income"
        ? and(eq(transactions.user, userId), eq(transactions.type, "income"))
        : and(eq(transactions.user, userId), eq(transactions.type, "outcome"))
      : eq(transactions.user, userId);

    const allTransactionsOfUser = await db
      .select()
      .from(transactions)
      .where(filter);
    return c.json(allTransactionsOfUser, 200);
  } catch (e) {
    return c.json({ error: e.message }, 400);
  }
});

//Get transaction by id
transactionRouter.get("/:transactionId", async (c) => {
  const { userId, transactionId } = c.req.param() as {
    userId: string;
    transactionId: string;
  };

  try {
    const transaction = await db
      .select()
      .from(transactions)
      .where(
        and(eq(transactions.user, userId), eq(transactions.id, transactionId))
      );

    if (transaction.length === 0) {
      return c.json({ error: "Transaction not found." }, 404);
    }

    return c.json(transaction[0], 200);
  } catch (e) {
    return c.json({ error: e.message }, 400);
  }
});

//New transaction
transactionRouter.post("/", async (c) => {
  const { userId } = c.req.param() as { userId: string };
  const body = await c.req.json();

  try {
    await db.insert(transactions).values({ ...body, user: userId });
    return c.json({ message: "Transaction created !" }, 201);
  } catch (e) {
    return c.json({ error: e.message }, 400);
  }
});

//Delete transaction
transactionRouter.delete("/:transactionId", async (c) => {
  const { userId, transactionId } = c.req.param() as {
    userId: string;
    transactionId: string;
  };

  try {
    const t = await db
      .select({
        user: transactions.user,
      })
      .from(transactions)
      .where(eq(transactions.id, transactionId));

    if (t.length === 0) {
      return c.json({ error: "Transaction not found." }, 404);
    }

    if (Number(t[0].user) !== Number(userId)) {
      return c.json({ error: "Unhautorized" }, 401);
    }

    await db
      .delete(transactions)
      .where(
        and(eq(transactions.id, transactionId), eq(transactions.user, userId))
      );

    return c.json({ message: "Transaction deleted!" }, 200);
  } catch (e) {
    return c.json({ error: e.message }, 400);
  }
});

export default transactionRouter;
