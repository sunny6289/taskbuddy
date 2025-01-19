import { IoCloseOutline } from "react-icons/io5";
import { FiSave } from "react-icons/fi";
import Button from "./Button.component";
import Dropdown from "./Dropdown.component";
import { MultiSelectUpdateProps } from "../constants/PropData/propData";
import { useAppDispatch } from "../features/app/reduxHooks";
import { deleteSelectedTask, deselectAllTask, updateSelectedTaskStatus } from "../features/slice/Task/task";
import { useState } from "react";

const MultiSelectUpdate = ({totalSelectedTask}:MultiSelectUpdateProps) => {
    const dispatch = useAppDispatch();
    const [selectedStatus, setSelectedStatus] = useState("");
    const updateStatus = ()=>{
        selectedStatus.length > 0 && dispatch(updateSelectedTaskStatus(selectedStatus))
    }
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 min-w-[450px] bg-black p-3 rounded-xl text-white flex justify-between items-center gap-2">
      <div className="border border-white rounded-xl flex items-center gap-2 p-2 text-white">
        <span className="text-md">{totalSelectedTask} Tasks Selected</span>
        <IoCloseOutline size={25} fontWeight={500} className="cursor-pointer" onClick={()=>dispatch(deselectAllTask())}/>
      </div>
      <FiSave onClick={updateStatus} size={25} fontWeight={500} color={selectedStatus.length>0 ? "white": "gray"} className="cursor-pointer"/>
      <Dropdown
        label="Status"
        handleChange={(status) => setSelectedStatus(status)}
        style={{
          minWidth: 120,
          borderRadius: "500px",
          fontSize: "16px",
        }}
        options={["Todo", "In-Progress", "Completed"]}
      />
      
      <Button
        variant="outlined"
        content="Delete"
        onClick={() => dispatch(deleteSelectedTask())}
        style={{
          border: "1px solid #E13838",
          padding: "8px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          borderRadius: "500px",
          fontWeight: "500",
          color: "#E13838",
          fontSize: "12px",
          backgroundColor: "#FF353524",
        }}
      />
    </div>
  );
};

export default MultiSelectUpdate;
