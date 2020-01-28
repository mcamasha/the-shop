import {
  FETCH_PHONES_START,
  FETCH_PHONES_SUCCESS,
  FETCH_PHONES_FAILURE,
  LOAD_MORE_PHONES_START,
  LOAD_MORE_PHONES_SUCCESS,
  LOAD_MORE_PHONES_FAILURE,
  FETCH_PHONE_BY_ID_START,
  FETCH_PHONE_BY_ID_SUCCESS,
  FETCH_PHONE_BY_ID_FAILURE,
  ADD_PHONE_TO_BASKET,
  SEARCH_PHONE,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET
} from "actionTypes";
import { getRenderedPhonesLength } from "selectors";
import {
  fetchPhones as fetchPhonesApi,
  loadMorePhones as loadMorePhonesApi,
  fetchPhoneById as fetchPhoneByIdApi,
  fetchCategories as fetchCategoriesApi
} from "api";
import { IPhone, IReduxStore } from "Models";
import { Dispatch } from "redux";

export const fetchPhones = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PHONES_START });

  try {
    const phones = await fetchPhonesApi();
    dispatch({
      type: FETCH_PHONES_SUCCESS,
      payload: phones
    });
  } catch (err) {
    dispatch({
      type: FETCH_PHONES_FAILURE,
      payload: err,
      error: true
    });
  }
};

export const loadMorePhones = () => async (
  dispatch: Dispatch,
  getState: () => IReduxStore
) => {
  // const offset = getRenderedPhonesLength(getState());

  dispatch({ type: LOAD_MORE_PHONES_START });

  try {
    const phones = await loadMorePhonesApi();
    dispatch({
      type: LOAD_MORE_PHONES_SUCCESS,
      payload: phones
    });
  } catch (err) {
    dispatch({
      type: LOAD_MORE_PHONES_FAILURE,
      payload: err,
      error: true
    });
  }
};

export const fetchPhoneById = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_PHONE_BY_ID_START });

  try {
    const phone = await fetchPhoneByIdApi(id);
    dispatch({
      type: FETCH_PHONE_BY_ID_SUCCESS,
      payload: phone
    });
  } catch (err) {
    dispatch({
      type: FETCH_PHONE_BY_ID_FAILURE,
      payload: err,
      error: true
    });
  }
};

export const addPhoneToBasket = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_PHONE_TO_BASKET,
    payload: id
  });
};

export const searchPhone = (text: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SEARCH_PHONE,
    payload: text
  });
};

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_START });

  try {
    const phones = await fetchCategoriesApi();
    dispatch({
      type: FETCH_CATEGORIES_SUCCESS,
      payload: phones
    });
  } catch (err) {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      payload: err,
      error: true
    });
  }
};

export const removePhoneFromBasket = (id: string) => async (
  dispatch: Dispatch
) => {
  dispatch({
    type: REMOVE_PHONE_FROM_BASKET,
    payload: id
  });
};

export const cleanBasket = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAN_BASKET
  });
};

export const basketCheckout = (phones: IPhone[]) => () => {
  alert(JSON.stringify(phones));
};
