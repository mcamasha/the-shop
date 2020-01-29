import { FETCH_PHONE_BY_ID_SUCCESS } from "actionTypes";
import { IPhonePageStore } from "Models";
import { merge, prop } from "ramda";

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
      return merge(state, {
        id: prop("id", action.payload)
      });
    default:
      return state;
  }
};
