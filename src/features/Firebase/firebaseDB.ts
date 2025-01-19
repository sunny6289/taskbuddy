import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { Task } from "../../features/StateType/stateType"; // Import the Task type

// Function to add task in the database
export const addTaskDB = async (task: Task): Promise<string | void> => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Error: No authenticated user");
    return;
  }

  const tasksCollectionRef = collection(db, "user", user.uid, "tasks");
  try {
    const docRef = await addDoc(tasksCollectionRef, task);
    return docRef.id; // Return the generated task ID
  } catch (error: any) {
    console.error("Error adding task: ", error.message);
  }
};

// Function to update a task in the database
export const updateTaskDB = async (taskId: string, updatedTask: Partial<Task>): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Error: No authenticated user");
      return;
    }
  
    const taskRef = doc(db, "user", user.uid, "tasks", taskId);
    try {
      await updateDoc(taskRef, {
        ...updatedTask,
        timestamp: Date.now(),
      });
    } catch (error: any) {
      console.error("Error updating task: ", error.message);
    }
  };


  // Function to delete a task from the database
export const deleteTaskDB = async (taskId: string): Promise<void> => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Error: No authenticated user");
      return;
    }
  
    const taskRef = doc(db, "user", user.uid, "tasks", taskId);
    try {
      await deleteDoc(taskRef);
    } catch (error: any) {
      console.error("Error deleting task: ", error.message);
    }
  };

  // Function to fetch tasks from the database
export const fetchTasks = async (): Promise<Task[]> => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Error: No authenticated user");
      return [];
    }
  
    const tasksCollectionRef = collection(db, "user", user.uid, "tasks");
    try {
      const querySnapshot = await getDocs(tasksCollectionRef);
      const tasks: Task[] = querySnapshot.docs.map((doc) => ({
        taskId: doc.id,
        ...doc.data(), // Assuming Firestore stores the task object directly
      })) as Task[]; // Cast to the Task type
      return tasks;
    } catch (error: any) {
      console.error("Error fetching tasks: ", error.message);
      return [];
    }
  };

  
