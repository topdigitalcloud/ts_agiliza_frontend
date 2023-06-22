import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import DocumentTypeService from "../services/DocumentTypeService";
import { RootState } from "../store";

//interface of equipments
import { IDocTypeStates } from "../Interfaces/IDocType";

const initialState: IDocTypeStates = {
  docTypes: [],
  docType: null,
  error: false,
  success: false,
  loading: false,
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
      state.success = false;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(insertDocType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.docType = action.payload;
      })
      .addCase(insertDocType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(insertDocType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateDocType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.docType = action.payload;
      })
      .addCase(updateDocType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateDocType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteDocType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.docType = action.payload;
      })
      .addCase(deleteDocType.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteDocType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getDocTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.docTypes = action.payload;
      })
      .addCase(getDocTypes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDocTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getDocTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.docType = action.payload;
      })
      .addCase(getDocTypeById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDocTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = DocumentTypeSlice.actions;
export const docTypeSelector = (state: RootState) => state.DocTypeReducer;
export default DocumentTypeSlice.reducer;
