import { useHistory } from "react-router";
import {
  LOGIN_FAILED,
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGOUT,
  server,
} from "../constants";
import { httpClient } from "../utils/HttpClient";
import jwt from "jsonwebtoken";

// Send action type and payload to Reducer
export const setLoginFetchingToState = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginSuccessToState = (payload: any) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginFailedToState = () => ({
  type: LOGIN_FAILED,
});

export const setLoginLogoutToState = () => ({
  type: LOGOUT,
});

export const handleLogin = (value: any, history: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setLoginFetchingToState()); // fetching

      let result = await httpClient.post(server.LOGIN_URL, value);

      if (result.data.result === "ok") {
        const { token, refreshToken } = result.data;
        localStorage.setItem(server.TOKEN_KEY, token);
        localStorage.setItem(server.REFRESH_TOKEN_KEY, refreshToken);

        dispatch(setLoginSuccessToState(result.data));
        history.push("/stock");
      } else {
        dispatch(setLoginFailedToState());
      }
    } catch (error) {
      dispatch(setLoginFailedToState());
    }
  };
};

export const handleLogout = (history: any) => {
  return (dispatch: any) => {
    localStorage.removeItem(server.TOKEN_KEY);
    localStorage.removeItem(server.REFRESH_TOKEN_KEY);
    dispatch(setLoginLogoutToState());
    history.push("/login");
  };
};

export const handleReLogin = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem(server.TOKEN_KEY);
    debugger;
    if (token && !isTokenExpired(token)) {
      dispatch(setLoginSuccessToState({ token }));
    }
  };
};

export const isTokenExpired = (token: string): boolean => {
  var decodedToken = jwt.decode(token, { complete: true });
  var dateNow = new Date();

  if (decodedToken?.payload.exp! < dateNow.getTime()) {
    return false;
  } else {
    return true;
  }
};
