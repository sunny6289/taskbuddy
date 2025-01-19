import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialUserAuthState } from "../../StateType/stateType";

const initialState: initialUserAuthState = {
    isAuth: false,
    profileImage: ""
}

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {
        userIn: (state, action: PayloadAction<string>)=>{
            state.isAuth = true;
            state.profileImage = action.payload
        },
        userOut: (state)=>{
            state.isAuth = false,
            state.profileImage = ""
        }
    }
})


export const {userIn, userOut} = userAuthSlice.actions;

