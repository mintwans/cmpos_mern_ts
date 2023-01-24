import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ExampleState {}

const initialState: ExampleState = {};

const exampleSlice = createSlice({
  name: "demo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const exampleSelector = (store: RootState): ExampleState => store.stockReducer;
export default exampleSlice.reducer;
