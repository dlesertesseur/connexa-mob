import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";

const initialState = {
  value: {
    shifts: [],
    selectedShift: null,
    loading: false,
    error: false,
    errorMessage: null,
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

export const shiftsSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    resetShiftData: () => initialState,
    setSelectedShift: (state, action) => {
      state.value.selectedShift = action.payload;
    },
  },
  extraReducers: {
    [findAllShiftsByWorkerId.pending]: (state) => {
      state.value.error = false;
      state.value.errorMessage = null;
    },
    [findAllShiftsByWorkerId.fulfilled]: (state, { payload }) => {

      if (payload.error) {
        state.value.error = payload.error.message;
      }
      state.value.shifts = payload;
    },
    [findAllShiftsByWorkerId.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      state.value.errorMessage = payload.error.message;
    },
  },
});

export const { resetShiftData, setSelectedShift } = shiftsSlice.actions;

export default shiftsSlice.reducer;
