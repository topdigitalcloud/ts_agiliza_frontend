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
        state.locations = action.payload;
      })
      .addCase(getLocations.pending, (state) => {
        state.error = false;
        state.loading = true;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = LocationSlice.actions;
export const locationSelector = (state: RootState) => state.LocationReducer;
export default LocationSlice.reducer;
