import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/todoform/TodoForm";
import Tabs from "./components/tabs/Tabs";
import TodoList from "./components/todolist/TodoList";
import { getRecordsfromLocal, storeDataLocal } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setTask(null);
    setIsOpen(false);
  };

  const handleAddTask = (title, description, id = "") => {
    const taskId = tasks && tasks.length > 0 ? Math.max(...tasks?.map((item) => item.id)) + 1 : 1;
    let availableTasks;
    let alertMessage = "";

    if (id !== "") {
      availableTasks = tasks.map((item) => (item.id === id ? { ...item, title, description } : item));
      alertMessage = "Task has been updated successfully!";
    } else {
      const newTask = { id: taskId, title, description, isCompleted: false };
      availableTasks = [...tasks, newTask];
      alertMessage = "Task has been added successfully!";
    }

    setTasks(availableTasks);
    storeDataLocal("localTasks", availableTasks);
    setTask(null);
    setMessage(alertMessage);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  useEffect(() => {
    const records = getRecordsfromLocal("localTasks");
    if (records) {
      setTasks(records);
    }
  }, []);

  return (
    <div className="container">
      <div className="todo">Todo App</div>
      {message && <div className="alert success">{message}</div>}
      <TodoForm handleAddTask={handleAddTask} task={task} onEdit={handleEdit} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList tasks={tasks} setTasks={setTasks} filter={selectedTab} setTask={setTask} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;