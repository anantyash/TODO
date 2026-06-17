import express from "express";
import {
  createTodo,
  deleteTodo,
  listTodo,
  toggleTodo,
  updateTodo,
} from "../../controllers/todo.controller.js";
import { validateId } from "../middlewares/validateId.middleware.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/", listTodo);

router.use("/:id", validateId);
router.route("/:id").patch(updateTodo).delete(deleteTodo);

router.patch("/:id/toggle", toggleTodo);

export default router;
