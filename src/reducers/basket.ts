import {
  ADD_PHONE_TO_BASKET,
  REMOVE_PHONE_FROM_BASKET,
  CLEAN_BASKET
} from "actionTypes";
import { append, without, of } from "ramda";

const basketInitialState: string[] = [];

interface AddPhoneToBasketAction {
  type: typeof ADD_PHONE_TO_BASKET;
  payload: string;
}

interface RemovePhoneFromBasketAction {
  type: typeof REMOVE_PHONE_FROM_BASKET;
  payload: string;
}

interface CleanBasketAction {
  type: typeof CLEAN_BASKET;
}

type TBasketActionType =
  | AddPhoneToBasketAction
  | RemovePhoneFromBasketAction
  | CleanBasketAction;

export default (state = basketInitialState, action: TBasketActionType) => {
  switch (action.type) {
    case ADD_PHONE_TO_BASKET:
      return append(action.payload, state);
    case REMOVE_PHONE_FROM_BASKET:
      return without(of(action.payload), state);
    case CLEAN_BASKET:
      return [];
    default:
      return state;
  }
};
