import { verifyToken } from "../utils/authUtils";
import { wrapReturnObject } from "../utils/returnFormat";
import bcrypt from "bcryptjs";
import { isEmail } from "../utils/validator";
import { users } from "../db/schema/user";
import { db } from "../utils/database";
import { eq, sql } from "drizzle-orm";
import { BlankEnv, BlankInput } from "hono/types";
import { Context } from "hono";
import { removeUser, updateUser } from "../repository/userRepository";

export async function patchUser(c: Context<BlankEnv, "/:id", BlankInput>) {
  const { id } = c.req.param();
  const body = await c.req.json();
  const { authorization } = await c.req.header();

  if (!authorization) {
    return c.json(wrapReturnObject(401), 401);
  }

  const token = authorization.replace("Bearer ", "");

  const payload = await verifyToken(token);

  if (Number(payload.sub) === Number(id)) {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 15);
    }

    if (body.email && !isEmail(body.email)) {
      return c.json(wrapReturnObject(400), 400);
    }

    const user = await updateUser(body, id);

    return c.json(wrapReturnObject(200, "User updated", user), 200);
  } else {
    return c.json(wrapReturnObject(403), 403);
  }
}

export async function deleteUser(c: Context<BlankEnv, "/:id", BlankInput>) {
  {
    const { id } = c.req.param();
    const { authorization } = await c.req.header();
    const token = authorization.replace("Bearer ", "");
    const payload = await verifyToken(token);

    if (!authorization) {
      return c.json(wrapReturnObject(401), 401);
    }

    if (Number(payload.sub) === Number(id)) {
      const user = await removeUser(id);

      return c.json(wrapReturnObject(200, "User deleted", user), 200);
    } else {
      return c.json(wrapReturnObject(403), 403);
    }
  }
}
