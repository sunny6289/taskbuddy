import Button from "./Button.component";
import Input from "./Input.component";
import DatePicker from "./DatePicker.component";
import Dropdown from "./Dropdown.component";
import ListTask from "./ListTask.component";
import { v4 as uuidv4 } from "uuid";
import { FaChevronDown } from "react-icons/fa";
import { EnterIcon } from "../icons/icons";
import { IoAddOutline } from "react-icons/io5";
import { TaskAccordianProps } from "../constants/PropData/propData";
import { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { format } from "date-fns";
import { useAppDispatch } from "../features/app/reduxHooks";
import { addTask } from "../features/slice/Task/task";

const TaskAccordian = ({
  tasks,
  taskListTitle,
  totalTask,
  style,
}: TaskAccordianProps) => {
  const dispatch = useAppDispatch();
  const [showTaskList, setShowTaskList] = useState(false);
  const [hasAllRequiredData, setHasAllRequiredData] = useState(true);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    taskId: "",
    taskTitle: "",
    taskCategory: "",
    taskStatus: "",
    taskDueOn: "",
  });

  const handleopenAddTask = ()=>{
    setNewTask({...newTask, taskId: uuidv4()})
    setOpenAddTask(true);
  }
  const closeAddTask = ()=>{
    setNewTask({
      taskId: "",
      taskTitle: "",
      taskCategory: "",
      taskStatus: "",
      taskDueOn: "",
    });
    setOpenAddTask(false);
  }
  const handleNewTodoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, taskTitle: e.target.value });
  };
  const handleAddNewTask = ()=>{
    dispatch(addTask({...newTask, taskDescription: " ", taskFiles: []}))
    closeAddTask();
  } 
  const handleCancelNewTask = () => {
    closeAddTask();
  };
  useEffect(()=>{
       const enableCreateTask: boolean = Object.values(newTask).some((element)=> element.length === 0)
       setHasAllRequiredData(enableCreateTask);
  },[newTask])
  useEffect(()=>{
    if(tasks.length > 0) setShowTaskList(true)
    else setShowTaskList(false)
  },[tasks])


  return (
    <div className="w-full">
      <div
        className={`w-full rounded-xl accordianHeading ${
          showTaskList && "rounded-b-none"
        }`}
        style={style}
        onClick={() => setShowTaskList(!showTaskList)}
      >
        <h3>{`${taskListTitle} (${totalTask})`}</h3>
        <FaChevronDown
          className={`transition-all ${
            showTaskList ? "-rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`task-list w-full min-h-40 bg-[#F1F1F1] rounded-b-xl flex flex-col ${
          !showTaskList && "hidden"
        } transition-all divide-y-1 divide-[#0000001A] `}
      >
        {taskListTitle === "Todo" && (
          <div className="w-full flex flex-col px-3 gap-2 py-[10px] font-semibold ">
            <Button
              variant="text"
              startIcon={<IoAddOutline />}
              content="ADD TASK"
              onClick={handleopenAddTask}
              style={{
                padding: "4px 10px",
                fontWeight: 600,
                cursor: "default",
                fontSize: "16px",
                color: "#000",
                placeSelf: "self-start",
              }}
            />
            {openAddTask && (
              <div className="w-full flex flex-col gap-2 transition-all border-t border-[#0000001A] py-2">
                <div className="w-full flex items-center justify-between">
                  <div className="flex-1">
                    <Input
                      placeholder="Task Title"
                      onChange={handleNewTodoNameChange}
                      value={newTask.taskTitle}
                      style={{
                        padding: "10px",
                        background: "transparent",
                        fontSize: "16px",
                        fontWeight: 500,
                        outline: "none",
                        border: "none",
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <DatePicker
                      setDate={(date: Dayjs | null) =>
                        setNewTask({
                          ...newTask,
                          taskDueOn: format(
                            date?.toDate() ?? new Date(),
                            "dd MMM, yyyy"
                          ),
                        })
                      }
                      style={{
                        maxWidth: 150,
                        fontSize: "16px",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Dropdown
                      label="Add Status"
                      handleChange={(updatedData) =>
                        setNewTask({ ...newTask, taskStatus: updatedData })
                      }
                      style={{
                        minWidth: 120,
                        borderRadius: "10px",
                        fontSize: "16px",
                      }}
                      options={["Todo", "In-Progress", "Completed"]}
                    />
                  </div>
                  <div className="flex-1">
                    <Dropdown
                      label="Add Category"
                      handleChange={(updatedData) =>
                        setNewTask({ ...newTask, taskCategory: updatedData })
                      }
                      style={{
                        minWidth: 120,
                        borderRadius: "10px",
                        fontSize: "16px",
                      }}
                      options={["Work", "Personal"]}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    buttonStatus={hasAllRequiredData}
                    variant="contained"
                    content="ADD"
                    endIcon={<EnterIcon />}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      gap: "2px",
                      padding: "4px 16px",
                      borderRadius: "100px",
                      backgroundColor: "#7B1984",
                      maxWidth: "fit-content",
                      cursor: "pointer",
                    }}
                    onClick={handleAddNewTask}
                  />
                  <Button
                    variant="text"
                    style={{
                      color: "black",
                      fontSize: "14px",
                      borderRadius: "500px",
                      paddingInline: "12px",
                    }}
                    onClick={handleCancelNewTask}
                    content="CANCEL"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {totalTask > 0 ? (
          tasks.map((task) => <ListTask key={task.taskId} taskData={task} />)
        ) : (
          <div className="w-full h-40 flex items-center justify-center">
            {`No task in ${taskListTitle}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskAccordian;
