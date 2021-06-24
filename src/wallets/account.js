import Xdc3 from "xdc3";

import _ from "lodash";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  DEFAULT_PROVIDER,
} from "../helpers/constant";

import store from "../redux/store";
import { GetRevertReason } from "../helpers/crypto";

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

      const state = store.getState();
      const { address: walletAddress, privateKey } = state.wallet;

      const tx = {
        from: walletAddress.toLowerCase(),
        to: address,
        data,
        value,
      };

      let gasLimit;

      try {
        gasLimit = await xdc3.eth.estimateGas(tx);
      } catch (e) {
        const reason = await GetRevertReason(tx);
        reject({ message: reason });
        return;
      }

      tx["gas"] = gasLimit;

      const signed = await xdc3.eth.accounts.signTransaction(tx, privateKey);
      xdc3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("receipt", (receipt) => {
          if (receipt !== null) {
            if (receipt.status) {
              resolve(receipt);
            } else {
              reject(receipt);
            }
          }
        });

      // })
      // .catch(reject);
    } else {

      const data = contract.methods[method](...params).encodeABI();

      const state = store.getState();
      const { address: walletAddress, privateKey } = state.wallet;

      const tx = {
        from: walletAddress.toLowerCase(),
        to: address,
        data,
      };

      let gasLimit;

      try {
        gasLimit = await xdc3.eth.estimateGas(tx);
      } catch (e) {
        const reason = await GetRevertReason(tx);
        reject({ message: reason });
        return;
      }

      tx["gas"] = gasLimit;

      const signed = await xdc3.eth.accounts.signTransaction(tx, privateKey);
      xdc3.eth
        .sendSignedTransaction(signed.rawTransaction)
        .once("receipt", (receipt) => {
          if (receipt !== null) {
            if (receipt.status) {
              resolve(receipt);
            } else {
              reject(receipt);
            }
          }
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
