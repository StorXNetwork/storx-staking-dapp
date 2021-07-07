import _ from "lodash";

import * as types from "../actions/types";
import { AxiosInstance } from "../helpers/constant";
import { SubmitContractTxGeneral, GetNativeBalance } from "../wallets/index";

async function getAssets(store, address_) {
  try {
    const address = address_ || store.getState().wallet.address;

    if (_.isUndefined(address))
      store.dispatch({ type: types.WALLET_DISCONNECTED });

    const nativeBalance = await GetNativeBalance(address);

    const tokenBalance = await SubmitContractTxGeneral(
      "balanceOf",
      { type: "storx" },
      "view",
      address
    );

    const rates = (await AxiosInstance.get("/get-asset-price")).data.data;

    store.dispatch({
      type: types.WALLET_BALANCE_DATA,
      payload: {
        native: nativeBalance,
        nativeTotal: parseFloat(nativeBalance) * parseFloat(rates.XDCUSDT),
        tokens: tokenBalance,
        tokensTotal: parseFloat(tokenBalance) * parseFloat(rates.SRXUSDT),
      },
    });
  } catch (e) {}
}

export const GetWalletBalance = (store) => (next) => async (action) => {
  next(action);

  if (
    [
      types.WALLET_CONNECTED,
      types.WALLET_CHAIN_CHANGED,
      types.WALLET_ADDRESS_CHANGED,
      types.WALLET_OPENED,
    ].includes(action.type)
  ) {
    const { address } = action.payload;

    if (_.isUndefined(address))
      store.dispatch({ type: types.WALLET_DISCONNECTED });
    else {
      await getAssets(store, address);
    }
  } else if (action.type === types.GET_ASSETS) {
    await getAssets(store);
  }
};
