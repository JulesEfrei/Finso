import { Context } from "hono";
import { BlankEnv, BlankInput } from "hono/types";
import { NewUser, users } from "../db/schema/user";
import { isEmail, isNull } from "../utils/validator";
import { wrapReturnObject } from "../utils/returnFormat";
import { db } from "../utils/database";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/authUtils";
import { createUser, getUserByEmail } from "../repository/userRepository";

export async function newUser(c: Context<BlankEnv, "", BlankInput>) {
  {
    const { name, email, password }: NewUser = await c.req.json();

    if (isNull([name, email, password]) || !isEmail(email)) {
      return c.json(wrapReturnObject(400), 400);
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    try {
      const [user] = await createUser({
        name,
        email,
        password: hashedPassword,
      });
      return c.json(wrapReturnObject(201, "User created!", user), 201);
    } catch (e) {
      return c.json(wrapReturnObject(400), 400);
    }
  }
}

export async function login(c: Context<BlankEnv, "", BlankInput>) {
  const { email, password } = await c.req.json();

  if (isNull([email, password])) {
    return c.json(wrapReturnObject(400), 400);
  }

  const [user] = await getUserByEmail(email);

  if (!user) {
    return c.json(wrapReturnObject(401, "Invalid username or password"), 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return c.json(wrapReturnObject(401, "Invalid username or password"), 401);
  }

  const token = await generateToken(user.id, user);
  return c.json(
    wrapReturnObject(200, null, {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    }),
    200
  );
}
