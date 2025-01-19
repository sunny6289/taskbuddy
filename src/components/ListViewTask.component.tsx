import { FaSort } from "react-icons/fa";
import TaskAccordian from "./TaskAccordian.component";
import { useAppSelector } from "../features/app/reduxHooks";
import { useFilteredTasks } from "../hooks/hooks";
import { TfiMoreAlt } from "react-icons/tfi";
import TaskNotFound from "./TaskNotFound.component";

const ListViewTask = () => {
    const tasks = useAppSelector(state=> state.task.filteredTasks)
    const isTasksFiltered = useAppSelector(state=> state.task.isFiltered)
    const {todoTasks, inProgressTasks, completedTasks} = useFilteredTasks(tasks);
console.log("task form list view", tasks);
    return (
        <div className="w-full">
            {
                isTasksFiltered && tasks.length === 0 ?
                <TaskNotFound/> :
                <>
                <div className="hidden px-4 md:flex text-[#00000099] text-sm font-semibold items-center justify-between">
                    <div className="flex-1">Task name</div>
                    <div className="flex items-center gap-1 flex-1"><span>Due on</span><FaSort/></div>
                    <div className="flex-1">Task status</div>
                    <div className="flex-1">Task category</div>
                    <TfiMoreAlt className="mx-3 opacity-0"/>
                </div>
                <TaskAccordian tasks={todoTasks} taskListTitle="Todo" totalTask={todoTasks.length} style={{backgroundColor: '#FAC3FF'}}/>
                <TaskAccordian tasks={inProgressTasks} taskListTitle="In-Progress" totalTask={inProgressTasks.length} style={{backgroundColor: '#85D9F1'}}/>
                <TaskAccordian tasks={completedTasks} taskListTitle="Completed" totalTask={completedTasks.length} style={{backgroundColor: '#CEFFCC'}}/>
            </>
            }
            
        </div>
    );
}

export default ListViewTask;
