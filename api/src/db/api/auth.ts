import { Hono } from "hono";
import { db } from "../utils/database";
import { NewUser, users } from "../schema/user";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/authUtils";
import { eq } from "drizzle-orm";

const authRouter = new Hono();

// Register new user
authRouter.post("/register", async (c) => {
  const { name, email, password }: NewUser = await c.req.json();

  const hashedPassword = await bcrypt.hash(password, 15);
  console.log({ name, email, password: hashedPassword });

  await db
    .insert(users)
    .values({ name, email, password: hashedPassword })
    .returning();

  return c.json({ message: "User created !" });
});

// Login user and generate JWT token
authRouter.post("/login", async (c) => {
  const { name, email, password } = await c.req.json();

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    return c.json({ message: "Invalid username or password" }, 401);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return c.json({ message: "Invalid username or password" }, 401);
  }

  const token = await generateToken(user.id);
  return c.json({ token });
});

export default authRouter;
