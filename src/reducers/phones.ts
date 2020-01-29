import {
  FETCH_PHONES_SUCCESS,
  FETCH_PHONE_BY_ID_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS
} from "actionTypes";
import { IPhonesStore, IPhone } from "Models";
import { indexBy, prop, merge, assoc } from "ramda";

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
      const newValues = indexBy(prop("id"), action.payload);
      return merge(state, newValues);
    case LOAD_MORE_PHONES_SUCCESS:
      const moreValues = indexBy(prop("id"), action.payload);
      return merge(state, moreValues);
    case FETCH_PHONE_BY_ID_SUCCESS:
      return assoc(action.payload.id, action.payload, state);
    default:
      return state;
  }
};
