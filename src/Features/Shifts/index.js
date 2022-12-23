import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";
import i18n from "../../Config/i18n";

const initialState = {
  value: {
    shifts: [],
    selectedShift: {
      id: 1,
      siteName: "Jumbo La Palmera",
      latitude: -34.599180013768866,
      longitude: -58.482890508401695,
      organization: "Supermercados DIA",
      branch: "Tienda 002",
      address: "Corrientes 449, B1636 Vicente López, Provincia de Buenos Aires",
      pause: true,
      job: "Reposicion General",
      remuneration: 6000,
      startDateAndTime: "2022-12-22 20:00:00",
      endDateAndTime: "2022-12-22 23:30:00",
      pauseStartDateAndTime: "2022-12-22 22:00:00",
      pauseEndDateAndTime: "2022-12-22 20:30:00",
    },
    loading: false,
    error: false,
    errorMessage: null,
    loadingProfile: false,
    actualLocation: null,
    indoorLocationCode: null,
    startedActivity: null,
    startingActivity: false,
    finishingActivity: false,
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

      const url =
        API.shift.findAllByWorkerId + parameters.id + "/shifts/assigned";

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
        "/shifts/started";

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

      const url =
        API.shift.startWorkShiftById +
        parameters.id +
        "/shifts/" +
        parameters.shiftId +
        "/status/started";

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

      const url =
        API.shift.endWorkShiftById +
        parameters.id +
        "/shifts/" +
        parameters.shiftId +
        "/status/ended";

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const startActiviryFronting = createAsyncThunk(
  "shifts/startActiviryFronting",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url =
        API.shift.startActiviryFronting +
        parameters.id +
        "/shifts/" +
        parameters.shiftId +
        "/status/fronting-started";

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const endActiviryFronting = createAsyncThunk(
  "shifts/endActiviryFronting",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url =
        API.shift.endActiviryFronting +
        parameters.id +
        "/shifts/" +
        parameters.shiftId +
        "/status/fronting-ended";

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

    setIndoorLocationCode: (state, action) => {
      state.value.indoorLocationCode = action.payload;
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
      } else {
        state.value.errorMessage = i18n.t("error.connection");
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
      } else {
        state.value.errorMessage = i18n.t("error.connection");
      }
    },

    [startActiviryFronting.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
      state.value.startingActivity = true;
    },
    [startActiviryFronting.fulfilled]: (state, { payload }) => {
      state.value.startingActivity = false;

      if (payload?.error) {
        state.value.errorMessage = payload.message;
        state.value.error = true;
      } else {
        state.value.startedActivity = payload;
        state.value.errorMessage = null;
        state.value.error = false;
      }
    },
    [startActiviryFronting.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.startingActivity = false;

      if (payload) {
        state.value.errorMessage = payload.message;
      } else {
        state.value.errorMessage = i18n.t("error.connection");
      }
    },

    [endActiviryFronting.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
      state.value.finishingActivity = true;
    },
    [endActiviryFronting.fulfilled]: (state, { payload }) => {
      state.value.finishingActivity = false;
      if (payload.error) {
        state.value.errorMessage = payload.message;
        state.value.error = true;
      } else {
        state.value.startedActivity = null;
        state.value.errorMessage = null;
        state.value.error = false;
      }
    },
    [endActiviryFronting.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      state.value.finishingActivity = false;
      if (payload) {
        state.value.errorMessage = payload.message;
      } else {
        state.value.errorMessage = i18n.t("error.connection");
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
      } else {
        state.value.errorMessage = i18n.t("error.connection");
      }
    },
  },
});

export const {
  resetShiftData,
  setSelectedShift,
  setActualLocation,
  setIndoorLocationCode,
} = shiftsSlice.actions;

export default shiftsSlice.reducer;
