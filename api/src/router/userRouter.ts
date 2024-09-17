import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { deleteUser, patchUser } from "../controller/userController";

const userRouter = new Hono();

userRouter.use(
  "*",
  jwt({
    secret: process.env.JWT_SECRET,
  })
);

//Modify user
userRouter.patch("/:id", async (c) => await patchUser(c));

//Delete user
userRouter.delete("/:id", async (c) => deleteUser(c));

export default userRouter;
