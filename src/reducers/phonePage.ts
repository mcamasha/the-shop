import R from "ramda";

import { FETCH_PHONE_BY_ID_SUCCESS } from "actionTypes";
import { IPhonePageStore } from "Models";

const phonePageInitialState: IPhonePageStore = {
  id: ""
};

interface FetchPhoneByIdSuccessAction {
  type: typeof FETCH_PHONE_BY_ID_SUCCESS;
  payload: IPhonePageStore;
}

type TPhonePageActionType = FetchPhoneByIdSuccessAction;

export default (
  state = phonePageInitialState,
  action: TPhonePageActionType
) => {
  switch (action.type) {
    case FETCH_PHONE_BY_ID_SUCCESS:
      return R.merge(state, {
        id: R.prop("id", action.payload)
      });
    default:
      return state;
  }
};
