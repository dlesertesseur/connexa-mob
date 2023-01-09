import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../Config/Api";

const initialState = {
  value: {
    scannedList: [],
    products: [],
    productsByCategory: [],
    product: null,
  },
};

export const getProducts = createAsyncThunk("products/getProducts", async (asyncThunk) => {
  try {
    const res = await fetch(`${DDBB_URL}products.json`);
    const data = Object.values(await res.json());
    return data;
  } catch (error) {
    return rejectWithValue("Error: no es posible obtener las ordenes");
  }
});

export const findProductByEan = createAsyncThunk(
  "shifts/findProductByEan",
  async (parameters, asyncThunk) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: parameters.token,
        },
      };

      const url = API.product.findByEan + parameters.id + "/products/" + parameters.ean;

      const res = await fetch(url, requestOptions);
      const data = await res.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)


export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addScannedProduct: (state, action) => {
      let found = state.value.scannedList.find((item) => item.id === action.payload.id);
      if (!found) {
        state.value.scannedList.push(action.payload);
        state.value.product=null;
      }
    },
    deleteScannedProduct: (state, action) => {
      const filtered = state.value.scannedList.filter((item) => item.id !== action.payload.id);
      state.value.scannedList = filtered;
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

    [findProductByEan.pending]: (state) => {
      state.value.error = null;
      state.value.errorMessage = null;
      state.value.errorStatus = null;
      state.value.loading = true;
    },
    
    [findProductByEan.fulfilled]: (state, { payload }) => {
      if (payload.error) {
        state.value.error = payload.error;
        state.value.errorMessage = payload.message;
        state.value.errorStatus = payload.status;
      }else{
        state.value.product = payload;
      }
    },

    [findProductByEan.rejected]: (state, { payload }) => {
      state.value.loading = false;
      state.value.error = true;
      if (payload) {
        state.value.error = payload.error;
        state.value.errorStatus = payload.status;
        state.value.errorMessage = payload.message;
      } else {
        state.value.errorMessage = i18n.t("error.connection");
      }
      state.value.loading = true;
    },
  },
});

export const { addScannedProduct, deleteScannedProduct } = productsSlice.actions;

export default productsSlice.reducer;
