import {
  TRANSACTION_FAILED,
  TRANSACTION_FETCHING,
  TRANSACTION_SUCCESS,
} from "../constants";

export interface TransactionState {
  result: any;
  isFetching: boolean;
  isError: boolean;
}

const initialState: TransactionState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case TRANSACTION_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case TRANSACTION_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case TRANSACTION_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
