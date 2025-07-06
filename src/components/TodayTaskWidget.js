import React from "react";
import "./TodayTaskWidget.css";

function TodayTasksWidget({ tasks }) {
    const today = new Date().toISOString().split("T")[0];
  
    const todayTasks = tasks
      .filter((task) => {
        const taskDate = new Date(task.deadline.seconds ? task.deadline.seconds * 1000 : task.deadline)
        .toISOString()
        .split("T")[0];
              return taskDate === today;
      })
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // ✅ sort ascending

  
    return (
      <div className="today-widget">
        <h2>Today's Tasks</h2>
        {todayTasks.length === 0 ? (
          <p>No tasks today</p>
        ) : (
          todayTasks.map((task) => (
            <div key={task.id} className="task-widget-card">
              <p><strong>{task.title}</strong></p>
              {task.description && <p>{task.description}</p>}
              {task.deadline.includes("T") && (
                <p className="task-time">
                    {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                )}
            </div>
          ))
        )}
      </div>
    );
  }
  
  export default TodayTasksWidget;