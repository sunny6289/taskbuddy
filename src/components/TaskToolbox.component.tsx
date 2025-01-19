import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Dropdown from "./Dropdown.component";
import Input from "./Input.component";
import Button from "./Button.component";
import { useAppDispatch, useAppSelector } from "../features/app/reduxHooks";
import { openAddTaskModal } from "../features/slice/ShowModal/showModal";
import { format } from "date-fns";
import { filterTask, setIsFiltered } from "../features/slice/Task/task";

const TaskToolbox = () => {
  const dispatch = useAppDispatch();
  const allTasks = useAppSelector((state) => state.task.tasks);
  const [filterContent, setFilterContent] = useState<{
    filterText: string,
    filterCategory: string,
    filterDate: string,
  }>({
    filterText: "",
    filterCategory: "",
    filterDate: "",
  });
console.log(filterContent);
  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterContent({ ...filterContent, filterText: e.target.value });
  };
  const handleAddTask = () => {
    console.log("Add task clicked");
    dispatch(openAddTaskModal());
  };

  useEffect(() => {
    console.log("inside useEffect");
    if(filterContent.filterCategory === "" && filterContent.filterDate === "" && filterContent.filterText === ""){
      dispatch(setIsFiltered(false));
    }else{
      dispatch(setIsFiltered(true))
    }
    
    const filteredTasks = allTasks.filter((task) => 
      (filterContent.filterCategory === "" || task.taskCategory.toLowerCase() === filterContent.filterCategory.toLowerCase()) &&
      (filterContent.filterDate === "" || task.taskDueOn.toLowerCase() === filterContent.filterDate.toLowerCase()) &&
      (filterContent.filterText === "" || task.taskTitle.toLowerCase().includes(filterContent.filterText.toLowerCase()))
  );
    console.log(filteredTasks);
    dispatch(filterTask(filteredTasks));
  }, [filterContent, allTasks]);
  return (
    <div className="flex items-center justify-between">
      <div className="filter-tools flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-500">Filter by: </span>
        <Dropdown
          handleChange={(selectedValue: string) => {
            setFilterContent({
              ...filterContent,
              filterCategory: selectedValue,
            });
          }}
          style={{ minWidth: 120, borderRadius: "20px", fontSize: "16px" }}
          label="Category"
          options={["Work", "Personal"]}
        />
        <Dropdown
          handleChange={(selectedValue) => {
            setFilterContent({ ...filterContent, filterDate: selectedValue });
          }}
          style={{ minWidth: 120, borderRadius: "20px", fontSize: "16px" }}
          label="Due Date"
          options={[...new Set(allTasks.map((task) =>
            format(task.taskDueOn, "dd MMM, yyyy")
          ))]}
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="max-w-fit rounded-3xl p-2 flex items-center gap-2 border border-black">
          <IoSearchOutline color="black" size={20} />
          <Input
            placeholder="Search"
            style={{
              border: "none",
              outline: "none",
              width: "220px",
              fontSize: "16px",
            }}
            value={filterContent.filterText}
            onChange={handleSearchTextChange}
          />
        </div>
        <Button
          variant="contained"
          content="Add Task"
          style={{
            backgroundColor: "#7B1984",
            padding: "10px 35px",
            borderRadius: "500px",
          }}
          onClick={handleAddTask}
        />
      </div>
    </div>
  );
};

export default TaskToolbox;
