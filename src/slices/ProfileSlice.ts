import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "../services/ProfileService";
import {
  IUpdateStates,
  TUpdated,
  TUpdateFields,
} from "../Interfaces/IUpdateStates";
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
    const data = await profileService.profile(user, token);
    return data;
  }
);

export const update = createAsyncThunk(
  "profile/update",
  async (user: FormData, thunkAPI): Promise<any> => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const data = await profileService.update(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const profileSlice = createSlice({
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
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = profileSlice.actions;
export const profileSelector = (state: RootState) => state.ProfileReducer;
export default profileSlice.reducer;
