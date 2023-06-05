import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../services/ProfileService";
import { IUpdateStates, TUpdated } from "../Interfaces/IProfileStates";
import { RootState } from "../store";

const initialState: IUpdateStates = {
  user: null,
  error: null,
  success: false,
  loading: false,
};

//get user detalis
export const profile = createAsyncThunk(
  "profile/profile",
  async (user, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const data = await ProfileService.profile(user, token);
    return data;
  }
);

//change password action
export const changePassword = createAsyncThunk(
  "profile/password",
  async (user: any, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const data = await ProfileService.password(user, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const update = createAsyncThunk(
  "profile/update",
  async (user: any, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const data = await ProfileService.update(user, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const ProfileSlice = createSlice({
  name: "profile",
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
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action: PayloadAction<TUpdated>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action: PayloadAction<TUpdated>) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<TUpdated>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        }
      )
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = ProfileSlice.actions;
export const profileSelector = (state: RootState) => state.ProfileReducer;
export default ProfileSlice.reducer;
