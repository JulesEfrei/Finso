import { Hono } from "hono";
import { login, newUser } from "../controller/authController";

const authRouter = new Hono();

// Register new user
authRouter.post("/register", async (c) => newUser(c));

// Login user and generate JWT token
authRouter.post("/login", async (c) => login(c));

export default authRouter;
