import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import SystemService from "../services/SystemService";
import { RootState } from "../store";

//interface of equipments
import { ISystemStates } from "../Interfaces/ISystem";

const initialState: ISystemStates = {
  labels: [],
  systems: [],
  system: null,
  error: false,
  success: false,
  loading: false,
  message: null,
  page: 1,
  pageCount: 0,
};

//get all equipamentos
export const getSystems = createAsyncThunk("systems/getSystems", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await SystemService.getSystems(token);
  return data;
});

//get all equipments by location
export const getSystemsByStation = createAsyncThunk("systems/getSystemsByStation", async (id: string, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await SystemService.getSystemsByStation(id, token);
  return data;
});

//get equipment by ID
export const getSystemById = createAsyncThunk("systems/getSystemById", async (id: string | undefined, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await SystemService.getSystemById(id, token);
  return data;
});

export const SystemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSystems.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = false;
        state.systems = action.payload;
      })
      .addCase(getSystems.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSystems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getSystemsByStation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.systems = action.payload[1];
        state.labels = action.payload[0];
        state.page = action.payload[2];
        state.pageCount = action.payload[3];
      })
      .addCase(getSystemsByStation.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSystemsByStation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getSystemById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.systems = action.payload;
      })
      .addCase(getSystemById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSystemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = SystemSlice.actions;
export const systemSelector = (state: RootState) => state.SystemReducer;
export default SystemSlice.reducer;
