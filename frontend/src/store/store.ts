import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./slices/authSlice";
import stockReducer from "./slices/stockSlice";
import shopReducer from "./slices/shopSlice";

const reducer = {
  authReducer,
  stockReducer,
  shopReducer,
};

export const store = configureStore({
  reducer,
  devTools: import.meta.env.VITE_IS_PRODUCTION === "0", // show redux log in dev mode
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
