import { useEffect, useState } from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { RiDraggable } from "react-icons/ri";
import { TfiMoreAlt } from "react-icons/tfi";
import { ListTaskProps } from "../constants/PropData/propData";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../features/app/reduxHooks";
import { deselectTask, selectTask, setTaskToEdit } from "../features/slice/Task/task";
import { openEditTaskModal } from "../features/slice/ShowModal/showModal";
// import Dropdown from "./Dropdown.component";


const ListTask = ({taskData}:ListTaskProps) => {
    const [checked, setChecked] = useState(false);
    const dispatch = useAppDispatch();
    const allSelectedTask = useAppSelector(state=> state.task.selectedTasks)
    const selectCurrentTask = ()=> {
        dispatch(selectTask(taskData))
    }
    const deselectCurrentTask = ()=> {
        dispatch(deselectTask(taskData.taskId))
    }
    const checkCurrentTask = ()=>{
        setChecked(allSelectedTask.some(selectedTask => selectedTask.taskId === taskData.taskId))
    }
    useEffect(()=>{
        checkCurrentTask()
    },[allSelectedTask])
    return (
        <div className="py-2 px-2 flex w-full items-center gap-2 text-md font-medium border-y border-[#0000001A]">
            <div className="flex items-center gap-1 flex-1">
                {
                    checked ? 
                    <ImCheckboxChecked  color="purple" onClick={deselectCurrentTask}/>
                    : <ImCheckboxUnchecked  onClick={selectCurrentTask}/>
                }
                <RiDraggable size={18} color="#1e1e1e" fontWeight={600} className="cursor-grab"/>
                <RiCheckboxCircleFill size={18} color={`${taskData.taskStatus === "completed" ? "#1B8D17" : "gray"}`}/>
                <p className={`line-clamp-1 font-medium text-sm flex-1 ${taskData.taskStatus === "completed" && "line-through"}`}>{taskData.taskTitle}</p>
            </div>
            <div className="flex items-center gap-1 flex-1">
                <p>{format(new Date(), 'dd MMM, yyyy') === taskData.taskDueOn ? "Today" : taskData.taskDueOn}</p>
            </div>
            <div className="relative flex items-center gap-1 flex-1">
                <p className="uppercase bg-slate-300 px-2 py-0.5 rounded-md cursor-default">{taskData.taskStatus}</p>
            </div>
            <div className="flex items-center gap-1 flex-1 capitalize">
                <p>{taskData.taskCategory}</p>
            </div>
            <TfiMoreAlt className="mx-3 cursor-pointer" onClick={()=>{
                dispatch(openEditTaskModal())
                dispatch(setTaskToEdit(taskData.taskId))}}/>
        </div>
    );
}

export default ListTask;
