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
  const res = await SystemService.getSystems(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get all equipments by location
export const getSystemsByStation = createAsyncThunk("systems/getSystemsByStation", async (data: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await SystemService.getSystemsByStation(data, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get equipment by ID
export const getSystemById = createAsyncThunk("systems/getSystemById", async (id: string | undefined, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await SystemService.getSystemById(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//set Label for Station
export const setLabelSystem = createAsyncThunk("systems/setLabelSystem", async (data: any, thunkAPI): Promise<any> => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await SystemService.setLabelSystem(data, token);
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
      })
      .addCase(setLabelSystem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(setLabelSystem.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(setLabelSystem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { reset } = SystemSlice.actions;
export const systemSelector = (state: RootState) => state.SystemReducer;
export default SystemSlice.reducer;
