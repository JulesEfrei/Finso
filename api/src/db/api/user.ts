import { Hono } from "hono";
import { db } from "../utils/database";
import { users } from "../schema/user";
import { jwt } from "hono/jwt";

const userRouter = new Hono();

userRouter.use(
  "*",
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

userRouter.get("/", async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default userRouter;
