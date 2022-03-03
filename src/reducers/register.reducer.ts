import {
  REGISTER_FAILED,
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
} from "../constants";

export interface RegisterState {
  result: any;
  isFetching: boolean;
  isError: boolean;
}

const initialState: RegisterState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case REGISTER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case REGISTER_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case REGISTER_FAILED:
      return { ...state, result: payload, isFetching: false, isError: true };

    default:
      return state;
  }
};
