import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";
import i18n from "../../Config/i18n";

const initialState = {
  value: {
    shifts: [],
    selectedShift: null,
    loading: false,
    error: false,
    errorMessage: null,
    loadingProfile: false,
    actualLocation:null
  },
};

export const findAllShiftsByWorkerId = createAsyncThunk(
  "shifts/findAllShiftsByWorkerId",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url = API.shift.findAllByWorkerId + parameters.id;

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const findStartedShiftByWorkerId = createAsyncThunk(
  "shifts/findStartedShiftByWorkerId",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url =
        API.shift.findStartedShiftByWorkerId +
        parameters.id +
        "/status/started";

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const startWorkShift = createAsyncThunk(
  "shifts/startWorkShift",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url = API.shift.startWorkShiftById + parameters.id + "/status/started";

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const endWorkShift = createAsyncThunk(
  "shifts/endWorkShift",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url = API.shift.endWorkShiftById + parameters.id + "/status/ended";

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    resetShiftData: () => initialState,
    setSelectedShift: (state, action) => {
      state.value.selectedShift = action.payload;
    },
    setActualLocation: (state, action) => {
      state.value.actualLocation = action.payload;
    },
  },
  extraReducers: {
    [findAllShiftsByWorkerId.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [findAllShiftsByWorkerId.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = true;
        state.value.errorMessage = payload.message;
      } else {
        state.value.shifts = payload;
      }
    },
    [findAllShiftsByWorkerId.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      if (payload) {
        state.value.errorMessage = payload.error.message;
      }else{
        state.value.errorMessage=i18n.t("error.connection");
      }
    },

    [startWorkShift.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [startWorkShift.fulfilled]: (state, { payload }) => {
      if (payload?.error) {
        state.value.error = payload.error.message;
      }
      state.value.selectedShift = payload;
    },
    [startWorkShift.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },

    [endWorkShift.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [endWorkShift.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.selectedShift = null;
    },
    [endWorkShift.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      if (payload) {
        state.value.errorMessage = payload.error.message;
      }else{
        state.value.errorMessage=i18n.t("error.connection");
      }
    },

    [findStartedShiftByWorkerId.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
      state.value.loadingProfile = true;
    },
    [findStartedShiftByWorkerId.fulfilled]: (state, { payload }) => {
      state.value.loadingProfile = false;

      if (payload.error) {
        state.value.error = payload.error.message;
        state.value.selectedShift = null;
      } else {
        if (payload.length > 0) {
          state.value.selectedShift = payload[0];
        } else {
          state.value.selectedShift = null;
        }
      }
    },
    [findStartedShiftByWorkerId.rejected]: (state, { payload }) => {
      state.value.loadingProfile = false;
      state.value.error = true;
      if (payload) {
        state.value.errorMessage = payload.error.message;
      }else{
        state.value.errorMessage=i18n.t("error.connection");
      }
    },
  },
});

export const { resetShiftData, setSelectedShift, setActualLocation } = shiftsSlice.actions;

export default shiftsSlice.reducer;
