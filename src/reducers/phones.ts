import R from "ramda";

import {
  FETCH_PHONES_SUCCESS,
  FETCH_PHONE_BY_ID_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS
} from "actionTypes";
import { IPhonesStore, IPhone } from "Models";

const phonesInitialState: IPhonesStore = {};

interface AddPhoneToBasketAction {
  type: typeof FETCH_PHONES_SUCCESS;
  payload: IPhone[];
}

interface LoadMorePhonesSuccessAction {
  type: typeof LOAD_MORE_PHONES_SUCCESS;
  payload: IPhone[];
}

interface FetchPhoneByIdSuccessAction {
  type: typeof FETCH_PHONE_BY_ID_SUCCESS;
  payload: IPhone;
}

type TPhonesActionType =
  | AddPhoneToBasketAction
  | LoadMorePhonesSuccessAction
  | FetchPhoneByIdSuccessAction;

export default (state = phonesInitialState, action: TPhonesActionType) => {
  switch (action.type) {
    case FETCH_PHONES_SUCCESS:
      const newValues = R.indexBy(R.prop("id"), action.payload);
      return R.merge(state, newValues);
    case LOAD_MORE_PHONES_SUCCESS:
      const moreValues = R.indexBy(R.prop("id"), action.payload);
      return R.merge(state, moreValues);
    case FETCH_PHONE_BY_ID_SUCCESS:
      return R.assoc(action.payload.id, action.payload, state);
    default:
      return state;
  }
};
