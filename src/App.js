import React, { useState , useEffect} from "react";
import './App.css';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import CalendarPanel from "./components/CalendarPannel";
import TodayTasksWidget from "./components/TodayTaskWidget";

function App() {
  useEffect(() => {
    if ("Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
          console.log("Notification permission:", permission);
        });
      } else {
        console.log("Notification permission already:", Notification.permission);
      }
    } else {
      console.log("Browser does not support notifications");
    }
  }, []);
  

  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notifiedTaskIds, setNotifiedTaskIds] = useState(new Set());

useEffect(() => {
  if (Notification.permission !== "granted") return;

  const interval = setInterval(() => {
    const now = new Date();

    tasks.forEach(task => {
      const deadline = new Date(task.deadline);

      if (
        deadline <= now &&
        !notifiedTaskIds.has(task.id) &&
        !task.completed
      ) {
        new Notification("Task Deadline Reached", {
          body: `Task "${task.title}" deadline has been reached.`,
          icon: "/favicon.ico", // Optional, your app icon path
        });

        setNotifiedTaskIds(prev => new Set(prev).add(task.id));
      }
    });
  }, 30 * 1000); // Check every 30 seconds

  return () => clearInterval(interval);
}, [tasks, notifiedTaskIds]);

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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const formattedSelectedDate = getLocalDateString(selectedDate);
  
  const tasksForSelectedDate = tasks.filter((task) => {
    // Use local date string from task.deadline as well
    const taskDateObj = new Date(task.deadline);
    const taskDate = getLocalDateString(taskDateObj);
    return taskDate === formattedSelectedDate;
  });
  
    const tasksCompleted = tasksForSelectedDate.filter((task) => task.completed).length;

  return (
    <div className="app-container">
      <Header total={tasksForSelectedDate.length} completed={tasksCompleted} />

      <div className="main-content">
        <div className="center-panel">
          <CalendarPanel onDateSelect={handleDateSelect} />
          <TaskForm onAdd={handleAddTask} selectedDate={selectedDate} />
          <TaskList
            tasks={tasksForSelectedDate}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            editingTaskId={editingTaskId}
            selectedDate={selectedDate} 
          />
        </div>
        <div className="right-panel">
          <TodayTasksWidget tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;
