import {createSlice} from '@reduxjs/toolkit';
import { initialModalState } from '../../StateType/stateType';



const initialState: initialModalState = {
    isAddTaskModalOpen: false,
    isEditTaskModalOpen: false
}

export const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        openAddTaskModal: (state)=>{
            state.isAddTaskModalOpen = true
        },
        closeAddTaskModal: (state)=>{
            state.isAddTaskModalOpen = false
        },
        openEditTaskModal: (state)=>{
            state.isEditTaskModalOpen = true
        },
        closeEditTaskModal: (state)=>{
            state.isEditTaskModalOpen = false
        },
        
    }
})

export const {openAddTaskModal, closeAddTaskModal, openEditTaskModal, closeEditTaskModal} = modalSlice.actions;