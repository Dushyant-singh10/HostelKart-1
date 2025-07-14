import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config(); // at the top of your main file, like app.js or index.js


import { itemRouter } from "./routes/item.routes.js"; 
import { userRouter } from "./routes/user.routes.js"; 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount your routers
app.use("/api/items", itemRouter); // e.g. POST /api/items/addItems
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the HostelKart API");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Optional: Log registered routes
if (app._router && app._router.stack) {
  console.log(" Registered routes:");
  app._router.stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      console.log(` ${Object.keys(layer.route.methods).join(", ").toUpperCase()} ${layer.route.path}`);
    }
  });
}
