import { TaskBuddyIcon } from "../icons/icons";
import { RiLogoutBoxLine } from "react-icons/ri";
import { PiList } from "react-icons/pi";
import { MdOutlineViewKanban } from "react-icons/md";
import Button from "./Button.component";
import { useAppDispatch, useAppSelector } from "../features/app/reduxHooks";
import {
  showBoardView,
  showListView,
} from "../features/slice/TaskView/taskView";
// import {signOutAuthUser } from "../features/Firebase/firebaseConfig";

const Header = () => {
  const dispatch = useAppDispatch();
  const isListViewOpen = useAppSelector(
    (state) => state.taskView.isListViewOpen
  );
  const isBoardViewOpen = useAppSelector(
    (state) => state.taskView.isBoardViewOpen
  );
  const handleLogout = () => {
    // signOutAuthUser();
    
  };

  const handleOpenListView = () => {
    dispatch(showListView());
  };
  const handleOpenBoardView = () => {
    dispatch(showBoardView());
  };

  return (
    <div className="flex flex-col gap-1">
      <nav className="flex items-center justify-between">
        <div className="logo flex gap-2 items-center text-[#2F2F2F]">
          <TaskBuddyIcon />
          <h1 className="text-2xl font-semibold">TaskBuddy</h1>
        </div>
        <div className="user flex items-center gap-2">
          <span>Icon</span>
          <span className="user-name text-gray-400 text-xl font-semibold">
            Arvind
          </span>
        </div>
      </nav>
      <div className="view-panel-and-logout flex items-center justify-between">
        <div className="flex items-center gap-4 text-lg text-gray-500 font-semibold">
          <div
            className={`cursor-pointer flex items-center gap-1 px-1 ${
              isListViewOpen && "selectedView"
            }`}
            onClick={handleOpenListView}
          >
            <PiList />
            <span>List</span>
          </div>
          <div
            className={`cursor-pointer flex items-center gap-1 px-1 ${
              isBoardViewOpen && "selectedView"
            }`}
            onClick={handleOpenBoardView}
          >
            <MdOutlineViewKanban />
            <span>Board</span>
          </div>
        </div>
        <Button
          content="Logout"
          variant="outlined"
          onClick={handleLogout}
          style={{
            border: "2px solid #7B198426",
            padding: "8px 16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            borderRadius: "10px",
            fontWeight: "500",
            color: "black",
            fontSize: "12px",
            backgroundColor: "#FFF9F9",
          }}
          startIcon={<RiLogoutBoxLine />}
        />
      </div>
    </div>
  );
};

export default Header;
