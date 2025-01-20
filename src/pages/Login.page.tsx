import { FcGoogle } from "react-icons/fc";
import { CircleIcon, TaskBuddyIcon } from "../icons/icons";
import { Dispatch, SetStateAction } from "react";

const LoginPage = ({setLogin}:{
    setLogin: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className="relative bg-[#FFF9F9] max-h-screen overflow-hidden flex items-center justify-between ">
      <div className="flex flex-col gap-8 justify-items-start md:ml-28 max-w-[350px]">
        <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 font-bold text-[#7B1984] text-2xl">
          <TaskBuddyIcon color="#7B1984" />
          <h1>TaskBuddy</h1>
        </div>
        <p className="text-sm">
        Streamline your workflow and track progress effortlessly with our all-in-one task management app.
        </p>
        </div>
        <button className="text-xl bg-[#292929] rounded-xl font-bold flex gap-3 items-center justify-center p-3 text-white" onClick={()=>setLogin(true)}>
          <FcGoogle size={20} /> <span>Continue with Google</span>
        </button>
      </div>
      <div className="relative">
        <CircleIcon />
        <img
          className="hidden absolute right-0 top-12 z-10 md:block"
          src="Login_page_hero_image.png"
          alt="login hero"
        />
      </div>
    </div>
  );
};

export default LoginPage;
