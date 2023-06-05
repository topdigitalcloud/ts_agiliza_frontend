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
  user: user ? user : null,
  error: null,
  success: false,
  loading: false,
};

//console.log(initialState);

//sign in an user

export const login = createAsyncThunk(
  "login/login",
  async (user: any, thunkAPI) => {
    const data = await LoginService.login(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

//logout an user

export const logout = createAsyncThunk("login/logout", async () => {
  await LoginService.logout();
});

export const LoginSlice = createSlice({
  name: "login",
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
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<TLogin>) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = LoginSlice.actions;
export const loginSelector = (state: RootState) => state.LoginReducer;
export default LoginSlice.reducer;
