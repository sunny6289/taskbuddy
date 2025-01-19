import { useAppSelector } from "../features/app/reduxHooks";
import { useFilteredTasks } from "../hooks/hooks";
import TaskBoard from "./TaskBoard.component";
import TaskNotFound from "./TaskNotFound.component";

const BoardViewTask = () => {
  const tasks = useAppSelector((state) => state.task.filteredTasks);
  const isTasksFiltered = useAppSelector(state=> state.task.isFiltered)
  const { todoTasks, inProgressTasks, completedTasks } =
    useFilteredTasks(tasks);

  return (
    isTasksFiltered && tasks.length === 0 ?
    <TaskNotFound/> :
    <div className="flex gap-3 p-3">
      <TaskBoard
        tasks={todoTasks}
        taskListTitle="Todo"
        totalTask={todoTasks.length}
        style={{ backgroundColor: "#FAC3FF" }}
      />
      <TaskBoard
        tasks={inProgressTasks}
        taskListTitle="In-Progress"
        totalTask={inProgressTasks.length}
        style={{ backgroundColor: "#85D9F1" }}
      />
      <TaskBoard
        tasks={completedTasks}
        taskListTitle="Completed"
        totalTask={completedTasks.length}
        style={{ backgroundColor: "#A2D6A0" }}
      />
    </div>
  );
};

export default BoardViewTask;
