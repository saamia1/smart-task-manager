import React, { useState , useEffect} from "react";
import './App.css';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import CalendarPanel from "./components/CalendarPannel";
import TodayTasksWidget from "./components/TodayTaskWidget";
import { addTask, getTasks, updateTask, deleteTask } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notifiedTaskIds, setNotifiedTaskIds] = useState(new Set());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);  

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

// When adding a task:
const handleAddTask = async (newTask) => {
  try {
    const saved = await addTask(newTask);
    setTasks(prev => [...prev, saved]);
    
  } catch (error) {
    console.error("Failed to add task:", error);
  }
};

const handleDeleteTask = async (taskId) => {
  await deleteTask(taskId);
  setTasks((prev) => prev.filter((task) => task.id !== taskId));
};

const handleToggleComplete = async (taskId) => {
  const targetTask = tasks.find((t) => t.id === taskId);
  if (!targetTask) return;
  
  const updatedStatus = !targetTask.completed;
  await updateTask(taskId, { completed: updatedStatus });
  
  setTasks((prev) =>
    prev.map((task) =>
      task.id === taskId ? { ...task, completed: updatedStatus } : task
    )
  );
};

  const handleStartEdit = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleSaveEdit = async (taskId, updatedTaskData) => {
    await updateTask(taskId, updatedTaskData);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedTaskData } : task
      )
    );
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
    if (!task.deadline) return false;  // guard against missing deadline
    const taskDate = new Date(task.deadline.seconds ? task.deadline.seconds * 1000 : task.deadline)
    .toISOString()
    .split("T")[0];
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
          <TodayTasksWidget 
          tasks={tasks} 
          selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
