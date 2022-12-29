import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    actualLocation: null,
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setActualLocation: (state, action) => {
      state.value.actualLocation = action.payload;
    },
  },
  extraReducers: {},
});

export const { setActualLocation } = locationSlice.actions;

export default locationSlice.reducer;
