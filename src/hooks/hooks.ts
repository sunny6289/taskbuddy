import { Task } from "../features/StateType/stateType";

export const useFilteredTasks = (tasks:Task[])=>{

    const todoTasks = tasks?.filter((task)=> task.taskStatus === "todo")
    const inProgressTasks = tasks?.filter((task)=> task.taskStatus === "in-progress")
    const completedTasks = tasks?.filter((task)=> task.taskStatus === "completed")

    return {todoTasks, inProgressTasks, completedTasks};

}