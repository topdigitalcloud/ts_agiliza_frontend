import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import LoginService from "../services/LoginService";
import { ILoginStates, TLogin } from "../Interfaces/ILoginStates";
import { RootState } from "../store";

/*
Consegui resolver primeiramente checando se
localStorage.getItem("user") existe, pois 
JSON.parse estava reclamanento de parametro null
*/
let user: TLogin | null;
const localStorageUser = localStorage.getItem("user");
if (localStorageUser) {
  user = JSON.parse(localStorageUser);
} else {
  user = null;
}

const initialState: ILoginStates = {
  error: false,
  success: false,
  loading: false,
  message: "",
  user: user ? user : null,
};

//sign in an user

export const login = createAsyncThunk("login/login", async (user: any, thunkAPI) => {
  const res = await LoginService.login(user);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//logout an user

export const logout = createAsyncThunk("login/logout", async () => {
  LoginService.logout();
});

export const LoginSlice = createSlice({
  name: "login",
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
      .addCase(logout.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<TLogin>) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.user = null;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset } = LoginSlice.actions;
export const loginSelector = (state: RootState) => state.LoginReducer;
export default LoginSlice.reducer;
