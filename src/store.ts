import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import RegisterReducer from "./slices/RegisterSlice";
import ProfileReducer from "./slices/ProfileSlice";

export const store = configureStore({
  reducer: {
    LoginReducer,
    RegisterReducer,
    ProfileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
