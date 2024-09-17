import { Hono } from "hono";
import { db } from "../utils/database";
import { User, users } from "../db/schema/user";
import { jwt } from "hono/jwt";
import { verifyToken } from "../utils/authUtils";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

const userRouter = new Hono();

userRouter.use(
  "*",
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

//Get all users (dev route. Should be remove in production)
userRouter.get("/", async (c) => {
  try {
    const allUsers = await db.select().from(users);
    console.log(allUsers);

    return c.json(allUsers);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
});

//Modify user
userRouter.patch("/:id", async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json();
  const { authorization } = await c.req.header();

  if (!authorization) {
    return c.json({ error: "Missing credential" }, 401);
  }

  const token = authorization.replace("Bearer ", "");

  const payload = await verifyToken(token);

  if (Number(payload.sub) === Number(id)) {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 15);
    }

    const user = await db
      .update(users)
      .set({ ...body, updatedAt: sql`NOW()` })
      .where(eq(users.id, id));

    return c.json({ message: "User updated" }, 200);
  } else {
    return c.json({ error: "Unhautorized" }, 403);
  }
});

//Delete user
userRouter.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const { authorization } = await c.req.header();
  const token = authorization.replace("Bearer ", "");
  const payload = await verifyToken(token);

  if (!authorization) {
    return c.json({ error: "Missing credential" }, 401);
  }

  if (Number(payload.sub) === Number(id)) {
    const user = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ deletedId: users.id });

    return c.json({ message: "User deleted", userId: user }, 200);
  } else {
    return c.json({ error: "Unhautorized" }, 403);
  }
});

export default userRouter;
