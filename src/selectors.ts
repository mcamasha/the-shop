import { IReduxStore, IPhone, ICategory } from "Models";
import {
  equals,
  compose,
  filter,
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
  const listPhones: IPhone[] = map(
    (id: string) => getPhoneById(state, id),
    state.phonesPage.ids
  );
  const filteredByCategoryListPhones: IPhone[] = filter(
    isSearchCategory,
    listPhones
  );
  const filteredBySearchQueryListPhones: IPhone[] = filter(
    isSearchPhone,
    filteredByCategoryListPhones
  );

  return filteredBySearchQueryListPhones;
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
  const phoneCount = (id: string) =>
    state.basket.filter((phoneId: string) => id === phoneId).length;
  const phoneWithCount = (phone: IPhone): IPhone & { count: number } =>
    assoc("count", phoneCount(phone.id), phone);

  const uniqueIds = uniq(state.basket);
  const phonesWithCount = compose(
    map(phoneWithCount),
    map((id: string) => getPhoneById(state, id))
  )(uniqueIds);

  return phonesWithCount;
};
