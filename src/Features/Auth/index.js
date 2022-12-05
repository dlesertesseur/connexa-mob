import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";
import { status } from "../../Config/Constants";

const initialState = {
  value: {
    user: {
      // userId: "10001",
      // email: "jfuentes@gmail.com ",
      // token: "###TOKEN###",
      // photo: "",
      // country: "Argentina",
      // city: "Buenos Aires",
      // status: status.PENDING_DOCUMENTS,
      // step: 1,

      userId: null,
      email: null,
      token: null,
      photo: null,
      country: null,
      city: null,
      status:null,
    },

    loading: false,
    authenticating: false,
    creating: false,
    created: null,
    error: false,
    errorMessage: null,
    document: null,
    documents: require("../../DataAccess/documents.json"),

    signupData: null,
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

export const signUp = createAsyncThunk("auth/signUp", async (parameters) => {
  try {
     const body = {
      phone: parameters.phoneNumber,
      firstname: parameters.names,
      lastname: parameters.surnames,
      birthDate: parameters.dateOfBirth,
      country: parameters.country,
      city: parameters.city,
      address: parameters.address,
      email: parameters.email,
      password: parameters.password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    const url = API.auth.signUp;
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
    setDocument: (state, action) => {
      state.value.document = action.payload;
    },

    setSelectedCountry: (state, action) => {
      state.value.user.country = action.payload;
    },

    setSeletedCity: (state, action) => {
      state.value.user.city = action.payload.name;
    },

    setSignupData: (state, action) => {
      state.value.signupData = action.payload;
    },

    saveDocument: (state, action) => {
      let ret = state.value.documents.map((d) => {
        if (d.id === action.payload.id) {
          d.url = action.payload.url;
        }
        return(d);
      });

      state.value.documents = ret;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.value.authenticating = true;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      //console.log("[signIn.fulfilled]", payload);

      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.authenticating = false;

      state.value.user = payload.worker;
      state.value.user.token = payload.token;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.value.authenticating = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },

    [signUp.pending]: (state) => {
      state.value.created = null;
      state.value.creating = true;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      //console.log("[signUp.fulfilled]", payload);

      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.creating = false;

      // state.value.user.userId = payload.id;
      // state.value.user.email = payload.email;
      // state.value.user.token = payload.token;
      state.value.created = Date.now();
    },
    [signUp.rejected]: (state, { payload }) => {
      state.value.creating = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },
  },
});

export const { resetAuthData, setSelectedCountry, setSeletedCity, setDocument, saveDocument, setSignupData } = authSlice.actions;

export default authSlice.reducer;
