import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import SystemService from "../services/SystemService";
import LinkSystemDocService from "../services/LinkSystemDocService";
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
};

//get all equipments by location
export const getAllSystemsByStation = createAsyncThunk(
  "linktosystems/getAllSystemsByStation",
  async (id: any, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await SystemService.getAllSystemsByStation(id, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

//get all equipments by location
export const setDocToSystem = createAsyncThunk("linktosystems/setDocToSystem", async (data: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await LinkSystemDocService.setDocToSystem(data, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get all equipments by location
export const removeDocFromSystem = createAsyncThunk(
  "linktosystems/removeDocFromSystem",
  async (data: any, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await LinkSystemDocService.removeDocFromSystem(data, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

export const LinkSystemDocSlice = createSlice({
  name: "linktosystems",
  initialState,
  reducers: {
    resetLinkSystemDocSlice: (state) => {
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
      })
      .addCase(setDocToSystem.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(setDocToSystem.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(setDocToSystem.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(removeDocFromSystem.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(removeDocFromSystem.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(removeDocFromSystem.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { resetLinkSystemDocSlice } = LinkSystemDocSlice.actions;
export const linkSystemDocSelector = (state: RootState) => state.LinkSystemDocReducer;
export default LinkSystemDocSlice.reducer;
