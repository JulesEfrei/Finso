import { Hono } from "hono";
import { db } from "../utils/database";
import { users } from "../schema/user";

const authRouter = new Hono();

authRouter.post("register", async (c) => {
  const res = await await c.req.json();
  console.log(res);

  return c.text("Good !");
});

export default authRouter;
