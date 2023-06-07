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
};

//get all equipamentos

export const getEquipamentos = createAsyncThunk("equipments/getAll", async (_, thunkAPI) => {
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

//get all equipments of visible map area
export const getVisibleEquipments = createAsyncThunk("equipments/getVisibleEquipments", async (ids: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await EquipmentService.getVisibleEquipments(ids, token);
  return data;
});

//upload CSV file

//publish user photo
export const uploadEquipments = createAsyncThunk("equipments/uploadEquipments", async (csv: FormData, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;

  const data = await EquipmentService.uploadEquipments(csv, token);

  //check for errors

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const EquipmentSlice = createSlice({
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
      .addCase(getEquipamentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getAllEquipamentosByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.equipamentos = action.payload;
      })
      .addCase(getAllEquipamentosByLocation.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllEquipamentosByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getVisibleEquipments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.equipamentos = action.payload;
      })
      .addCase(getVisibleEquipments.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getVisibleEquipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(uploadEquipments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(uploadEquipments.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(uploadEquipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = EquipmentSlice.actions;
export const equipmentSelector = (state: RootState) => state.EquipmentReducer;
export default EquipmentSlice.reducer;
