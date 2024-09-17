import { sign, verify } from "hono/jwt";
import { User } from "../db/schema/user";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number, user: User) => {
  return sign(
    {
      sub: userId,
      user,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //1h
    },
    JWT_SECRET
  );
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
};
