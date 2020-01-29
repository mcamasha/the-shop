import R, { find, propEq } from "ramda";
import axios from "axios";

import phones from "api/mockPhones";
import categories from "api/mockCategories";

export const fetchPhones = async () => {
  const { body } = await axios.get(
    "http://www.mocky.io/v2/5918b9461200001f1040dbeb"
  );
  return body.phones;
};

export const loadMorePhones = async () => {
  return new Promise(resolve => {
    resolve(phones);
  });
};

export const fetchPhoneById = async (id: string) => {
  return new Promise((resolve, reject) => {
    const phone = find(propEq("id", id), phones);
    resolve(phone);
  });
};

export const fetchCategories = async () => {
  return new Promise((resolve, reject) => {
    resolve(categories);
  });
};
