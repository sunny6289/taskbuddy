import { TfiMoreAlt } from "react-icons/tfi";
import { BoardTaskProps } from "../constants/PropData/propData";
import { format } from "date-fns";
import { useState } from "react";
import { deleteTask, setTaskToEdit } from "../features/slice/Task/task";
import { useAppDispatch } from "../features/app/reduxHooks";
import { openEditTaskModal } from "../features/slice/ShowModal/showModal";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const BoardTask = ({task}:BoardTaskProps) => {
    const dispatch = useAppDispatch();
    const [moreSelect, setMoreSelect] = useState(false);
    return (
        <div className="min-w-full max-w-full  flex flex-col bg-white justify-between rounded-lg border border-[#58575147] p-2 min-h-20 max-h-24">
            <div className="relative flex justify-between text-md font-semibold">
                <p className={`max-w-[80%] font-medium text-md line-clamp-2 ${task.taskStatus === "completed" && "line-through font-normal"}`}>{task.taskTitle}</p>
                <TfiMoreAlt className="cursor-pointer" onClick={() => setMoreSelect(!moreSelect)}/>
                
                    {moreSelect ? (
                            <div className="absolute z-40 text-lg right-0 top-5 overflow-hidden rounded-xl bg-white shadow-md shadow-[#7B19841F]">
                              <div
                                className="flex justify-between items-center px-4 py-3 cursor-pointer gap-6 text-black hover:bg-slate-100"
                                onClick={() => {
                                  dispatch(setTaskToEdit(task.taskId));
                                  setMoreSelect(!moreSelect);
                                  dispatch(openEditTaskModal());
                                }}
                              >
                                <span>Edit</span>
                                <FaEdit size={20} />
                              </div>
                              <div
                                className="flex justify-between items-center px-4 py-3 cursor-pointer gap-6 text-red-500 hover:bg-slate-100"
                                onClick={() => dispatch(deleteTask(task.taskId))}
                              >
                                <span>Delete</span>
                                <FaRegTrashAlt size={20} />
                              </div>
                            </div>
                          ) : null}
                
            </div>
            <div className="flex items-center justify-between text-[12px] font-medium text-[#00000085]">
                <span>{task.taskCategory}</span>
                <span>{format(new Date(), 'dd MMM, yyyy') === task.taskDueOn ? "Today" : task.taskDueOn}</span>
            </div>
        </div>
    );
}

export default BoardTask;
