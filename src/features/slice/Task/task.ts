import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialTaskState, Task } from "../../StateType/stateType";

const initialState: initialTaskState = {
  isFiltered: false,
  tasks: [],
  filteredTasks: [],
  selectedTasks: [],
  taskToEdit: {
    taskId: "",
    taskTitle: "",
    taskDescription: "",
    taskDueOn: "",
    taskCategory: "",
    taskStatus: "",
    taskFiles: []
  }
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
      console.log("after upload",state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(
        (task) => task.taskId !== action.payload
      );
    },
    editTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.taskId !== action.payload.taskId ? task : action.payload
      );
    },
    filterTask: (state, action: PayloadAction<Task[]>) => {
      if (action.payload.length === 0) {
        if (!state.isFiltered) {
          state.filteredTasks = state.tasks;
        } else {
          state.filteredTasks = action.payload;
        }
      } else {
        state.filteredTasks = action.payload; 
      }
    },
    setTaskToEdit: (state, action: PayloadAction<string>)=>{
        const temp = state.tasks.find(task => task.taskId === action.payload)
        state.taskToEdit = temp ? temp : {
            taskId: "",
            taskTitle: "",
            taskDescription: "",
            taskDueOn: "",
            taskCategory: "",
            taskStatus: "",
            taskFiles: []
          }
    },
    resetTaskToEdit: (state)=>{
        state.taskToEdit = {
            taskId: "",
            taskTitle: "",
            taskDescription: "",
            taskDueOn: "",
            taskCategory: "",
            taskStatus: "",
            taskFiles: []
          }
    },
    setIsFiltered: (state, action: PayloadAction<boolean>) => {
      state.isFiltered = action.payload;
    },
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTasks = [...state.selectedTasks, action.payload];
    },
    deselectTask: (state, action: PayloadAction<string>) => {
      state.selectedTasks = state.selectedTasks.filter(
        (task) => task.taskId !== action.payload
      );
    },
    updateSelectedTaskStatus: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) => {
        const matchingTask = state.selectedTasks.find(
          (selectTask) => selectTask.taskId === task.taskId
        );
        return matchingTask ? { ...task, taskStatus: action.payload } : task;
      });
      state.selectedTasks = [];
    },
    deleteSelectedTask: (state) => {
        state.tasks = state.tasks.filter(task => 
            !state.selectedTasks.some(selectedTask => selectedTask.taskId === task.taskId)
        )
        state.selectedTasks = []
    },
    deselectAllTask: (state) => {
      state.selectedTasks = [];
    },
    seedAllTask: (state, action: PayloadAction<Task[]>)=>{
      state.tasks = action.payload
    }
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  filterTask,
  setIsFiltered,
  selectTask,
  deselectTask,
  updateSelectedTaskStatus,
  deleteSelectedTask,
  deselectAllTask,
  setTaskToEdit,
  resetTaskToEdit,
  seedAllTask
} = taskSlice.actions;
