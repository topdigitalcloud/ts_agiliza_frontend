import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigService from "../services/ConfigSystemService";
import { RootState } from "../store";

//interface of equipments
import { IConfigSystemStates } from "../Interfaces/IConfigSystem";

const initialState: IConfigSystemStates = {
  config: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

//get all equipamentos

export const getConfig = createAsyncThunk("configsystem/getConfig", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await ConfigService.getConfig(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//upload CSV file
export const setConfig = createAsyncThunk("configsystem/setConfig", async (configs: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await ConfigService.setConfig(configs, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const ConfigSystemSlice = createSlice({
  name: "configsystem",
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

export const { reset } = ConfigSystemSlice.actions;
export const configSelector = (state: RootState) => state.ConfigSystemReducer;
export default ConfigSystemSlice.reducer;
