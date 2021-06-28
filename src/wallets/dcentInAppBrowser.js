import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import _ from "lodash";

import { CONTRACT_ABI, CONTRACT_ADDRESS, LOADERS } from "../helpers/constant";

import * as actions from "../actions";
import store from "../redux/store";
import { toast } from "react-toastify";

let addresses, web3;

export const DcentSupported = () => {
  return window.ethereum && window.ethereum.isDcentWallet === true;
};

export const GetChainId = () => {
  return window.ethereum.request({ method: "net_version" });
};

export async function GetProvider() {
  const provider = await detectEthereumProvider();
  return provider;
}

export const initDcent = async () => {
  try {
    const isSupported = DcentSupported();
    if (!isSupported) {
      toast(
        "Browser doesn't support DCent wallet, please open in In-App Browser of DCent"
      );
      return store.dispatch(actions.WalletDisconnected());
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(await GetProvider());
    _initListerner();
    const chain_id = await web3.eth.getChainId();
    const accounts = await web3.eth.getAccounts();
    console.log("chain_id", chain_id, accounts);
    return store.dispatch(
      actions.WalletConnected({
        address: accounts[0],
        chain_id,
        loader: LOADERS.MetaMask,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export function _initListerner() {
  window.ethereum.removeAllListeners();

  window.ethereum.on("accountsChanged", async (data) => {
    const accounts = await web3.eth.getAccounts();
    addresses = accounts;
    store.dispatch(actions.AccountChanged(accounts[0]));
  });

  window.ethereum.on("chainChanged", async (data) => {
    const chain_id = await web3.eth.getChainId();
    store.dispatch(actions.NetworkChanged(chain_id));
  });

  window.ethereum.on("connect", async (data) => {
    web3 = new Web3(await GetProvider());
    const accounts = await web3.eth.getAccounts();
    const chain_id = await web3.eth.getChainId();
    addresses = accounts;
    return store.dispatch(
      actions.WalletConnected({
        address: accounts[0],
        chain_id,
        loader: LOADERS.MetaMask,
      })
    );
  });

  window.ethereum.on("disconnect", (data) => {
    console.log("disconnect", data);
    return store.dispatch(actions.WalletDisconnected());
  });

  window.ethereum.on("message", (data) => {
    console.log("message", data);
  });
}

export async function SubmitContractTxGeneral(
  method,
  { type },
  stateMutability,
  ...params
) {
  try {
    const web3 = new Web3(await GetProvider());

    const { address, abi } = getContractAddress(type);

    const contract = new web3.eth.Contract(abi, address);

    if (stateMutability === "view") {
      const resp = await contract.methods[method](...params).call();

      return resp;
    } else if (stateMutability === "payable") {
      const [value] = params.splice(params.length - 1, 1);
      const gasLimit = await contract.methods[method](...params).estimateGas({
        from: addresses[0],
      });
      const resp = await contract.methods[method](...params).send({
        from: addresses[0],
        gas: gasLimit,
        value: value,
      });

      return resp;
    } else {
      const gasLimit = await contract.methods[method](...params).estimateGas({
        from: addresses[0],
      });
      const resp = await contract.methods[method](...params).send({
        from: addresses[0],
        gas: gasLimit,
      });

      return resp;
    }
  } catch (e) {
    console.log("resp", IsJsonRpcError(e));
    console.log("resp", e);
    throw e;
  }
}

export const IsJsonRpcError = (err) => {
  return err.message.split("\n")[0] === "Internal JSON-RPC error.";
};

function getContractAddress(type) {
  return {
    address: CONTRACT_ADDRESS[type],
    abi: CONTRACT_ABI[type],
  };
}
