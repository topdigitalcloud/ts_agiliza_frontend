import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigStationService from "../services/ConfigStationService";
import { RootState } from "../store";

//interface of equipments
import { IConfigStationStates } from "../Interfaces/IConfigStation";

const initialState: IConfigStationStates = {
  error: false,
  success: false,
  loading: false,
  message: "",
  config: [],
};

//get all equipamentos

export const getConfig = createAsyncThunk("configstation/getConfig", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await ConfigStationService.getConfig(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//upload CSV file
export const setConfig = createAsyncThunk("configstation/setConfig", async (configs: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await ConfigStationService.setConfig(configs, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const ConfigStationSlice = createSlice({
  name: "configstation",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.config = action.payload;
      })
      .addCase(getConfig.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(setConfig.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.config = action.payload;
      })
      .addCase(setConfig.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(setConfig.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = ConfigStationSlice.actions;
export const configSelector = (state: RootState) => state.ConfigStationReducer;
export default ConfigStationSlice.reducer;
