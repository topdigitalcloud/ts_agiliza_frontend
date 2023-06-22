import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice";
import RegisterReducer from "./slices/RegisterSlice";
import ProfileReducer from "./slices/ProfileSlice";
import EquipmentReducer from "./slices/EquipmentSlice";
import LocationReducer from "./slices/LocationSlice";
import ConfigSystemReducer from "./slices/ConfigSystemSlice";
import ConfigStationReducer from "./slices/ConfigStationSlice";
import DocumentReducer from "./slices/DocumentSlice";
import DocTypeReducer from "./slices/DocumentTypeSlice";
import StationReducer from "./slices/StationSlice";
import SystemReducer from "./slices/SystemSlice";

export const store = configureStore({
  reducer: {
    LoginReducer,
    RegisterReducer,
    ProfileReducer,
    EquipmentReducer,
    LocationReducer,
    ConfigSystemReducer,
    ConfigStationReducer,
    DocumentReducer,
    DocTypeReducer,
    StationReducer,
    SystemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
