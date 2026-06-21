import React, { useEffect, useState } from "react";
import liveBg from "./assets/liveBg.mp4";
import VideoBackground from "./components/VideoBackground";
import TodoList from "./components/TodoList";
import service from "./service/Services.js";
import Modal from "./components/Modal.jsx";

export default function App() {
  //   {
  //   "title": "Complete Node.js assignment 2 ",
  //   "completed": false,
  //   "priority": "high",
  //   "dueDate": "2026-06-25T10:00:00.000Z"
  // }
  const [todos, setTodos] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const fetch = async () => {
    try {
      const data = await service.getTodos();
      setTodos(data.data);
      // console.log("DATA:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, [openModal]);
  // console.log("Todo:", todos);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setOpenModal(true);
  };
  return (
    <div>
      <VideoBackground />
      <div className="fixed inset-0 bg-black/90 w-full h-full"></div>

      <div className="relative w-full h-full p-5">
        {/* Header */}
        <div className=" w-fit mx-auto p-5 px-10 border-orange-200/30 border shadow-2xl shadow-white/20 rounded-2xl backdrop-blur-xs">
          <h2 className="text-sm text-white font-bold tracking-widest text-center uppercase">
            Welcome to my <br />{" "}
            <span className="text-3xl text-orange-500 tracking-normal capitalize">
              MERN Todo App
            </span>
          </h2>
          <div className="bg-gradient-to-r from-transparent via-white to-transparent w-40 h-px mt-3 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-4 mt-5">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
            <div>
              <h2 className="text-xl font-semibold text-white">My Tasks</h2>
              <p className="text-sm text-zinc-400">
                Track and manage your todos
              </p>
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 cursor-pointer"
            >
              + Add Task
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-zinc-400 flex">
              <div className="px-6 py-4 flex-1">Task</div>
              <div className="px-6 py-4 flex-1">Priority</div>
              <div className="px-6 py-4 flex-1">Due Date</div>
              <div className="px-6 py-4 flex-1">Status</div>
              <div className="px-6 py-4 w-25"></div>
            </div>

            <div className="text-sm">
              {todos?.map((todo, i) => (
                <TodoList
                  key={todo._id}
                  id={todo._id}
                  taskname={todo.title}
                  priority={todo.priority}
                  completed={todo.completed}
                  dueDate={todo.dueDate}
                  onUpdate={fetch}
                  onEdit={() => handleEdit(todo)}
                />
              ))}
            </div>
          </div>
        </div>

        <Modal
          isOpen={openModal}
          mode={selectedTodo ? "edit" : "create"}
          editTodo={selectedTodo}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </div>
  );
}
