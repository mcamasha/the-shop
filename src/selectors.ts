import R from "ramda";
import { IReduxStore, IPhone, ICategory } from "Models";
import { ICategoriesOwnProps } from "components/categories";

export const getPhoneById = (state: IReduxStore, id: string) =>
  R.find((phone: IPhone) => R.equals(id, phone.id), state.phones);

export const getActiveCategoryId = (ownProps: ICategoriesOwnProps) =>
  R.path<string>(["params", "id"], ownProps);

export const getPhones = (state: IReduxStore, ownProps): IPhone[] => {
  const activeCategoryId = getActiveCategoryId(ownProps);
  const applySearch = (phone: IPhone) =>
    R.contains(state.phonesPage.search, R.prop("name", phone));
  const applyCategory = (phone: IPhone) =>
    R.equals(activeCategoryId, R.prop("categoryId", phone));

  const phones = R.compose(
    R.filter(applySearch),
    R.when(R.always(activeCategoryId), R.filter(applyCategory)),
    R.map((id: string) => getPhoneById(state, id))
  )(state.phonesPage.ids);

  return phones;
};

export const getRenderedPhonesLength = (state: IReduxStore) =>
  R.length(state.phonesPage.ids);

export const getTotalBasketCount = (state: IReduxStore) =>
  R.length(state.basket);

export const getTotalBasketPrice = (state: IReduxStore) => {
  const totalPrice = R.compose(
    R.sum,
    R.pluck("price"),
    R.map((id: string) => getPhoneById(state, id))
  )(state.basket);

  return totalPrice;
};

export const getCategories = (state: IReduxStore): ICategory[] =>
  R.values(state.categories);

export const getBasketPhonesWithCount = (state: IReduxStore) => {
  const phoneCount = (id: string): number =>
    R.compose(
      R.length,
      R.filter((basketId: string) => R.equals(id, basketId))
    )(state.basket);
  const phoneWithCount = (phone: IPhone): IPhone & { count: number } =>
    R.assoc("count", phoneCount(phone.id), phone);

  const uniqueIds = R.uniq(state.basket);
  const phonesWithCount = R.compose(
    R.map(phoneWithCount),
    R.map((id: string) => getPhoneById(state, id))
  )(uniqueIds);

  return phonesWithCount;
};
