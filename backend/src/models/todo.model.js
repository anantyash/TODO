import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

todoSchema.index({ completed: 1, createdAt: -1 });
export const Todo = mongoose.model("Todo", todoSchema);
