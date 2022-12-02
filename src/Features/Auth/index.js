import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";

const initialState = {
  value: {
    user: {
      userId: "",
      email: "",
      token: "",
      photo: "",
    },
    loading: false,
    authenticating: false,
    error: false,
    errorMessage: null,
  },
};

export const signIn = createAsyncThunk("auth/signIn", async (parameters, asyncThunk) => {
  try {

    const body = JSON.stringify({
      email: parameters.email,
      password: parameters.password,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    };
    
    const url = API.auth.signIn;
   
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthData: () => initialState,
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.value.authenticating = true;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [signIn.fulfilled]: (state, { payload }) => {

      console.log("[signIn.fulfilled]", payload);

      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.authenticating = false;

      state.value.user.userId = payload.id;
      state.value.user.email = payload.email;
      state.value.user.token = payload.token;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.value.authenticating = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },
  },
});

export const { resetAuthData} = authSlice.actions;

export default authSlice.reducer;
