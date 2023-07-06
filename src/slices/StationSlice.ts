import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import StationService from "../services/StationService";
import { RootState } from "../store";

//interface of equipments
import { IStationStates } from "../Interfaces/IStation";

const initialState: IStationStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
  labels: [],
  stations: [],
  station: null,
  page: 1,
  pageCount: 0,
  uploadProgress: 0,
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

//set Label for Station
export const setLabelStation = createAsyncThunk(
  "stations/setLabelStation",
  async (data: any, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await StationService.setLabelStation(data, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

// //upload CSV file
// export const uploadStations = createAsyncThunk("stations/uploadStations", async (csv: FormData, thunkAPI) => {
//   const appState = thunkAPI.getState() as RootState;
//   const token = appState.LoginReducer.user!.token;
//   const res = await StationService.uploadStations(csv, token);
//   //check for errors
//   if (res.errors) {
//     return thunkAPI.rejectWithValue(res.errors[0]);
//   }
//   return res;
// });

export const uploadStations = createAsyncThunk(
  "station/uploadStations",
  async (csv: FormData, { getState, rejectWithValue, dispatch }) => {
    const appState = getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res: any = await StationService.uploadStations(csv, token, (progressEvent) => {
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      dispatch(setUploadProgress(progress));
    });
    // Verifique erros e retorne a resposta ou rejeite com o valor do erro
    if (res.errors) {
      return rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

export const StationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = "";
      state.uploadProgress = 0;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStations.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
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
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getStationsByLocation.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.stations = action.payload;
      })
      .addCase(getStationsByLocation.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getStationsByLocation.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getVisibleStations.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.stations = action.payload[1];
        state.labels = action.payload[0];
        state.page = action.payload[2];
        state.pageCount = action.payload[3];
      })
      .addCase(getVisibleStations.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getVisibleStations.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(uploadStations.fulfilled, (state, action) => {
        state.error = false;
        state.loading = true;
        state.success = true;
      })
      .addCase(uploadStations.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(uploadStations.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getStationById.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.station = action.payload;
      })
      .addCase(getStationById.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getStationById.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(setLabelStation.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
      })
      .addCase(setLabelStation.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(setLabelStation.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset, setUploadProgress } = StationSlice.actions;
export const stationSelector = (state: RootState) => state.StationReducer;
export default StationSlice.reducer;
