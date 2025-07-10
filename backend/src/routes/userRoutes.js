import { signup, login } from "../controllers/user.controller.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
