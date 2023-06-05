import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import EquipmentService from "../services/EquipmentServices";
import { RootState } from "../store";

//interface of equipments
import { IEquipmentStates } from "../Interfaces/IEquipment";

const initialState: IEquipmentStates = {
  equipamentos: [],
  equipamento: null,
  error: false,
  success: false,
  loading: false,
  message: null,
  locations: [],
};

//get all equipamentos

export const getEquipamentos = createAsyncThunk("equipamento/getAll", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await EquipmentService.getEquipamentos(token);
  return data;
});

//get all equipments by location

export const getAllEquipamentosByLocation = createAsyncThunk(
  "locations/getAllByLocation",
  async (id: string, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const data = await EquipmentService.getEquipamentosByLocation(id, token);
    return data;
  }
);

//get all locations

export const getLocations = createAsyncThunk("locations/getLocations", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await EquipmentService.getLocations(token);
  return data;
});

export const EquipmentSlice = createSlice({
  name: "equipamento",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEquipamentos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.equipamentos = action.payload;
      })
      .addCase(getEquipamentos.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllEquipamentosByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.locations = action.payload;
      })
      .addCase(getAllEquipamentosByLocation.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
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

export const { resetMessage } = EquipmentSlice.actions;
export const equipmentSelector = (state: RootState) => state.EquipmentReducer;
export default EquipmentSlice.reducer;
