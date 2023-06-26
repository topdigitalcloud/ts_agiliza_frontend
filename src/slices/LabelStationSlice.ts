import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import StationService from "../services/StationService";
import { RootState } from "../store";

//interface of equipments
import { ILabelStates } from "../Interfaces/ILabelStation";

const initialState: ILabelStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
};

//set Label for Station
export const setNewLabelStation = createAsyncThunk(
  "labelstation/setLabelStation",
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

export const LabelStationSlice = createSlice({
  name: "labelstation",
  initialState,
  reducers: {
    resetLabelStationSlice: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setNewLabelStation.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
      })
      .addCase(setNewLabelStation.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(setNewLabelStation.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { resetLabelStationSlice } = LabelStationSlice.actions;
export const labelStationSelector = (state: RootState) => state.LabelStationReducer;
export default LabelStationSlice.reducer;
