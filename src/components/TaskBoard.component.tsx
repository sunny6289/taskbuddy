import { TaskBoardProps } from "../constants/PropData/propData";
import BoardTask from "./BoardTask.component";

const TaskBoard = ({
    taskListTitle,
    tasks,
    totalTask,
    style
  }:TaskBoardProps) => {
    return (
        <div className="flex flex-col gap-3 min-h-[400px] min-w-80 max-w-80 p-3 rounded-lg border border-[#58575112] bg-[#F1F1F1]">
            <span className="uppercase max-w-fit rounded p-1" style={style}>{taskListTitle}</span>
            <div className="flex flex-col w-full gap-3 items-center">
                {
                    totalTask > 0 ? 
                    tasks.map((task)=> <BoardTask key={task.taskId} task={task}/>)
                    : <p className="text-[#2F2F2F] text-center">{`No Tasks in ${taskListTitle}`}</p>
                }
            </div>
        </div>
    );
}

export default TaskBoard;
