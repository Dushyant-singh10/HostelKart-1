import {
  getItems,
  updateItem,
  deleteItem,
  addItem,
} from "../controllers/item.controller.js";
import { Router } from "express";

export const userRouter = Router();

// 1. Add item to a specific hostel
userRouter.post("/addItems/:hostelId", addItem);

// 2. Get all items for a specific hostel
userRouter.get("/:hostelId", getItems);

// 3. Update a specific item by ID
userRouter.put("/updateItem/:itemId", updateItem);

// 4. Delete a specific item by ID
userRouter.delete("/deleteItem/:itemId", deleteItem);

// 5. Welcome route for testing
userRouter.get("/", (req, res) => {
  res.send("Welcome to the Item API");
});
