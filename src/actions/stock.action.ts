import {
  server,
  STOCK_CLEAR,
  STOCK_FAILED,
  STOCK_FETCHING,
  STOCK_SUCCESS,
} from "../constants";
import { HistoryProp } from "../types/history.type";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/HttpClient";

export const setStateStockToSuccess = (payload: Product[]) => ({
  type: STOCK_SUCCESS,
  payload,
});

const setStateStockToFetching = () => ({
  type: STOCK_FETCHING,
});

const setStateStockToFailed = () => ({
  type: STOCK_FAILED,
});

const setStateStockToClear = () => ({
  type: STOCK_CLEAR,
});

export const clearProduct = () => {
  return (dispatch: any) => {
    dispatch(setStateStockToClear());
  };
};

export const getProducts = () => {
  return (dispatch: any) => {
    dispatch(setStateStockToFetching());
    doGetProducts(dispatch);
  };
};

export const addProduct = (formData: any, history: HistoryProp) => {
  return async (dispatch: any) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const updateProduct = (formData: any, history: HistoryProp) => {
  return async (dispatch: any) => {
    await httpClient.put(server.PRODUCT_URL, formData);
    history.goBack();
  };
};

export const getProductById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStateStockToFetching());
      let result = await httpClient.get(`${server.PRODUCT_URL}/id/${id}`);
      dispatch(setStateStockToSuccess(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStateStockToFailed());
    }
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setStateStockToFetching());
    await httpClient.delete(`${server.PRODUCT_URL}/id/${id}`);
    await doGetProducts(dispatch);
  };
};

export const getProductByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setStateStockToFetching());

    if (keyword !== null && keyword !== "") {
      let result = await httpClient.get<Product[]>(
        `${server.PRODUCT_URL}/name/${keyword}`
      );
      dispatch(setStateStockToSuccess(result.data));
    } else {
      doGetProducts(dispatch);
    }
  };
};

const doGetProducts = async (dispatch: any) => {
  try {
    let result = await httpClient.get<Product[]>(server.PRODUCT_URL);
    dispatch(setStateStockToSuccess(result.data));
  } catch (err) {
    // alert(JSON.stringify(err));
    dispatch(setStateStockToFailed());
  }
};
