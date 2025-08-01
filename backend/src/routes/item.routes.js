import {
  getItems,
  updateItem,
  deleteItem,
  addItem,
} from "../controllers/item.controller.js";
import { Router } from "express";

export const itemRouter = Router();

//  hostelId is passed as a route parameter
itemRouter.post("/addItems/:hostelId", addItem); 

itemRouter.get("/:hostelId", getItems);
itemRouter.put("/updateItem/:itemId", updateItem);
itemRouter.delete("/deleteItem/:itemId", deleteItem);

// Optional welcome route
itemRouter.get("/", (req, res) => {
  res.json("Welcome to the Item API");
});

