import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { db } from "../components/firebase"; // import Firestore instance, NOT app

// Add a new task and return saved task with ID
export const addTask = async (task) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      console.log("Task added with ID:", docRef.id);
      return { ...task, id: docRef.id };
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;  // rethrow so caller knows about failure
    }
  };
  export const getTasks = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tasks"));
      const tasks = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        let deadline;
      
        if (data.deadline?.seconds) {
          // Firestore Timestamp format
          deadline = new Date(data.deadline.seconds * 1000).toISOString();
        } else if (typeof data.deadline === "string") {
          // ISO format
          deadline = data.deadline;
        } else {
          deadline = new Date().toISOString(); // fallback to now if invalid
        }
      
        return {
          ...data,
          id: docSnap.id,
          deadline,
        };
      });
            console.log("Fetched tasks:", tasks);
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];  // Return empty array on error to avoid breaking UI
    }
  };
// Update a task by ID
export const updateTask = async (taskId, updatedData) => {
    try {
      const docRef = doc(db, "tasks", taskId);
      await updateDoc(docRef, updatedData);
      console.log("Task updated with ID:", taskId);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };
// Delete a task by ID
export const deleteTask = async (taskId) => {
    try {
      const docRef = doc(db, "tasks", taskId);
      await deleteDoc(docRef);
      console.log("Task deleted with ID:", taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };
