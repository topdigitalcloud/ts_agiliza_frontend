import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import StationService from "../services/StationService";
import { RootState } from "../store";

//interface of equipments
import { IStationStates } from "../Interfaces/IStation";

const initialState: IStationStates = {
  labels: [],
  stations: [],
  station: null,
  error: false,
  success: false,
  loading: false,
  message: null,
  page: 1,
  pageCount: 0,
};

//get all equipamentos

export const getStations = createAsyncThunk("stations/getStations", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await StationService.getStations(token);
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }

  return res;
});

//get all equipments by location
export const getStationsByLocation = createAsyncThunk(
  "stations/getStationsByLocation",
  async (id: string, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await StationService.getStationsByLocation(id, token);
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }

    return res;
  }
);

//get equipment by ID
export const getStationById = createAsyncThunk("stations/getStationById", async (id: string | undefined, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await StationService.getStationById(id, token);
  //check for errors

  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }

  return res;
});

//get all equipments of visible map area
export const getVisibleStations = createAsyncThunk(
  "stations/getVisibleStations",
  async (data: any, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await StationService.getVisibleStations(data, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

// ,
// ,

//upload CSV file
export const uploadStations = createAsyncThunk("stations/uploadStations", async (csv: FormData, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await StationService.uploadStations(csv, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const StationSlice = createSlice({
  name: "station",
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
      .addCase(getStations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = false;
        state.stations = action.payload[1];
        state.labels = action.payload[0];
        state.page = action.payload[2];
        state.pageCount = action.payload[3];
      })
      .addCase(getStations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getStationsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.stations = action.payload;
      })
      .addCase(getStationsByLocation.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getStationsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getVisibleStations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.stations = action.payload[1];
        state.labels = action.payload[0];
        state.page = action.payload[2];
        state.pageCount = action.payload[3];
      })
      .addCase(getVisibleStations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getVisibleStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(uploadStations.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(uploadStations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(uploadStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getStationById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.station = action.payload;
      })
      .addCase(getStationById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getStationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = StationSlice.actions;
export const stationSelector = (state: RootState) => state.StationReducer;
export default StationSlice.reducer;
