import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import RegisterReducer from "./slices/RegisterSlice";

export const store = configureStore({
  reducer: {
    LoginReducer,
    RegisterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
