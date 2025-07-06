// src/components/TaskForm.js
import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAdd , selectedDate}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [categories, setCategories] = useState(["Work", "Personal", "Learning"]);
  const [newCategory, setNewCategory] = useState("");
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
  
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
       <div className="top-row">
       <input
        type="text"
        className="title-input"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="category-row">
      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

  <input
    type="text"
    placeholder="Add category"
    value={newCategory}
    onChange={(e) => setNewCategory(e.target.value)}
  />
  <button type="button" onClick={handleAddCategory}>+</button>

</div>
<input
      type="time"
      className="time-input"    // <--- add this
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  </div>
  <div className="bottom-row">
    <textarea
      placeholder="Optional description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    ></textarea>
    
    <div className="button-container">
      <button type="submit">Add Task</button>
    </div>
  </div>
</form>
  );
}

export default TaskForm;
