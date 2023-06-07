import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import LocationService from "../services/LocationService";
import { RootState } from "../store";

//interface of equipments
import { ILocationStates } from "../Interfaces/ILocation";

const initialState: ILocationStates = {
  locations: [],
  error: false,
  success: false,
  loading: false,
  message: null,
};

//get all locations

export const getLocations = createAsyncThunk("locations/getLocations", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await LocationService.getLocations(token);
  return data;
});

export const LocationSlice = createSlice({
  name: "equipamento",
  initialState,
  reducers: {
    reset: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.locations = action.payload;
      })
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = LocationSlice.actions;
export const locationSelector = (state: RootState) => state.LocationReducer;
export default LocationSlice.reducer;
