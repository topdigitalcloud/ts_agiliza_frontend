import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigService from "../services/ConfigSystemService";
import { RootState } from "../store";

//interface of equipments
import { IConfigSystemStates } from "../Interfaces/IConfigSystem";

const initialState: IConfigSystemStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
  config: [],
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
      state.error = false;
      state.loading = false;
      state.success = false;
      state.message = "";
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
        state.loading = false;
        state.success = true;
        state.error = false;
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

export const { reset } = ConfigSystemSlice.actions;
export const configSelector = (state: RootState) => state.ConfigSystemReducer;
export default ConfigSystemSlice.reducer;
