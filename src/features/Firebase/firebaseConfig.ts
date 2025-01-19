// Import the Firebase app and services
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
//   onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addTaskDB, deleteTaskDB, fetchTasks, updateTaskDB } from "./firebaseDB";
import { Task } from "../StateType/stateType";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app); // Auth instance created

export const db = getFirestore(app); // Database instance created

const GoogleProvider = new GoogleAuthProvider();

export const signInAuthUserWithGooglePopUp = async () => {
  return await signInWithPopup(auth, GoogleProvider);
};

export const signOutAuthUser = async () => {
  await signOut(auth);
};

//   export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback);



export const addTask = async (newTask: Task) => {
    const taskId = await addTaskDB(newTask);
    console.log("Task added with ID:", taskId);
  };
  

export const updateTask = async (taskId: string, updatedTask: Task) => {
    await updateTaskDB(taskId, updatedTask);
    console.log("Task updated.");
  };
  

export const deleteTask = async (taskId: string) => {
    await deleteTaskDB(taskId);
    console.log("Task deleted.");
  };
  
  
export const fetchAllTasks = async () => {
    const tasks = await fetchTasks();
    console.log("Fetched tasks:", tasks);
  };