import _ from "lodash";
import { fromWei } from "xdc3-utils";
import { RemoveExpo } from "./constant";

export const XDC_DECIMAL = 2;

export const SRX_DECIMAL = 2;

export const FormatNumber = (x) => parseFloat(x).toLocaleString();

export const FormatToken = (x) => {
  x = parseFloat(x).toFixed(0);
  console.log(x, parseFloat(fromWei(RemoveExpo(x))).toFixed(2));
  return _.isNumber(parseFloat(x))
    ? parseFloat(fromWei(RemoveExpo(x))).toFixed(2)
    : 0;
};