import { NotFoundIcon } from "../icons/icons";

const TaskNotFound = () => {
  return (
    <div className="flex flex-col gap-2 pt-32 items-center justify-center">
      <NotFoundIcon />
      <p className="text-md font-semibold text-[#1e1e1ed0] max-w-72 text-center">It looks like we can't find any results that match.</p>
    </div>
  );
};

export default TaskNotFound;
