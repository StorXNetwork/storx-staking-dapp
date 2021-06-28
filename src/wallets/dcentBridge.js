import DcentWebConnector from "dcent-web-connector";

import { GetRevertReason } from "../helpers/crypto";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  HTTP_PROVIDER,
  LOADERS,
} from "../helpers/constant";

import * as actions from "../actions";
import store from "../redux/store";
import { toast } from "react-toastify";

// DcentWebConnector.info()
//   .then((x) => {
//     console.log("DcentWebConnector", x);
//   })
//   .catch((e) => {
//     console.log("DcentWebConnector", e);
//   });

export const initListener = () => {
  DcentWebConnector.setConnectionListener(connectionListener);
};

function connectionListener(state) {
  if (state === DcentWebConnector.state.CONNECTED) {
  } else if (state === DcentWebConnector.state.DISCONNECTED) {
  }
}
