// src/components/TaskForm.js
import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !deadline) {
        alert("Please enter both a title and a deadline.");
        return;
      }
    onAdd({
      id: Date.now(),
      title,
      description,
      category,
      deadline,
      completed: false,
    });
    setTitle("");
    setCategory("Work");
    setDescription("");
    setDeadline("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Optional description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Learning">Learning</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
