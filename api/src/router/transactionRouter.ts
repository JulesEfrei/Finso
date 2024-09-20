import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { verifyToken } from "../utils/authUtils";
import { wrapReturnObject } from "../utils/returnFormat";
import {
  deleteUserTransaction,
  getTransactionsCategories,
  getUserTransaction,
  getUserTransactions,
  newTransaction,
} from "../controller/transactionController";

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
    return c.json(wrapReturnObject(401), 401);
  }

  const token = authorization.replace("Bearer ", "");
  const payload = await verifyToken(token);

  if (Number(payload.sub) === Number(userId)) {
    return next();
  } else {
    return c.json(wrapReturnObject(403), 403);
  }
});

//Get all tasks of user
transactionRouter.get("/", async (c) => getUserTransactions(c));

//Get all transactions categories of user
transactionRouter.get("/categories", async (c) => getTransactionsCategories(c));

//Get transaction by id
transactionRouter.get("/:transactionId", async (c) => getUserTransaction(c));

//New transaction
transactionRouter.post("/", async (c) => newTransaction(c));

//Delete transaction
transactionRouter.delete("/:transactionId", async (c) =>
  deleteUserTransaction(c)
);

export default transactionRouter;
