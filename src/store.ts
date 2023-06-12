import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import RegisterReducer from "./slices/RegisterSlice";
import ProfileReducer from "./slices/ProfileSlice";
import EquipmentReducer from "./slices/EquipmentSlice";
import LocationReducer from "./slices/LocationSlice";
import ConfigReducer from "./slices/ConfigSlice";

export const store = configureStore({
  reducer: {
    LoginReducer,
    RegisterReducer,
    ProfileReducer,
    EquipmentReducer,
    LocationReducer,
    ConfigReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
