import { createSlice } from "@reduxjs/toolkit";

export const UserSlice= createSlice({
    name:"user",
    initialState:{
        user:null,
        isAuthenticated:null
    },
    reducers:{
        setusers(state,action){
            state.user=action.payload,
            state.isAuthenticated=true
        },
        logout(state){
            state.user=null
            state.isAuthenticated=false
        }
    }

})

export const {setusers,logout}=UserSlice.actions
export default UserSlice.reducer