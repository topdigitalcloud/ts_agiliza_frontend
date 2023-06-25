import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import DocumentService from "../services/DocumentService";
import { RootState } from "../store";

//interface of Documents
import { IDocumentStates, TDocument } from "../Interfaces/IDocument";

const initialState: IDocumentStates = {
  error: false,
  loading: false,
  success: false,
  message: "",
  documents: [],
  document: null,
};

//Post
export const insertDoc = createAsyncThunk("document/insertDoc", async (doc: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.insertDoc(doc, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//put
export const updateDoc = createAsyncThunk("document/updateDoc", async (docData: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.updateDoc({ title: docData.title, id: docData.id }, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//delete
export const deleteDoc = createAsyncThunk("document/deleteDoc", async (id: string, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.deleteDoc(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get
export const getDocById = createAsyncThunk("document/getDocById", async (id: any, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.getDocById(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get
export const getStationDocs = createAsyncThunk("document/getStationDocs", async (id: string | undefined, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.getStationDocs(id, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get
export const downloadDoc = createAsyncThunk("document/downloadDoc", async (doc: TDocument | undefined, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.downloadDoc(doc, token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

//get
export const getAllDocs = createAsyncThunk("document/getAllDocs", async (_, thunkAPI) => {
  const appState = thunkAPI.getState() as RootState;
  const token = appState.LoginReducer.user!.token;
  const res = await DocumentService.getAllDocs(token);
  //check for errors
  if (res.errors) {
    return thunkAPI.rejectWithValue(res.errors[0]);
  }
  return res;
});

export const DocumentSlice = createSlice({
  name: "document",
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
      .addCase(insertDoc.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.document = action.payload;
      })
      .addCase(insertDoc.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(insertDoc.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(updateDoc.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.document = action.payload;
      })
      .addCase(updateDoc.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(updateDoc.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(deleteDoc.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = true;
        state.document = action.payload;
      })
      .addCase(deleteDoc.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteDoc.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getDocById.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.document = action.payload;
      })
      .addCase(getDocById.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getDocById.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getStationDocs.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.documents = action.payload;
      })
      .addCase(getStationDocs.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getStationDocs.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(getAllDocs.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.document = action.payload;
      })
      .addCase(getAllDocs.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getAllDocs.rejected, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.message = typeof action.payload === "string" ? action.payload : "";
      })
      .addCase(downloadDoc.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.success = false;
        state.document = action.payload;
      })
      .addCase(downloadDoc.pending, (state) => {
        state.error = false;
        state.loading = false;
      })
      .addCase(downloadDoc.rejected, (state, action) => {
        //console.log("entrou");
        //state.error = true;
        state.loading = false;
        state.success = false;
        //state.message = typeof action.payload === "string" ? action.payload : "";
      });
  },
});

export const { reset } = DocumentSlice.actions;
export const documentSelector = (state: RootState) => state.DocumentReducer;
export default DocumentSlice.reducer;
