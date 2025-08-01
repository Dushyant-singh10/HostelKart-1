import { signup, login } from "../controllers/user.controller.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);



//here we make router from router varaible hai too waise 
// jaha par express se app bnate the yaha par ham router bnate hai