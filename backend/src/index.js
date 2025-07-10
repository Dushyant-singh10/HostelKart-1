import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
<<<<<<< HEAD
import { itemRouter } from "./routes/itemRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
=======
import { userRouter } from "./routes/user.routes.js"; // this should be user.routes.js not itemRoutes.js
>>>>>>> 24577e95baadb09254b1e21047700e2a7a88c101

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
app.use("/api", router);
app.use("/api/items", itemRouter);
=======
// ✅ Mount under /api/users to match the controller routes
>>>>>>> 24577e95baadb09254b1e21047700e2a7a88c101
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


