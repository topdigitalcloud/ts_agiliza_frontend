import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import SystemService from "../services/SystemService";
import { RootState } from "../store";

//interface of equipments
import { ILinkStationDocStates } from "../Interfaces/ILinkStationDocStates";

const initialState: ILinkStationDocStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
  labels: [],
  systemsToLink: [],
  systemToLink: null,
  page: 1,
  pageCount: 0,
};

//get all equipments by location
export const getAllSystemsByStation = createAsyncThunk("systems/getAllSystemsByStation", async (id: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await SystemService.getAllSystemsByStation(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const SystemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSystemsByStation.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.labels = action.payload[0];
        state.systemsToLink = action.payload[1];
      })
      .addCase(getAllSystemsByStation.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getAllSystemsByStation.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset } = SystemSlice.actions;
export const linkSystemDocSelector = (state: RootState) => state.LinkSystemDocReducer;
export default SystemSlice.reducer;
