import { createSlice } from "@reduxjs/toolkit";

export const UserSlice= createSlice({
    name:"user",
    initialState:{
        currentuser:null,
        isAuthenticated:null
    },
    reducers:{
        setusers(state,action){
            state.currentuser=action.payload,
            state.isAuthenticated=true
        },
        logout(state){
            state.currentuser=null
            state.isAuthenticated=false
        }
    }

})

export const {setusers,logout}=UserSlice.actions
export default UserSlice.reducer