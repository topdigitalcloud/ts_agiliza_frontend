import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigService from "../services/ConfigService";
import { RootState } from "../store";

//interface of equipments
import { IConfigStates } from "../Interfaces/IConfig";

const initialState: IConfigStates = {
  config: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

//get all equipamentos

export const getConfig = createAsyncThunk("config/getConfig", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await ConfigService.getConfig(token);
  return data;
});

//upload CSV file
export const setConfig = createAsyncThunk("config/setConfig", async (configs: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;

  const data = await ConfigService.setConfig(configs, token);

  //check for errors

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const ConfigSlice = createSlice({
  name: "equipamento",
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

export const { reset } = ConfigSlice.actions;
export const configSelector = (state: RootState) => state.ConfigReducer;
export default ConfigSlice.reducer;
