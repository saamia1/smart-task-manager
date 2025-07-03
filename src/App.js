import React, { useState } from "react";
import './App.css';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskID) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskID);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleStartEdit = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleSaveEdit = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="app">
      <h1>Smart Task Manager</h1>
      <TaskForm onAdd={handleAddTask} />
      <TaskList 
      tasks={tasks} 
      onDelete={handleDeleteTask} 
      onToggleComplete={handleToggleComplete}
      onEdit={handleStartEdit}
      onSaveEdit={handleSaveEdit}
      onCancelEdit={handleCancelEdit}
      editingTaskId={editingTaskId}
      />

    </div>
  );
}

export default App;
