import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    location:null,
  },
};


export const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    setLocation: (state, action) => {
      console.log("setLocation", action);
      state.value.location= (action.payload);
    },
  },

  extraReducers: {},
});

export const { setLocation } = alertSlice.actions;

export default alertSlice.reducer;
