import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    error: false,
    errorMessage: null,
    uploading: false,
    loading: false,
    document: null,
  },
};

export const findImageByType = createAsyncThunk("shifts/findImageByType", async (parameters, asyncThunk) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };

    const url = API.worker.findImageByType + parameters.id + "/images/" + parameters.type;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    const img = data.url;
    return img;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const uploadImageByType = createAsyncThunk("shifts/uploadImageByType", async (parameters, asyncThunk) => {
  const formData = new FormData();

  formData.append("file", { name: parameters.type + ".jpg", uri: parameters.file, type: "image/jpeg" });

  try {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        token: parameters.token,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    };

    const url = API.document.uploadImage + "/" + parameters.id + "/images/" + parameters.type;
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    return data;
  } catch (error) {
    return { error: error };
  }
});

export const documentsSlice = createSlice({
  name: "documents",
  initialState: initialState,
  reducers: {
    // addScannedProduct: (state, action) => {},
  },

  extraReducers: {
    [findImageByType.pending]: (state) => {
      state.value.loading = true;
    },
    [findImageByType.fulfilled]: (state, { payload }) => {
      state.value.loading = false;

      if (payload.error) {
        state.value.error = true;
        state.value.errorMessage = payload.message;
      } else {
        state.value.document = payload;
      }
    },
    [findImageByType.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },

    [uploadImageByType.pending]: (state) => {
      state.value.uploadImage = true;
    },
    [uploadImageByType.fulfilled]: (state, { payload }) => {
      state.value.uploadImage = false;

      if (payload.error) {
        state.value.error = true;
        state.value.errorMessage = payload.message;
      } else {
        state.value.document = payload;
      }
    },
    [uploadImageByType.rejected]: (state) => {
      state.value.uploadImage = false;
      state.value.error = true;
    },
  },
});

export const {} = documentsSlice.actions;

export default documentsSlice.reducer;
