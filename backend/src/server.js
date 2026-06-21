import { connectDB } from "./db/connect.js";
import express from "express";
import "dotenv/config";
import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import cors from "cors";

async function start() {
  const port = process.env.PORT || 3000;
  const uri = process.env.MONGO_URI;

  const db = await connectDB(uri);

  const app = express();

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/todos", todoRoutes);

  app.use(errorHandler);
  app.use(notFound);

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
