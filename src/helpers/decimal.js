import _ from "lodash";
import { fromWei } from "xdc3-utils";
import { RemoveExpo } from "./constant";

export const XDC_DECIMAL = 2;

export const SRX_DECIMAL = 2;

export const FormatNumber = (x) => parseFloat(x).toLocaleString();

export const FormatToken = (x) => {
  try {
    x = parseFloat(x).toFixed(0);
    // console.log(x, parseFloat(fromWei(RemoveExpo(x))).toFixed(2));
    return _.isNumber(parseFloat(x))
      ? parseFloat(fromWei(RemoveExpo(x))).toFixed(2)
      : 0;
  } catch (e) {
    return "-";
  }
};

export const FormatTVL = (x) => {
  try {
    x = parseFloat(x).toFixed(0);
    if (x / 10 ** 9 > 1) return `${(x / 10 ** 9).toFixed(2)} B`;
    if (x / 10 ** 6 > 1) return `${(x / 10 ** 6).toFixed(2)} M`;
    if (x / 10 ** 3 > 1) return `${(x / 10 ** 3).toFixed(0)} K`;
    return x.toFixed(0);
  } catch (e) {
    return "-";
  }
};
