import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    scannedList: [],
    products: [],
    productsByCategory: [],
    productSelected: null,
  },
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (asyncThunk) => {
    try {
      const res = await fetch(`${DDBB_URL}products.json`);
      const data = Object.values(await res.json());
      return data;
    } catch (error) {
      return rejectWithValue("Error: no es posible obtener las ordenes");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addScannedProduct: (state, action) => {
      console.log("addScannedProduct", action);
      state.value.scannedList.push(action.payload);
    },
  },

  extraReducers: {
    [getProducts.pending]: (state) => {
      state.value.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.value.loading = false;
      state.value.products = payload;
    },
    [getProducts.rejected]: (state) => {
      state.value.loading = false;
      state.value.error = true;
    },
  },
});

export const { addScannedProduct} =
  productsSlice.actions;

export default productsSlice.reducer;
