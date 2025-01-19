import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input.component";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  BiBold,
  BiItalic,
  BiStrikethrough,
  BiListOl,
  BiListUl,
} from "react-icons/bi";
import Box from "@mui/material/Box";
import { IoCloseOutline } from "react-icons/io5";
import { Modal as MUIModal } from "@mui/material";
import { AddTaskModalProps } from "../constants/PropData/propData";
import DatePicker from "./DatePicker.component";
import Dropdown from "./Dropdown.component";
import Button from "./Button.component";
import { Dayjs } from "dayjs";
import { format } from "date-fns";
import { useAppDispatch } from "../features/app/reduxHooks";
import { closeAddTaskModal } from "../features/slice/ShowModal/showModal";
import { addTask } from "../features/slice/Task/task";
import { UploadedFile } from "../features/StateType/stateType";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  maxWidth: "700px",
  width: "100%",
  overflow: "hidden",
  boxShadow: 14,
};

const AddTaskModal = ({ isOpen }: AddTaskModalProps) => {
  const dispatch = useAppDispatch();
  const [hasAllRequiredData, setHasAllRequiredData] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [taskData, setTaskData] = useState({
    taskId: uuidv4(),
    taskTitle: "",
    taskDescription: "",
    taskCategory: "",
    taskStatus: "",
    taskDueOn: "",
    taskFiles: [] as UploadedFile[]
  });


  // for files upload start
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);


  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

// const handleFileUpload = (files: FileList | null) => {
//   if (!files) return;

//   const newFiles = Array.from(files).map((file) => ({
//     file,
//     preview: URL.createObjectURL(file), // Create a preview URL
//   }));

//   setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
// };

