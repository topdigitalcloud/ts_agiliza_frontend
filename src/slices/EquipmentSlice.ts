import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import EquipmentService from "../services/EquipmentService";
import { RootState } from "../store";

//interface of equipments
import { IEquipmentStates } from "../Interfaces/IEquipment";

const initialState: IEquipmentStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
  page: 1,
  pageCount: 0,
  labels: [],
  equipamentos: [],
  equipamento: null,
};

//get all equipamentos

export const getEquipamentos = createAsyncThunk("equipments/getAll", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await EquipmentService.getEquipamentos(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get all equipments by location

export const getAllEquipamentosByLocation = createAsyncThunk(
  "locations/getAllByLocation",
  async (id: string, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await EquipmentService.getEquipamentosByLocation(id, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

//get equipment by ID

export const getEquipamentoById = createAsyncThunk(
  "locations/getEquipamentoById",
  async (id: string | undefined, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await EquipmentService.getEquipamentoById(id, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

//get all equipments of visible map area
export const getVisibleEquipments = createAsyncThunk(
  "equipments/getVisibleEquipments",
  async (data: any, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await EquipmentService.getVisibleEquipments(data, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

//upload CSV file
export const uploadEquipments = createAsyncThunk("equipments/uploadEquipments", async (csv: FormData, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await EquipmentService.uploadEquipments(csv, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const EquipmentSlice = createSlice({
  name: "equipamento",
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
      .addCase(getEquipamentos.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.equipamentos = action.payload;
      })
      .addCase(getEquipamentos.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getEquipamentos.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getAllEquipamentosByLocation.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.equipamentos = action.payload;
      })
      .addCase(getAllEquipamentosByLocation.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getAllEquipamentosByLocation.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getVisibleEquipments.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.equipamentos = action.payload[1];
        state.labels = action.payload[0];
        state.page = action.payload[2];
        state.pageCount = action.payload[3];
      })
      .addCase(getVisibleEquipments.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getVisibleEquipments.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(uploadEquipments.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadEquipments.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(uploadEquipments.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
      })
      .addCase(getEquipamentoById.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.equipamento = action.payload;
      })
      .addCase(getEquipamentoById.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getEquipamentoById.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset } = EquipmentSlice.actions;
export const equipmentSelector = (state: RootState) => state.EquipmentReducer;
export default EquipmentSlice.reducer;
