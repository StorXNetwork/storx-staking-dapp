import _ from "lodash";
import axios from "axios";

import StorX from "../abi/StorX.json";
import ReputationFeed from "../abi/ReputationFeed.json";

export const PROJECT_NAME = "StorX Staking";

export const LOADERS = {
  Xinpay: "xinpay",
  Keystore: "keystore",
  Privatekey: "privatekey",
  MetaMask: "metamask",
};

export const GetDefaultLoader = () =>
  localStorage.getItem("default-loader") || null;
export const GetDefaultPath = () =>
  localStorage.getItem("default-path") || null;
export const SetDefaultLoader = (loader) =>
  localStorage.setItem("deafult-loader", loader);
export const SetDefaultPath = (path) =>
  localStorage.setItem("deafult-path", path);

export const SubPath = "/";

export const RemoveExpo = (x) => {
  var data = String(x).split(/[eE]/);
  if (data.length === 1) return data[0];

  var z = "",
    sign = x < 0 ? "-" : "",
    str = data[0].replace(".", ""),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += "0";
    return z + str.replace(/^\-/, "");
  }
  mag -= str.length;
  while (mag--) z += "0";
  return str + z;
};

export const CONTRACT_ADDRESS = {
  storx: "xdc3db3715985a9891e7b41c2c2dc3f740d1d831d8a", //
  reputation: "xdcb1b4218ad6a2df75bf07cfddf7732915911dd1b4", //
};

export const CONTRACT_ABI = {
  storx: StorX,
  reputationFeed: ReputationFeed,
};

/**
 * @constant VALID_CHAINS  correct chain id, in decimal
 */
// export const VALID_CHAINS = [50, 51];
export const VALID_CHAINS = [51];

export const NETWORK_NAME = {
  50: "XinFin",
  51: "Apothem",
};

export const CHAIN_DATA = {
  50: "https://explorer.xinfin.network",
  51: "https://explorer.apothem.network",
};

export const HTTP_PROVIDER = {
  50: "https://rpc.xinfin.network",
  51: "https://rpc.apothem.network",
};

export const DEFAULT_CHAIN_ID = 51;
export const DEFAULT_PROVIDER = HTTP_PROVIDER[VALID_CHAINS[0]];

export const REPUTATION_FEED_API = "http://localhost:3000";

export const AxiosInstance = axios.create({
  baseURL: REPUTATION_FEED_API,
});

export const WS_PROVIDER = {};

export const ObjToArr = (obj) => Object.keys(obj).map((key) => obj[key]);

export const FilterStructResp = (obj) =>
  Object.keys(obj)
    .filter((e, i) => {
      if (i < Object.keys(obj).length / 2) return false;
      return true;
    })
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

export const IsHex = (n) => {
  const re = /[0-9A-Fa-f]{6}/g;

  if (re.test(n)) {
    return true;
  } else {
    return false;
  }
};

export const GetTimerData = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  const sec = Math.floor(((seconds % 86400) % 3600) % 60);
  return { days, hours, minutes, seconds: sec };
};

export const FormatSeconds = (seconds) => {
  const { days, hours, minutes, seconds: sec } = GetTimerData(seconds);
  return (
    <span className="timer">
      <span className="days">{days}</span>:
      <span className="hours">{hours}</span>:
      <span className="minutes">{minutes}</span>::
      <span className="seconds">{sec}</span>
    </span>
  );
};

export const AddMultiplier = (amount) => {
  const multiplier = Math.pow(10, 18);

  return RemoveExpo(parseFloat(amount) * multiplier);
};

export const RemoveMultiplier = (amount) => {
  const multiplier = Math.pow(10, 18);

  return parseFloat(amount) / multiplier;
};

export const TIMER_FORMAT = "DD:HH:MM::SS";

export const IsJson = (abi) => {
  try {
    JSON.parse(abi);
  } catch (e) {
    return false;
  }
  return true;
};

export const Random = (min, max) => {
  return min + Math.random() * (max - min);
};

export const RandomInt = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};

export const IsJsonRpcError = (err) => {
  return err.message.split("\n")[0] === "Internal JSON-RPC error.";
};

export const EXPLORER = "https://explorer.xinfin.network/";

export const DateStringFormat = (date) => {
  date = new Date(date);
  if (_.isDate(date))
    return `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return date;
};

Object.defineProperty(Object.prototype, "partialMatch", {
  value: function (fields) {
    for (let key of Object.keys(fields)) {
      if (Object.keys(this).includes(key)) {
        if (this[key] === fields[key]) continue;
        return false;
      } else {
        return false;
      }
    }
    return true;
  },
});

Object.defineProperty(Array.prototype, "includesPartial", {
  value: function (fields) {
    for (let i = 0; i < this.length; i++) {
      const obj = this[i];
      console.log("objobj", obj);
      if (obj.partialMatch(fields)) {
        return i;
      }
    }
    return null;
  },
});
