import Header from "../components/Header.component";
import TaskSection from "../components/TaskSection.component";
import TaskToolbox from "../components/TaskToolbox.component";
import AddTaskModal from '../components/AddTaskModal.component';
import { useAppSelector } from "../features/app/reduxHooks";
import MultiSelectUpdate from "../components/MultiSelectUpdate.component";
import EditTaskModal from "../components/EditTaskModal.component";


const HomePage = () => {
    const isAddTaskModalOpen = useAppSelector(state => state.modal.isAddTaskModalOpen)
    const isEditTaskModalOpen = useAppSelector(state => state.modal.isEditTaskModalOpen)
    const selectedTasks = useAppSelector(state => state.task.selectedTasks)
    return (
        <div className="h-full w-full flex flex-col gap-3">
            {
                isEditTaskModalOpen && <EditTaskModal isOpen={isEditTaskModalOpen}/> 
            }
            {/*Will be removed after test */}
            {
                isAddTaskModalOpen && <AddTaskModal isOpen={isAddTaskModalOpen}/>
            }
            <Header/>
            <TaskToolbox />
            <hr />
            <TaskSection/>
            {
                selectedTasks.length ? <MultiSelectUpdate totalSelectedTask={selectedTasks.length}/> : null
            }
        </div>
    );
}

export default HomePage;
