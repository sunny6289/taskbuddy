import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "../slice/ShowModal/showModal";
import { taskViewSlice } from "../slice/TaskView/taskView";
import { taskSlice } from "../slice/Task/task";
import { userAuthSlice } from "../slice/UserAuth/userAuthSlice";


export const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        taskView: taskViewSlice.reducer,
        task: taskSlice.reducer,
        userauth: userAuthSlice.reducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch