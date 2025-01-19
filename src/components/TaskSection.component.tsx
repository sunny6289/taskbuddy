import ListViewTask from "./ListViewTask.component";
import BoardViewTask from "./BoardViewTask.component"
import { useAppSelector } from "../features/app/reduxHooks";

const TaskSection = () => {
    const isBoardViewOpen = useAppSelector(state => state.taskView.isBoardViewOpen)
    return (
        <div className="w-full">
           {
            isBoardViewOpen ? <BoardViewTask/> : <ListViewTask/>
           }
        </div>
    );
}

export default TaskSection;
