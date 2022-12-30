import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";
import { NO_IMAGE } from "../../Config/Constants";

const initialState = {
  value: {
    user: {
      // userId: "10001",
      // email: "jfuentes@gmail.com",
      // token: "###TOKEN###",
      // photo: "",
      // country: "Argentina",
      // city: "Buenos Aires",
      // dateOfBirth: "10/10/1968",
      // phoneNumber: "(54) 9 11 4444-44444",
      // names: "Jose",
      // surnames: "Fuentes",
      // address: "San Martin 1235",
      // status: status.ACTIVED,

      userId: null,
      email: null,
      token: null,
      photo: null,
      country: null,
      city: null,
      dateOfBirth: null,
      phoneNumber: null,
      names: null,
      surnames: null,
      address: null,
      status: null,
    },

    loading: false,
    authenticating: false,
    creating: false,
    created: null,
    error: false,
    errorMessage: null,
    document: null,
    signupData: null,
    updatedDocument: null,
    profileImage: null,
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
    console.log("signUp -> " + error);
    return rejectWithValue(error);
  }
});

export const updateWorkerStatus = createAsyncThunk("auth/updateWorkerStatus", async (parameters) => {
  try {
    const requestOptions = {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };

    const url = API.worker.updateStatus + parameters.id + "/status/" + parameters.status;
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const findProfileImage = createAsyncThunk("auth/findProfileImage", async (parameters, asyncThunk) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: parameters.token,
      },
    };

    const url = API.worker.findImageByType + parameters.id + "/images/PROFILE_IMAGE";
    const res = await fetch(url, requestOptions);
    const data = await res.json();
    const img = data.url;
    return img;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthData: () => initialState,

    updatedDocument: (state, action) => {
      state.value.updatedDocument = Date.now();
    },

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

    resetError: (state, action) => {
      state.value.error = false;
      state.value.errorMessage = null;
    },

    setProfileImage: (state, action) => {
      state.value.user.photo = action.payload;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.value.authenticating = true;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [signIn.fulfilled]: (state, { payload }) => {

      if (payload.error) {
        state.value.error = true;
        state.value.errorMessage = payload.message;
      } else {
        state.value.user = payload.worker;
        state.value.user.token = payload.token;
        state.value.error = true;
        state.value.errorMessage = payload.message;
        state.value.profileImage = API.baseImageUrl + payload.worker.image;
      }
      state.value.authenticating = false;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.value.authenticating = false;
      state.value.error = true;
      state.value.errorMessage = payload ? payload.error.message : "NO ERROR DESCRIPTION";
    },

    [signUp.pending]: (state) => {
      state.value.created = null;
      state.value.creating = true;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = true;
        state.value.errorMessage = payload.message;
      } else {
        state.value.creating = false;
        state.value.created = Date.now();
      }
    },
    [signUp.rejected]: (state, { payload }) => {
      state.value.creating = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },

    [updateWorkerStatus.pending]: (state) => {
      state.value.updating = true;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [updateWorkerStatus.fulfilled]: (state, { payload }) => {
      if (payload?.error) {
        state.value.error = payload.error.message;
      }
      state.value.updating = false;
    },
    [updateWorkerStatus.rejected]: (state, { payload }) => {
      state.value.updating = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },

    [findProfileImage.pending]: (state) => {
      state.value.loading = false;
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [findProfileImage.fulfilled]: (state, { payload }) => {
      console.log("[findProfileImage.fulfilled]", payload);

      if (payload) {
        if (payload?.error) {
          state.value.error = true;
          state.value.errorMessage = payload.message;
          state.value.profileImage = NO_IMAGE;
        } else {
          state.value.profileImage = payload;
        }
      }else{
        state.value.profileImage = NO_IMAGE;
      }
    },
    [findProfileImage.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      state.value.errorMessage = payload?.error.message;
    },
  },
});

export const {
  resetAuthData,
  setSelectedCountry,
  setSeletedCity,
  setDocument,
  setSignupData,
  updatedDocument,
  resetError,
} = authSlice.actions;

export default authSlice.reducer;
