import { Task } from "../features/StateType/stateType";

export const useFilteredTasks = (tasks:Task[])=>{

    const todoTasks = tasks?.filter((task)=> task.taskStatus === "todo")
    const inProgressTasks = tasks?.filter((task)=> task.taskStatus === "in-progress")
    const completedTasks = tasks?.filter((task)=> task.taskStatus === "completed")

    return {todoTasks, inProgressTasks, completedTasks};

}

 
 export function sortTasksByDate(tasks: Task[], order: 'asc' | 'desc'): Task[] {
    return tasks.sort((a, b) => {

      const dateA = new Date(a.taskDueOn);
      const dateB = new Date(b.taskDueOn);
      
      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  }


