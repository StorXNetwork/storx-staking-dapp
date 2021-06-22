import Xdc3, { utils } from "xdc3";
import detectEthereumProvider from "@metamask/detect-provider";
import _ from "lodash";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  HTTP_PROVIDER,
  LOADERS,
  IsJsonRpcError,
  DEFAULT_PROVIDER,
} from "../helpers/constant";

import * as actions from "../actions";
import store from "../redux/store";
import { toast } from "react-toastify";

let addresses, xdc3, addressChangeIntervalRef;

/**
 *
 * directly deals with an account represented in an object from Xdc3 / Web3
 *
 */

/**
 *
 * const account = {address, privateKey}
 *
 *
 */

export async function init() {}

export async function SubmitContractTxGeneral(
  method,
  { type, address },
  stateMutability,
  ...params
) {
  return new Promise(async (resolve, reject) => {
    const data = store.getState();
    const { account } = data.wallet;
    if (!account) reject("Account not loaded");
    const { privateKey } = account;
    if (_.isEmpty(privateKey)) reject("Account not loaded");

    const xdc3 = new Xdc3(new Xdc3.providers.HttpProvider(DEFAULT_PROVIDER));

    const { abi, address: contractAddress } = getContractAddress(type);

    address = contractAddress;

    const contract = new xdc3.eth.Contract(abi, address);

    if (stateMutability === "view") {
      contract.methods[method](...params)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch(reject);
    } else if (stateMutability === "payable") {
      const [value] = params.splice(params.length - 1, 1);

      const data = contract.methods[method](...params).encodeABI();

      const tx = {
        from: addresses[0],
        to: address,
        data,
        value,
      };

      const gasLimit = await xdc3.eth.estimateGas(tx);

      tx["gas"] = gasLimit;

      xdc3.eth.sendTransaction(tx, (err, hash) => {
        if (err) reject(err);
        let interval = setInterval(async () => {
          const receipt = await xdc3.eth.getTransactionReceipt(hash);
          console.log("receipt", receipt);
          if (receipt !== null) {
            if (receipt.status) {
              clearInterval(interval);
              resolve(receipt);
            } else {
              reject(receipt);
            }
          }
        }, 2000);
      });
      // })
      // .catch(reject);
    } else {
      console.log("addresses[0]", addresses[0], method, params);

      const data = contract.methods[method](...params).encodeABI();

      const tx = {
        from: addresses[0],
        to: address,
        data,
      };

      await xdc3.eth.estimateGas(tx);

      xdc3.eth.sendTransaction(tx, (err, hash) => {
        if (err) reject(err);
        let interval = setInterval(async () => {
          const receipt = await xdc3.eth.getTransactionReceipt(hash);
          if (receipt !== null) {
            if (receipt.status) {
              clearInterval(interval);
              resolve(receipt);
            } else {
              reject(receipt);
            }
          }
        }, 2000);
      });
    }
  });
}

function getContractAddress(type) {
  return {
    address: CONTRACT_ADDRESS[type],
    abi: CONTRACT_ABI[type],
  };
}
