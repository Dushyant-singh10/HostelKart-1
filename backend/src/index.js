import express from "express";
import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routes/itemRoutes.js";

const app = express();
const router = Router();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api/items", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the HostelKart API");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
