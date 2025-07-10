import { Router } from "express";
import { getProfile, getMyItems } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js"; // assuming you use JWT middleware

export const userRouter = Router();

// 1. Get current logged-in user's profile
userRouter.get("/profile", authMiddleware, getProfile);

// 2. Get all items owned by the logged-in user
userRouter.get("/items", authMiddleware, getMyItems);

// 3. Welcome test route
userRouter.get("/", (req, res) => {
  res.send("Welcome to the User API");
});
userRouter.get("/test", (req, res) => {
    res.send("User route working");
  });
  
