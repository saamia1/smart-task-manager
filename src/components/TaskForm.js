// src/components/TaskForm.js
import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAdd , selectedDate}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [time, setTime] = useState(""); 
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !time) {
      alert("Please enter both a title and a time.");
      return;
    }

    const [hours, minutes] = time.split(":");
    const deadlineDate = new Date(selectedDate);
    deadlineDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    const deadlineISO = deadlineDate.toISOString();

    onAdd({
      id: Date.now(),
      title,
      description,
      category,
      deadline: deadlineISO, // already formatted
      completed: false,
    });
    setTitle("");
    setCategory("Work");
    setDescription("");
    setTime("");
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
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <div className="button-container">
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
}

export default TaskForm;
