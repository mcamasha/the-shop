import {
  FETCH_PHONES_SUCCESS,
  LOAD_MORE_PHONES_SUCCESS,
  SEARCH_PHONE
} from "actionTypes";
import { IPhonesPageStore, IPhone } from "Models";
import { merge, pluck, concat } from "ramda";

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
      return merge(state, {
        ids: pluck("id", action.payload)
      });
    case LOAD_MORE_PHONES_SUCCESS:
      const ids = pluck("id", action.payload);
      return merge(state, {
        ids: concat(ids, state.ids)
      });
    case SEARCH_PHONE:
      return merge(state, {
        search: action.payload
      });

    default:
      return state;
  }
};
