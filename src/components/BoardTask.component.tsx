import { TfiMoreAlt } from "react-icons/tfi";
import { BoardTaskProps } from "../constants/PropData/propData";
import { format } from "date-fns";

const BoardTask = ({task}:BoardTaskProps) => {
    return (
        <div className="min-w-full max-w-full  flex flex-col bg-white justify-between rounded-lg border border-[#58575147] p-2 min-h-20 max-h-24">
            <div className="flex justify-between text-md font-semibold">
                <p className={`max-w-[80%] font-medium text-md line-clamp-2 ${task.taskStatus === "completed" && "line-through font-normal"}`}>{task.taskTitle}</p>
                <TfiMoreAlt/>
            </div>
            <div className="flex items-center justify-between text-[12px] font-medium text-[#00000085]">
                <span>{task.taskCategory}</span>
                <span>{format(new Date(), 'dd MMM, yyyy') === task.taskDueOn ? "Today" : task.taskDueOn}</span>
            </div>
        </div>
    );
}

export default BoardTask;
