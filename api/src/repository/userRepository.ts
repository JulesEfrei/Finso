import { eq, sql } from "drizzle-orm";
import { NewUser, User, users } from "../db/schema/user";
import { db } from "../utils/database";

export async function updateUser(user: Partial<User>, userId: number | string) {
  return db
    .update(users)
    .set({ ...user, updatedAt: sql`NOW()` })
    .where(eq(users.id, Number(userId)))
    .returning();
}

export async function removeUser(userId: number | string) {
  return db
    .delete(users)
    .where(eq(users.id, Number(userId)))
    .returning({ deletedId: users.id });
}

export async function createUser(user: NewUser) {
  return db.insert(users).values(user).returning();
}

export async function getUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email));
}