const removeFile = (index: number) => {
  setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};

  // 

  const editor = useEditor({
    extensions: [StarterKit],
    content: taskData.taskDescription || "",
    onUpdate: ({ editor }) => {
      const text = editor.getText().trim();
      const limitedText = text.length > 300 ? text.substring(0, 300) : text;

      setCharCount(limitedText.length);
      setTaskData({
        ...taskData,
        taskDescription: limitedText,
      });
      if (text.length > 300) {
        editor.commands.setContent(limitedText);
      }
    },
  });
  if (!editor) {
    return null;
  }

  const handleCancelTask = () => {
    setTaskData({
      taskId: "",
      taskTitle: "",
      taskDescription: "",
      taskCategory: "",
      taskStatus: "",
      taskDueOn: "",
      taskFiles: []
    });
    
    handleClose();
  };
  const handleCreateTask = () => {
    // Update data to Firebase DB & Redux here
    // Store images in Cloudanary get the array of URLs store it
    // inside taskData.taskFiles, then put the whole taskData in Firebase DB
    // Then store the taskData inside the Redux state, use the 
    
    setTaskData({...taskData, taskFiles: uploadedFiles})
    dispatch(addTask({...taskData, taskFiles: uploadedFiles}));
    
    handleClose();
  };
  const handleClose = () => {
    dispatch(closeAddTaskModal());
  };

  useEffect(() => {
    const enableCreateTask: boolean = Object.values(taskData).some(
      (element) => element === ""
    );
    setHasAllRequiredData(enableCreateTask);
  }, [taskData]);

  useEffect(() => {
    if (editor && taskData.taskDescription) {
      editor.commands.setContent(taskData.taskDescription);
    }
  }, [editor, taskData.taskDescription]);

  return (
    <>
      <MUIModal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center justify-between text-2xl text-[#2F2F2F] font-semibold px-3 py-5">
            <h1>Create Task</h1>
            <IoCloseOutline size={30} fontWeight={500} onClick={handleClose} />
          </div>
          <hr />
          <div className="w-full flex flex-col gap-3 p-3 max-h-[60vh] overflow-y-auto">
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Task title"
                style={{
                  width: "100%",
                  border: "1px solid #00000021",
                  outline: "none",
                  backgroundColor: "#F1F1F15C",
                  padding: "12px",
                  borderRadius: "12px",
                  fontSize: "16px",
                }}
                value={taskData.taskTitle}
                onChange={(e) =>
                  setTaskData({ ...taskData, taskTitle: e.target.value })
                }
              />
              {/* Text Editor code start */}

              <div className="w-full space-y-3">
                {/* Editor Container */}
                <div className="border max-h-[400px] border-gray-300 rounded-lg p-3 bg-[#f1f1f1]">
                  <div className="max-h-[400px] overflow-y-auto">
                    {/* TipTap Editor */}
                    <EditorContent
                      editor={editor}
                      className="custom-editor text-gray-700 placeholder-gray-400"
                      placeholder="Description"
                    />
                  </div>

                  {/* Toolbar */}
                  <div className="flex justify-between items-center pt-3">
                    <div className="flex items-center space-x-3 border-gray-200">
                      {/* Bold Button */}
                      <button
                        type="button"
                        onClick={() =>
                          editor.chain().focus().toggleBold().run()
                        }
                        className={`toolbar-button ${
                          editor.isActive("bold")
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        <BiBold size={20} />
                      </button>

                      {/* Italic Button */}
                      <button
                        type="button"
                        onClick={() =>
                          editor.chain().focus().toggleItalic().run()
                        }
                        className={`toolbar-button ${
                          editor.isActive("italic")
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        <BiItalic size={20} />
                      </button>

                      {/* Strike-through Button */}
                      <button
                        type="button"
                        onClick={() =>
                          editor.chain().focus().toggleStrike().run()
                        }
                        className={`toolbar-button ${
                          editor.isActive("strike")
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        <BiStrikethrough size={20} />
                      </button>

                      {/* Ordered List Button */}
                      <button
                        type="button"
                        onClick={() =>
                          editor.chain().focus().toggleOrderedList().run()
                        }
                        className={`toolbar-button ${
                          editor.isActive("orderedList")
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        <BiListOl size={20} />
                      </button>

                      {/* Bullet List Button */}
                      <button
                        type="button"
                        onClick={() =>
                          editor.chain().focus().toggleBulletList().run()
                        }
                        className={`toolbar-button ${
                          editor.isActive("bulletList")
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      >
                        <BiListUl size={20} />
                      </button>
                    </div>
                    {/* Footer: Character Count */}
                    <div className="text-right text-sm text-gray-500">
                      {charCount}/300 characters
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Editor code end */}
            </div>
            <div className="w-full flex items-center gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-md text-[#00000099]">Task Category*</h3>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-6 py-2 rounded-full font-semibold border border-[#00000030] text-sm cursor-pointer text-[#090909] ${
                      selectedCategory === "work"
                        ? "bg-[#7B1984] text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory("work");
                      setTaskData({ ...taskData, taskCategory: "work" });
                    }}
                  >
                    Work
                  </span>
                  <span
                    className={`px-6 py-2 rounded-full font-semibold border border-[#00000030] text-sm cursor-pointer text-[#090909] ${
                      selectedCategory === "personal"
                        ? "bg-[#7B1984] text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory("personal");
                      setTaskData({ ...taskData, taskCategory: "personal" });
                    }}
                  >
                    Personal
                  </span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-md text-[#00000099]">Due on*</h3>
                <DatePicker
                  setDate={(date: Dayjs | null) =>
                    setTaskData({
                      ...taskData,
                      taskDueOn: format(
                        date?.toDate() ?? new Date(),
                        "dd MMM, yyyy"
                      ),
                    })
                  }
                  style={{
                    backgroundColor: "#F1F1F15C",
                  }}
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="text-md text-[#00000099]">Status*</h3>
                <Dropdown
                  value={taskData.taskStatus}
                  handleChange={(updatedData) =>
                    setTaskData({ ...taskData, taskStatus: updatedData })
                  }
                  label="Choose"
                  style={{ fontSize: "16px", backgroundColor: "#F1F1F15C" }}
                  options={["Todo", "In-Progress", "Completed"]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3>Attachment</h3>
              <div
                className="text-sm border border-[#00000021] bg-[#F1F1F15C] p-3 rounded-xl text-center"
                onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files); // Handle dropped files
                }}
              >
                Drop your files here or{" "}
                <label
                  htmlFor="file-upload"
                  className="text-blue-500 underline cursor-pointer"
                >
                  Upload
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden" // Hide the default file input
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-48 h-48 bg-[#f1f1f1] rounded-lg  flex items-center justify-center"
                  >
                    <img
                      src={file.preview}
                      alt={`preview-${index}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    {/* <button
                      
                    > */}
                      <IoCloseOutline size={25} fontWeight={700} className="absolute z-10 -top-2 -right-2 bg-[#f1f1f1] rounded-full p-1"
                      onClick={() => removeFile(index)}/>
                    {/* </button> */}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="min-w-full min-h-32"></div> */}
          </div>
          <div className="flex items-center justify-end gap-2 text-xl font-semibold px-3 py-5 bg-[#F1F1F1]">
            <Button
              variant="outlined"
              style={{
                backgroundColor: "white",
                padding: "10px 25px",
                borderRadius: "500px",
                border: "none",
                color: "gray",
                fontWeight: 500,
              }}
              content="CANCEL"
              onClick={handleCancelTask}
            />
            <Button
              buttonStatus={hasAllRequiredData}
              variant="contained"
              style={{
                backgroundColor: "#7B1984",
                padding: "10px 25px",
                borderRadius: "500px",
              }}
              content="CREATE"
              onClick={handleCreateTask}
            />
          </div>
        </Box>
      </MUIModal>
    </>
  );
};

export default AddTaskModal;

