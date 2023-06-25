import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../services/ProfileService";
import { IUpdateStates, TUpdated } from "../Interfaces/IProfileStates";
import { RootState } from "../store";

const initialState: IUpdateStates = {
  error: false,
  success: false,
  loading: false,
  user: null,
  message: "",
};

//get user detalis
export const profile = createAsyncThunk("profile/profile", async (user, thunkAPI): Promise<any> => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const data = await ProfileService.profile(user, token);
  return data;
});

//change password action
export const changePassword = createAsyncThunk("profile/password", async (user: any, thunkAPI): Promise<any> => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await ProfileService.password(user, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const update = createAsyncThunk("profile/update", async (user: any, thunkAPI): Promise<any> => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await ProfileService.update(user, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const ProfileSlice = createSlice({
  name: "profile",
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
      .addCase(update.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<TUpdated>) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
        state.user = null;
      })
      .addCase(profile.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(profile.fulfilled, (state, action: PayloadAction<TUpdated>) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.user = null;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(changePassword.fulfilled, (state, action: PayloadAction<TUpdated>) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.user = null;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset } = ProfileSlice.actions;
export const profileSelector = (state: RootState) => state.ProfileReducer;
export default ProfileSlice.reducer;
