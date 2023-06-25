import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RegisterService from "../services/RegisterService";
import { IRegisterStates, TRegister, TRegisterFields } from "../Interfaces/IRegisterStates";
import { RootState } from "../store";

const initialState: IRegisterStates = {
  user: null,
  error: false,
  success: false,
  loading: false,
  message: "",
};

export const register = createAsyncThunk("register/register", async (user: TRegisterFields, thunkAPI) => {
  const res = await RegisterService.register(user);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const RegisterSlice = createSlice({
  name: "register",
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
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<TRegister>) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
        state.user = null;
      });
  },
});

export const { reset } = RegisterSlice.actions;
export const registerSelector = (state: RootState) => state.RegisterReducer;
export default RegisterSlice.reducer;
