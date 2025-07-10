import {
  getItems,
  updateItem,
  deleteItem,
  addItem,
} from "../controllers/item.controller.js";
import { Router } from "express";

export const itemRouter = Router();

itemRouter.post("/addItems", addItem);
itemRouter.get("/:hostelId", getItems);
itemRouter.put("/updateItem/:itemId", updateItem);
itemRouter.delete("/deleteItem/:itemId", deleteItem);
itemRouter.get("/", (req, res) => {
  res.send("Welcome to the Item API");
});
