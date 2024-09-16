import { Hono } from "hono";
import { db } from "../utils/database";
import { users } from "../schema/user";

const userRouter = new Hono();

userRouter.get("/user:id", async (c) => {
  try {
    const allUsers = await db.select().from(users);
    return c.json(allUsers);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

export default userRouter;
