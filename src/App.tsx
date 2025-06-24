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

  useEffect(() => {
    const storedTasks = getLocalTasks();
    if (storedTasks.length) {
      setTasks(storedTasks);
    } else {
      const defaultTasks: Task[] = [
        { id: 1, title: "Weather", description: "Check weather", status: "Todo" },
        { id: 2, title: "Hotel", description: "Book Hotel", status: "Todo" },
        { id: 3, title: "Medicine", description: "Buy medicines", status: "Todo" },
        { id: 4, title: "Flights", description: "Book Flights for holiday", status: "Doing" },
        { id: 5, title: "Insurance", description: "Buy Travel insurance", status: "Doing" },
        { id: 6, title: "Taxi", description: "Book taxi to Airport", status: "Done" },
        { id: 7, title: "Shopping", description: "Buy cloths for holiday", status: "Done" },
      ];
      setTasks(defaultTasks);
      setLocalTasks(defaultTasks);
    }
  }, []);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const columns: ("Todo" | "Doing" | "Done")[] = ["Todo", "Doing", "Done"];

  const renderTasks = (status: "Todo" | "Doing" | "Done") => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      ));
  };

  return (
    <div className="container">
      <h1 className="title">Avengers</h1>
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