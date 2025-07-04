import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routes/user.routes.js"; // this should be user.routes.js not itemRoutes.js

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Mount under /api/users to match the controller routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the HostelKart API");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

if (app._router && app._router.stack) {
  console.log("🔍 Registered routes:");
  app._router.stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      console.log(`👉 ${Object.keys(layer.route.methods).join(", ").toUpperCase()} ${layer.route.path}`);
    }
  });
}


