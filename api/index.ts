import { Hono } from "hono";
import userRouter from "./src/router/userRouter";
import authRouter from "./src/router/authRouter";
import transactionRouter from "./src/router/transactionRouter";
import { wrapReturnObject } from "./src/utils/returnFormat";
import { cors } from "hono/cors";

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

app.use(
  "/api/*",
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:8080",
      "http://front-end:8080",
    ],
    allowMethods: ["POST", "GET", "PATCH", "DELETE"],
  })
);

app.notFound((c) => {
  return c.json(wrapReturnObject(404), 404);
});

app.route("api/auth", authRouter);
app.route("/api/users", userRouter);
app.route("/api/users/:userId/transactions", transactionRouter);

export default app;
