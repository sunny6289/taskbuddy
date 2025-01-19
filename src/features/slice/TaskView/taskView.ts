import { createSlice } from "@reduxjs/toolkit";
import { initialTaskViewState } from "../../StateType/stateType";

const initialState : initialTaskViewState = {
    isListViewOpen: true,
    isBoardViewOpen: false
}

export const taskViewSlice = createSlice({
    name: "taskView",
    initialState: initialState,
    reducers: {
        showListView: (state)=>{
            state.isListViewOpen = true;
            state.isBoardViewOpen = false;
        },
        showBoardView: (state)=>{
            state.isBoardViewOpen = true;
            state.isListViewOpen = false;
        }
    }
})

export const {showBoardView, showListView} = taskViewSlice.actions;