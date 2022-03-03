import {
  server,
  TRANSACTION_FAILED,
  TRANSACTION_FETCHING,
  TRANSACTION_SUCCESS,
} from "../constants";
import { httpClient } from "../utils/HttpClient";

const setStateTransactionToSuccess = (payload: any) => ({
  type: TRANSACTION_SUCCESS,
  payload: payload,
});

const setStateTransactionToFetching = () => ({
  type: TRANSACTION_FETCHING,
});

const setStateTransactionToFailed = () => ({
  type: TRANSACTION_FAILED,
});

export const getTransactions = () => {
  setStateTransactionToFetching();
  return (dispatch: any) => {
    httpClient
      .get(server.TRANSACTION_URL)
      .then((result) => {
        dispatch(setStateTransactionToSuccess(result.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setStateTransactionToFailed());
      });
  };
};
