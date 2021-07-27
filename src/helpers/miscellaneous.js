import _ from "lodash";
import { fromXdcAddress } from "../wallets/xinpay";

const ns = "farmer-favorites";

export const GetFavorites = () => {
  const favorites = localStorage.getItem(ns) || "";
  if (_.isEmpty(favorites)) return [];
  return favorites.split(",");
};

export const ToggleFavorite = (addr) => {
  addr = fromXdcAddress(addr).toLowerCase();
  let favorites = localStorage.getItem(ns) || "";
  if (!_.isEmpty(favorites)) {
    favorites = favorites.split(",");

    if (favorites.includes(addr)) return RemoveFavorite(addr);
    else return AddFavorite(addr);
  }
  return AddFavorite(addr);
};

export const AddFavorite = (addr) => {
  addr = fromXdcAddress(addr).toLowerCase();
  let favorites = localStorage.getItem(ns) || "";
  if (!_.isEmpty(favorites)) {
    if (favorites.includes(addr)) return favorites.split(",");
  }

  favorites = favorites.split(",");

  favorites.push(addr);
  localStorage.setItem(ns, favorites.join(","));
  return favorites;
};

export const RemoveFavorite = (addr) => {
  addr = fromXdcAddress(addr).toLowerCase();
  let favorites = localStorage.getItem(ns) || "";
  if (_.isEmpty(favorites)) return favorites.split(",");
  favorites = favorites.split(",");
  const index = getIndex(addr);

  favorites = removeFromArray(favorites, index);
  localStorage.setItem(ns, favorites.join(","));
  return favorites;
};

const removeFromArray = (arr, index) => {
  arr[index] = arr[arr.length - 1];
  delete arr[arr.length - 1];
  arr.length--;
  return arr;
};

const getIndex = (addr) => {
  addr = fromXdcAddress(addr).toLowerCase();
  let favorites = localStorage.getItem(ns) || "";
  if (_.isEmpty(favorites)) return -1;
  favorites = favorites.split(",");
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i] === addr) return i;
  }
  return -1;
};
