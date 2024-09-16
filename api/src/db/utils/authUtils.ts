import { sign, verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

export const generateToken = (userId: number) => {
  return sign(
    {
      sub: userId,
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
