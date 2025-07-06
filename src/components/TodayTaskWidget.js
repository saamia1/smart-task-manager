import React, { useState, useMemo, useEffect } from "react";
import "./TodayTaskWidget.css";

function TodayTasksWidget({ tasks, selectedDate }) {
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const selectedDateObj = new Date(selectedDate);
  const formattedHeader = selectedDateObj.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const formattedDate = selectedDateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  function formatLocalDate(date) {
    return (
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0")
    );
  }

  const selectedDayStr = formatLocalDate(selectedDateObj);

  const todayTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = formatLocalDate(
        new Date(
          task.deadline?.seconds
            ? task.deadline.seconds * 1000
            : task.deadline
        )
      );
      return taskDate === selectedDayStr;
    });
  }, [tasks, selectedDate]);

  const allCategories = useMemo(
    () => [...new Set(todayTasks.map((task) => task.category))],
    [todayTasks]
  );

  // 🔁 Reset selected categories if selected ones aren't in today's list
  useEffect(() => {
    setSelectedCategories((prev) => {
      const updated = new Set();
      for (let cat of prev) {
        if (allCategories.includes(cat)) updated.add(cat);
      }
      return updated;
    });
  }, [allCategories]);

  const filteredTasks = todayTasks.filter(
    (task) =>
      selectedCategories.size === 0 || selectedCategories.has(task.category)
  );

  const sortedTasks = [
    ...filteredTasks
      .filter((t) => !t.completed)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
    ...filteredTasks
      .filter((t) => t.completed)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
  ];

  return (
    <div className="today-widget">
      {todayTasks.length > 0 && (
  <div className="category-filter-dropdown">
    <button className="dropdown-toggle">Filter by Category ⬇</button>
    <div className="dropdown-content">
      {allCategories.map((cat) => (
        <label key={cat}>
          <input
            type="checkbox"
            checked={selectedCategories.has(cat)}
            onChange={() => {
              setSelectedCategories((prev) => {
                const updated = new Set(prev);
                if (updated.has(cat)) {
                  updated.delete(cat);
                } else {
                  updated.add(cat);
                }
                return new Set(updated);
              });
            }}
          />
          {cat}
        </label>
      ))}
    </div>
    {selectedCategories.size === 0 && (
      <p className="info-note">(All categories shown)</p>
    )}
  </div>
)}

      <h3>Tasks for {formattedHeader}</h3>

      {sortedTasks.length === 0 ? (
        <p>No tasks for {formattedDate}</p>
      ) : (
        sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`task-widget-card ${task.completed ? "completed" : ""}`}
          >
            <p>
              <strong>{task.title}</strong>
            </p>
            <p className="task-time">
              {new Date(
                task.deadline?.seconds
                  ? task.deadline.seconds * 1000
                  : task.deadline
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default TodayTasksWidget;
