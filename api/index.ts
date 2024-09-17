import { Hono } from "hono";
import userRouter from "./src/router/userRouter";
import authRouter from "./src/router/authRouter";
import transactionRouter from "./src/router/transactionRouter";
import { wrapReturnObject } from "./src/utils/returnFormat";

const app = new Hono();

app.get("/api/health", (c) => {
  return c.json({ status: "alive", version: "1.0.0" }, 200);
});

app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  c.header("X-Response-Time", `${ms}ms`);
});

app.notFound((c) => {
  return c.json(wrapReturnObject(404), 404);
});

app.route("api/auth", authRouter);
app.route("/api/users", userRouter);
app.route("/api/users/:userId/transactions", transactionRouter);

export default app;
