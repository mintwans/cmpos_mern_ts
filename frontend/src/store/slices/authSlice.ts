import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { server } from "../../constants";
import { LoginResult, RegisterResult } from "../../types/auth-result.type";
import { User } from "../../types/user.type";
import { httpClient } from "../../utils/HttpClient";
import { RootState } from "../store";

export interface AuthState {
  loginResult?: LoginResult;
  registerResult?: RegisterResult;
  isAuthenticating: boolean;
  isAuthented: boolean;
  isError: boolean;
}

const initialState: AuthState = {
  isAuthenticating: true,
  isAuthented: false,
  isError: false,
};

export const login = createAsyncThunk("auth/login", async (value: User) => {
  let result = await httpClient.post<LoginResult>(server.LOGIN_URL, value);

  const { token } = result.data;
  localStorage.setItem(server.TOKEN_KEY, token);
  return result.data;
});

export const register = createAsyncThunk("auth/register", async (value: User) => {
  let result = await httpClient.post<RegisterResult>(server.REGISTER_URL, value);
  if (result.data.result === "ok") {
    return result.data;
  }

  throw Error();
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state: AuthState, action: PayloadAction<void>) => {
      localStorage.removeItem(server.TOKEN_KEY);
      state.isAuthented = false;
    },
    relogin: (state: AuthState, action: PayloadAction<void>) => {
      const _token = localStorage.getItem(server.TOKEN_KEY);
      if (_token) {
        if (!state.loginResult) {
          state.loginResult = {
            token: _token,
            result: "ok",
          };
          state.isAuthented = true;
        }
      }
      state.isAuthenticating = false;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.result === "ok") {
        state.isAuthented = true;
        state.isError = false;
        state.loginResult = action.payload;
      } else {
        state.isError = true;
        state.isAuthented = false;
      }
      state.isAuthenticating = false;
    });

    // register
    builder.addCase(register.fulfilled, (state, action) => {
      state.isError = false;
    });

    // register
    builder.addCase(register.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { logout, relogin } = authSlice.actions;
export const authSelector = (store: RootState) => store.authReducer;

export default authSlice.reducer;