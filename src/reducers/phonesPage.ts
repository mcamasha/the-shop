import R from "ramda";

import {
  FETCH_PHONES_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS,
  SEARCH_PHONE
} from "actionTypes";
import { IPhonesPageStore, IPhone } from "Models";

const phonesPageInitialState: IPhonesPageStore = {
  ids: [],
  search: ""
};

interface FetchPhonesSuccessAction {
  type: typeof FETCH_PHONES_SUCCESS;
  payload: IPhone[];
}

interface LoadMorePhonesSuccessAction {
  type: typeof LOAD_MORE_PHONES_SUCCESS;
  payload: IPhone[];
}

interface SearchPhoneAction {
  type: typeof SEARCH_PHONE;
  payload: string;
}

type TPhonePagesActionType =
  | FetchPhonesSuccessAction
  | LoadMorePhonesSuccessAction
  | SearchPhoneAction;

export default (
  state = phonesPageInitialState,
  action: TPhonePagesActionType
) => {
  switch (action.type) {
    case FETCH_PHONES_SUCCESS:
      return R.merge(state, {
        ids: R.pluck("id", action.payload)
      });
    case LOAD_MORE_PHONES_SUCCESS:
      const ids = R.pluck("id", action.payload);
      return R.merge(state, {
        ids: R.concat(ids, state.ids)
      });
    case SEARCH_PHONE:
      return R.merge(state, {
        search: action.payload
      });

    default:
      return state;
  }
};
