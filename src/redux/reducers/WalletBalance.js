import * as types from "../../actions/types";

const initialState = {};

const WalletBalance = (state = initialState, payload) => {
  switch (payload.type) {
    case types.WALLET_BALANCE_DATA: {
      // console.log("payload.payload", payload.payload);
      return { ...state, ...payload.payload };
    }

    default:
      return state;
  }
};

export default WalletBalance;
