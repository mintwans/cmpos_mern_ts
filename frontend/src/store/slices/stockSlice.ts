import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../utils/constants";
import { Product } from "../../types/product.type";
import { httpClient } from "../../utils/HttpClient";
import { RootState, store } from "../store";

export interface StockState {
  stockAllResult: Product[];
  stockOneResult: Product | null;
}

const initialState: StockState = {
  stockAllResult: [],
  stockOneResult: null,
};

// Add
export const addProduct = createAsyncThunk("stock/add", async (formData: FormData) => {
  await httpClient.post(server.PRODUCT_URL, formData);
  store.dispatch(getProducts());
});

// Query
export const getProducts = createAsyncThunk("stock/getAll", async (keyword?: string): Promise<Product[]> => {
  if (keyword) {
    const result = await httpClient.get<Product[]>(`${server.PRODUCT_URL}/name/${keyword}`);
    return result.data;
  } else {
    const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
    return result.data;
  }
});

// Query by Id
export const getProductById = createAsyncThunk("stock/getById", async (id: string): Promise<Product> => {
  const result = await await httpClient.get(`${server.PRODUCT_URL}/id/${id}`);
  return result.data;
});

// Delete
export const deleteProduct = createAsyncThunk("stock/delete", async (id: string) => {
  await httpClient.delete(`${server.PRODUCT_URL}/id/${id}`);
  store.dispatch(getProducts());
});

// Edit
export const editProduct = createAsyncThunk("stock/edit", async (formData: any) => {
  await httpClient.put(server.PRODUCT_URL, formData);
});

const stockSlice = createSlice({
  name: "stock",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getProdcut
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.stockAllResult = action.payload;
    });

    // getProductById
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.stockOneResult = action.payload;
    });
  },
});

export const stockSelector = (store: RootState): StockState => store.stockReducer;
export default stockSlice.reducer;
