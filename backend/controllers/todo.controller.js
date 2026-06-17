import { Todo } from "../src/models/todo.model.js";

// Create a Todo
export async function createTodo(req, res, next) {
  try {
    const todoData = req.body;
    console.log("Todo Data Recieved:", todoData);
    const createTodo = await Todo.create({ ...todoData });

    return res.status(201).json(createTodo);
  } catch (error) {
    next(error);
  }
}

// Get all Todo
export async function listTodo(req, res, next) {
  try {
    // Your code here
    const { page = 1, limit = 10, completed, priority, search } = req.query;
    const filters = {};

    if (completed !== undefined) {
      filters.completed = completed === "true";
    }

    if (priority) {
      filters.priority = priority;
    }
    if (search) {
      filters.title = {
        $regex: search,
        $options: "i",
      };
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const data = await Todo.find(filters)
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const total = await Todo.countDocuments(filters);

    return res.status(200).json({
      data: data,
      meta: {
        total,
        page: pageNumber,
        limit: limitNumber,
        pages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    next(error);
  }
}

// update Todo
export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo)
      return res.status(404).json({ error: { message: "Update Failed" } });

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

// For updating only completed field
export async function toggleTodo(req, res, next) {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo)
      return res.status(404).json({ error: { message: "Update Failed" } });

    todo.completed = !todo.completed;
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

// Delete the Todo
export async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ error: { message: "Deletion Failed" } });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}
