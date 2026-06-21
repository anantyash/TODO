import React, { useState } from "react";
import { Pencil, Trash2, AlertTriangle, X } from "lucide-react";
import service from "../service/Services";
import Modal from "./Modal";

// const isoString = "2026-06-25T10:00:00.000Z";
// const dateObject = new Date(isoString);

// const formattedDate = new Intl.DateTimeFormat('en-US', {
//   day: '2-digit',
//   month: 'short',
//   year: 'numeric'
// }).format(dateObject);

// // This creates "Jun 25, 2026". We split it to move the day to the front.
// const [month, day, year] = formattedDate.replace(',', '').split(' ');
// const finalResult = `${day} ${month.toLowerCase()}, ${year}`;

const priorityStyles = {
  high: "border-red-400/20 bg-red-500/10 text-red-300",
  medium: "border-amber-400/20 bg-amber-500/10 text-amber-300",
  low: "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
};

function TodoList({
  id,
  taskname = "Task",
  priority,
  dueDate,
  completed = false,
  onUpdate,
  onEdit,
}) {
  const [status, setStatus] = useState(completed);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dateObject = new Date(dueDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(dateObject);
//   const [month, day, year] = formattedDate.replace(',', '').split(' ');
//   const finalResult = `${day} ${month.toLowerCase()}, ${year}`;

  const toggleStatus = async () => {
    const toggle = await service.toggleTodo(id);
    if (toggle) {
      setStatus(!status);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("ID:", id);
      const data = await service.deleteTodo(id);
      console.log("Success:", data);
      onUpdate();
      setShowDeleteModal(false);
    } catch (err) {
      throw new Error(`Deletion Failed: ${err.message}`);
    }
  };

  const handleEdit = () => {
    setOpenModal(true);
  };

  return (
    <>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className=" w-full max-w-md rounded-3xl border border-white/20 bg-black backdrop-blur-2xl shadow-2xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/20 bg-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>

              <h2 className="text-xl font-semibold text-white">Delete Todo?</h2>

              <p className="mt-2 text-sm text-white/70">
                This action cannot be undone. The todo will be permanently
                deleted.
              </p>

              <div className="mt-6 flex w-full gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="
                flex-1
                rounded-xl
                border border-white/20
                bg-white/5
                px-4 py-3
                text-white
                transition cursor-pointer
                hover:bg-white/10
              "
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="
                flex-1 rounded-xl bg-red-500/80 px-4 py-3       font-medium
                text-white
                transition cursor-pointer
                hover:bg-red-500
              "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-b border-white/5 transition hover:bg-white/5 flex items-center">
        <div className="px-6 py-4 flex flex-1 gap-5">
          <input
            type="checkbox"
            checked={status}
            onChange={toggleStatus}
            className="h-5 w-5 cursor-pointer rounded border-zinc-500 bg-black accent-green-500"
          />

          <div className="font-medium text-white">{taskname}</div>
        </div>

        <div className="px-6 py-4 flex-1">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${
              priorityStyles[priority.toLowerCase()]
            }`}
          >
            {priority}
          </span>
        </div>

        <div className="px-6 py-4 text-zinc-300 flex-1">{formattedDate}</div>

        <div className="px-6 py-4 flex-1 flex items-center gap-4">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              !status
                ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
                : "border-green-400/20 bg-green-500/10 text-green-300"
            }`}
          >
            {status ? "Completed" : "Pending"}
          </span>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 flex items-center gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-blue-300 cursor-pointer"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoList;
