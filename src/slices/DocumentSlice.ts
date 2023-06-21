import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import DocumentService from "../services/DocumentService";
import { RootState } from "../store";

//interface of equipments
import { IDocumentStates, TDocument } from "../Interfaces/IDocument";

const initialState: IDocumentStates = {
  documents: [],
  document: null,
  error: false,
  success: false,
  loading: false,
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
export const getDocById = createAsyncThunk("document/getDocById", async (id: string, thunkAPI) => {
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
export const getEquipmentDocs = createAsyncThunk(
  "document/getEquipmentDocs",
  async (id: string | undefined, thunkAPI) => {
    const appState = thunkAPI.getState() as RootState;
    const token = appState.LoginReducer.user!.token;
    const res = await DocumentService.getEquipmentDocs(id, token);
    //check for errors
    if (res.errors) {
      return thunkAPI.rejectWithValue(res.errors[0]);
    }
    return res;
  }
);

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
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.document = action.payload;
      })
      .addCase(insertDoc.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(insertDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.document = action.payload;
      })
      .addCase(updateDoc.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.document = action.payload;
      })
      .addCase(deleteDoc.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getDocById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.document = action.payload;
      })
      .addCase(getDocById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDocById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getEquipmentDocs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.documents = action.payload;
      })
      .addCase(getEquipmentDocs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getEquipmentDocs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getAllDocs.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.document = action.payload;
      })
      .addCase(getAllDocs.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllDocs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(downloadDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.document = action.payload;
      })
      .addCase(downloadDoc.pending, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(downloadDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

//getAllEquipamentosByLocation

export const { reset } = DocumentSlice.actions;
export const documentSelector = (state: RootState) => state.DocumentReducer;
export default DocumentSlice.reducer;
