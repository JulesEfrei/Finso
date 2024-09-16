import { Hono } from "hono";
import userRouter from "./src/db/api/user";
import authRouter from "./src/db/api/auth";

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
  return c.json({ data: "Not Found", error: true }, 404);
});

app.route("api/auth", authRouter);
app.route("/api/users", userRouter);

export default app;
