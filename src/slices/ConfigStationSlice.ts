import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigStationService from "../services/ConfigStationService";
import { RootState } from "../store";

//interface of equipments
import { IConfigStationStates } from "../Interfaces/IConfigStation";

const initialState: IConfigStationStates = {
  config: [],
  error: false,
  success: false,
  loading: false,
  message: null,
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
      state.message = null;
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.config = action.payload;
      })
      .addCase(getConfig.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(setConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.config = action.payload;
      })
      .addCase(setConfig.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(setConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = ConfigStationSlice.actions;
export const configSelector = (state: RootState) => state.ConfigStationReducer;
export default ConfigStationSlice.reducer;
