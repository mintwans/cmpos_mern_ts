import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
  server,
} from "../constants";
import { RegisterResult } from "../types/auth-result.type";
import { HistoryProp } from "../types/history.type";
import { httpClient } from "../utils/HttpClient";
import { history } from "../index";
export const setRegisterStateToFetch = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterStateToSuccess = (payload: any) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterStateToFailed = (payload: any) => ({
  type: REGISTER_FAILED,
  payload: payload,
});

// Called by Register Component
export const register = (value: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setRegisterStateToFetch()); // fetching
      let result = await httpClient.post<RegisterResult>(
        server.REGISTER_URL,
        value
      );
      if (result.data.result === "ok") {
        dispatch(setRegisterStateToSuccess(result));
        history.back();
      } else {
        dispatch(setRegisterStateToFailed(result));
      }
    } catch (error) {
      dispatch(setRegisterStateToFailed({ data: { message: error } }));
    }
  };
};
