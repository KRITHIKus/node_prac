import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});