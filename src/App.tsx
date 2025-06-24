import React, { useEffect, useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Todo" | "Doing" | "Done";
};

const getLocalTasks = (): Task[] => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};

const setLocalTasks = (tasks: Task[]) => {
  localStorage.setItem("todos", JSON.stringify(tasks));
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedTasks = getLocalTasks();
    if (storedTasks && storedTasks.length > 0) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const columns: ("Todo" | "Doing" | "Done")[] = ["Todo", "Doing", "Done"];

  const moveToNextStatus = (task: Task) => {
    const nextStatus =
      task.status === "Todo"
        ? "Doing"
        : task.status === "Doing"
        ? "Done"
        : null;
    if (!nextStatus) return;
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: nextStatus } : t
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: newTitle,
      description: newDescription,
      status: "Todo",
    };
    setTasks([...tasks, newTask]);
    setNewTitle("");
    setNewDescription("");
    setShowModal(false);
  };

  const renderTasks = (status: "Todo" | "Doing" | "Done") => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="task-actions">
            {task.status !== "Done" && (
              <button
                className="move-btn"
                onClick={() => moveToNextStatus(task)}
              >
                {"-->"}
              </button>
            )}
            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ));
  };

  return (
    <div className="container">
      <h1 className="title">Avengers</h1>

      <button className="open-modal-btn" onClick={() => setShowModal(true)}>
        + Add Task
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Task</h2>
            <input
              type="text"
              placeholder="Task title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="board">
        {columns.map((column) => (
          <div key={column} className="column">
            <h2>{column}</h2>
            {renderTasks(column)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
