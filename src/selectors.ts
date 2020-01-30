import { IReduxStore, IPhone, ICategory } from "Models";
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
  uniq,
  prop,
  pickBy,
  pathOr,
  isEmpty,
  includes
} from "ramda";
import { RouteComponentProps } from "react-router";

export const getPhoneById = (state: IReduxStore, id: string): IPhone =>
  pickBy((phone: IPhone) => phone.id === id, state.phones);

export const getActiveCategoryId = (ownProps: RouteComponentProps) =>
  pathOr("", ["params", "id"], ownProps);

export const getPhones = (
  state: IReduxStore,
  ownProps: RouteComponentProps
): IPhone[] => {
  const activeCategoryId = getActiveCategoryId(ownProps);
  const isSearchPhone = (phone: IPhone) =>
    includes(state.phonesPage.search, prop("name", phone));
  const isSearchCategory = (phone: IPhone): boolean =>
    equals(activeCategoryId, prop("categoryId", phone));
  const getListPhonesByIds = (id: string) => getPhoneById(state, id);

  const phones: IPhone[] = compose(
    filter(isSearchPhone),
    // when(isEmpty(activeCategoryId), filter(applyCategory)),
    // filter(isSearchCategory),
    map(getListPhonesByIds)
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
      filter((phoneId: string) => id === phoneId)
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
