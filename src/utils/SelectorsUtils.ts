import { contains, equals, prop } from "ramda";

export const isSearchPhone = (phone: IPhone) =>
  contains(state.phonesPage.search, prop("name", phone));

export const applyCategory = (phone: IPhone) =>
  equals(activeCategoryId, prop("categoryId", phone));
