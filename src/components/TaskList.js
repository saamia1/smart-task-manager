// src/components/TaskList.js
import React, { useEffect, useState} from "react";
import "./TaskList.css";
import { MdMoreVert } from "react-icons/md"; // icon import

function TaskList({ 
    tasks, 
    onDelete , 
    onToggleComplete , 
    onEdit,
    onSaveEdit,
    onCancelEdit,
    editingTaskId,
    selectedDate,
}) {

    const [openMenuId, setOpenMenuId] = useState(null);
    const [editFields, setEditFields] = useState({});

      // Close dropdown on outside click
      useEffect(() => {
        const handleClickOutside = (e) => {
          const isMenuButton = e.target.closest(".menu-btn");
          const isDropdown = e.target.closest(".dropdown-menu");
      
          // If not clicking on menu button or dropdown, close the menu
          if (!isMenuButton && !isDropdown) {
            setOpenMenuId(null);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      onDelete(id);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditClick = (task) => {
    onEdit(task.id);
    const deadlineDate = new Date(task.deadline);
    const timeString = deadlineDate.toISOString().slice(11, 16); // "HH:mm"
    
    setEditFields({
      title: task.title,
      description: task.description,
      category: task.category,
      time: timeString, // use 'time' not deadlineISO
    });
    setOpenMenuId(null);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleSave = (id) => {
    if (!editFields.title || !editFields.time) {
      alert("Title and deadline are required.");
      return;
    }
  
    const [hours, minutes] = editFields.time.split(":");
    const deadlineDate = new Date(selectedDate);
    deadlineDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    const deadlineISO = deadlineDate.toISOString();
  
    onSaveEdit(id, {
      ...editFields,
      deadline: deadlineISO,
    });
  };
  
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
          {editingTaskId === task.id ? (
            <div className="task-main edit-mode">
              <input
                type="text"
                name="title"
                value={editFields.title}
                onChange={handleInputChange}
                placeholder="Task Title"
              />
              <textarea
                name="description"
                value={editFields.description}
                onChange={handleInputChange}
                placeholder="Optional Description"
              />
              <select
                name="category"
                value={editFields.category}
                onChange={handleInputChange}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Learning">Learning</option>
              </select>
              <input
                type="time"
                name="time"
                value={editFields.time}
                onChange={handleInputChange}
              />
              <div className="edit-buttons">
                <button onClick={() => handleSave(task.id)}>Save</button>
                <button onClick={onCancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="complete-checkbox"
              />
              <div className="task-main">
                <h3>{task.title}</h3>
                {task.description && <p>{task.description}</p>}
                <p><strong>Category:</strong> {task.category}</p>
                <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="task-actions">
                <button onClick={() => toggleMenu(task.id)} className="menu-btn">
                  <MdMoreVert size={24} />
                </button>
                {openMenuId === task.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                )}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;