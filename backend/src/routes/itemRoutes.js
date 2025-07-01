import {
  getItems,
  updateItem,
  deleteItem,
  addItem,
} from "../controllers/item.controller.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/addItems", addItem);
userRouter.get("/:hostelId", getItems);
userRouter.put("/updateItem/:itemId", updateItem);
userRouter.delete("/deleteItem/:itemId", deleteItem);
userRouter.get("/", (req, res) => {
  res.send("Welcome to the Item API");
});
