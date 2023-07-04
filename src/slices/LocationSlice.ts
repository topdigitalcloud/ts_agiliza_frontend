import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import LocationService from "../services/LocationService";
import { RootState } from "../store";

//interface of equipments
import { ILocationStates } from "../Interfaces/ILocation";

const initialState: ILocationStates = {
  error: false,
  success: false,
  loading: false,
  message: "",
  locations: [],
  setstate: false,
  page: 10,
};

//get all locations

export const getLocations = createAsyncThunk("locations/getLocations", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await LocationService.getLocations(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const getMapSate = createAsyncThunk("locations/getMapSate", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await LocationService.getMapSate(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const setMapSate = createAsyncThunk("locations/setMapSate", async (doc: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await LocationService.setMapSate(doc, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const setPageFromMap = createAsyncThunk("locations/setPageFromMap", async (doc: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await LocationService.setPageFromMap(doc, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const getPageFromMap = createAsyncThunk("locations/getPageFromMap", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await LocationService.getPageFromMap(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const LocationSlice = createSlice({
  name: "locations",
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
      .addCase(getLocations.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.locations = action.payload[0];
        state.page = !action.payload[2] ? 1 : action.payload[2];
      })
      .addCase(getLocations.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getMapSate.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(setMapSate.fulfilled, (state, action) => {
        state.page = action.payload;
        state.success = true;
      })
      .addCase(getPageFromMap.fulfilled, (state, action) => {
        state.page = action.payload;
      });
  },
});

//setPageFromMap

//getAllEquipamentosByLocation

export const { reset } = LocationSlice.actions;
export const locationSelector = (state: RootState) => state.LocationReducer;
export default LocationSlice.reducer;
