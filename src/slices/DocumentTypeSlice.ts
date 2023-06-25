import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import DocumentTypeService from "../services/DocumentTypeService";
import { RootState } from "../store";

//interface of equipments
import { IDocTypeStates } from "../Interfaces/IDocType";

const initialState: IDocTypeStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
  docTypes: [],
  docType: null,
};

//Post
export const insertDocType = createAsyncThunk("doctype/insertDocType", async (doc: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentTypeService.insertDocType(doc, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//put
export const updateDocType = createAsyncThunk("doctype/updateDocType", async (data: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentTypeService.updateDocType(data, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//delete
export const deleteDocType = createAsyncThunk("doctype/deleteDocType", async (id: string, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentTypeService.deleteDocType(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get
export const getDocTypeById = createAsyncThunk("doctype/getDocTypeById", async (id: string, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentTypeService.getDocTypeById(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get
export const getDocTypes = createAsyncThunk("doctype/getDocTypes", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentTypeService.getDocTypes(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const DocumentTypeSlice = createSlice({
  name: "doctype",
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
      .addCase(insertDocType.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.docType = action.payload;
      })
      .addCase(insertDocType.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(insertDocType.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(updateDocType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.docType = action.payload;
      })
      .addCase(updateDocType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateDocType.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(deleteDocType.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.docType = action.payload;
      })
      .addCase(deleteDocType.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteDocType.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getDocTypes.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.docTypes = action.payload;
      })
      .addCase(getDocTypes.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getDocTypes.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getDocTypeById.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.docType = action.payload;
      })
      .addCase(getDocTypeById.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getDocTypeById.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset } = DocumentTypeSlice.actions;
export const docTypeSelector = (state: RootState) => state.DocTypeReducer;
export default DocumentTypeSlice.reducer;
