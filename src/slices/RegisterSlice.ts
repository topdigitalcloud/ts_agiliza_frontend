import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RegisterService from "../services/RegisterService";
import {
  IRegisterStates,
  TRegister,
  TRegisterFields,
} from "../Interfaces/IRegisterStates";
import { RootState } from "../store";

const initialState: IRegisterStates = {
  user: null,
  error: null,
  success: false,
  loading: false,
};

export const register = createAsyncThunk(
  "register/register",
  async (user: TRegisterFields, thunkAPI) => {
    const data = await RegisterService.register(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<TRegister>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = RegisterSlice.actions;
export const registerSelector = (state: RootState) => state.RegisterReducer;
export default RegisterSlice.reducer;
