import { connectDB } from "./db/connect.js";
import express from "express";
import "dotenv/config";

async function start() {
  const port = process.env.PORT || 3000;
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/todo_api_lab";

  const db = await connectDB(uri);

  const app = express();

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
