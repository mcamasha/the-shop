import { IReduxStore, IPhone, ICategory } from "Models";
import { ICategoriesOwnProps } from "components/categories";
import {
  find,
  path,
  equals,
  contains,
  compose,
  filter,
  when,
  always,
  map,
  length,
  pluck,
  sum,
  values,
  assoc,
  uniq
} from "ramda";

export const getPhoneById = (state: IReduxStore, id: string) =>
  find((phone: IPhone) => equals(id, phone.id), state.phones);

export const getActiveCategoryId = (ownProps: ICategoriesOwnProps) =>
  path<string>(["params", "id"], ownProps);

export const getPhones = (state: IReduxStore, ownProps): IPhone[] => {
  const activeCategoryId = getActiveCategoryId(ownProps);
  const applySearch = (phone: IPhone) =>
    contains(state.phonesPage.search, prop("name", phone));
  const applyCategory = (phone: IPhone) =>
    equals(activeCategoryId, prop("categoryId", phone));

  const phones = compose(
    filter(applySearch),
    when(always(activeCategoryId), filter(applyCategory)),
    map((id: string) => getPhoneById(state, id))
  )(state.phonesPage.ids);

  return phones;
};

export const getRenderedPhonesLength = (state: IReduxStore) =>
  length(state.phonesPage.ids);

export const getTotalBasketCount = (state: IReduxStore) => length(state.basket);

export const getTotalBasketPrice = (state: IReduxStore) => {
  const totalPrice = compose(
    sum,
    pluck("price"),
    map((id: string) => getPhoneById(state, id))
  )(state.basket);

  return totalPrice;
};

export const getCategories = (state: IReduxStore): ICategory[] =>
  values(state.categories);

export const getBasketPhonesWithCount = (state: IReduxStore) => {
  const phoneCount = (id: string): number =>
    compose(
      length,
      filter((basketId: string) => equals(id, basketId))
    )(state.basket);
  const phoneWithCount = (phone: IPhone): IPhone & { count: number } =>
    assoc("count", phoneCount(phone.id), phone);

  const uniqueIds = uniq(state.basket);
  const phonesWithCount = compose(
    map(phoneWithCount),
    map((id: string) => getPhoneById(state, id))
  )(uniqueIds);

  return phonesWithCount;
};
