import React, { useEffect, useState } from "react";
import { X, Plus, CalendarDays, Flag, ClipboardList } from "lucide-react";
import service from "../service/Services";

const PRIORITY = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
});

function Modal({ isOpen, mode, editTodo = {}, onClose }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(PRIORITY.LOW);
  const [dueDate, setDueDate] = useState();

//   console.log("Edit Todo:", editTodo);

  useEffect(() => {
    if (mode === "edit" && editTodo) {
      setTitle(editTodo.title || "");
      setPriority(editTodo.priority || PRIORITY.LOW);
      setDueDate(editTodo.dueDate || "");
    }
  }, [editTodo, mode]);

  const handleSubmit = async (e) => {
    // console.log("Title: ", title);
    // console.log("Priority: ", priority);
    // console.log("Due Date: ", dueDate);
    e.preventDefault();

    const todo = {
      title,
      priority,
      dueDate,
    };

    try {
      if (mode === "edit") {
        await service.updateTodo(editTodo._id, todo);
      } else {
        await service.addTodo(todo);
      }
      onClose();
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm ">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {mode === "edit" ? "Edit Task" : "Create New Task"}
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                {mode === "edit"
                  ? "Modify the task information and save your changes."
                  : "Add a new task and stay organized."}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Task Name */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <ClipboardList size={16} />
                Task Name
              </label>

              <input
                type="text"
                placeholder="Task Name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-orange-500/50"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            {/* Priority */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Flag size={16} />
                Priority
              </label>

              <select
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500/50 cursor-pointer"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                }}
              >
                <option value={PRIORITY.LOW} className="bg-zinc-900">
                  Low
                </option>
                <option value={PRIORITY.MEDIUM} className="bg-zinc-900">
                  Medium
                </option>
                <option value={PRIORITY.HIGH} className="bg-zinc-900">
                  High
                </option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <CalendarDays size={16} />
                Due Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500/50 cursor-pointer"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-zinc-300 transition hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 font-medium text-white transition hover:bg-orange-500 cursor-pointer"
            >
              {/* <Plus size={16} /> */}
              {mode === "edit" ? "Save Changes" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
