import { FETCH_CATEGORIES_SUCCESS } from "actionTypes";
import { ICategoriesStore, ICategory } from "Models";
import { merge } from "ramda";

const categoriesInitialState: ICategoriesStore = {};

interface FetchCategoriesSuccessAction {
  type: typeof FETCH_CATEGORIES_SUCCESS;
  payload: ICategory;
}

type CaterogiesActionTypes = FetchCategoriesSuccessAction;

export default (
  state = categoriesInitialState,
  action: CaterogiesActionTypes
) => {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return merge(state, action.payload);
    default:
      return state;
  }
};
