import React from "react";
import { fromWei, toXdcAddress } from "xdc3-utils";

import { DateStringFormat, DECIMALS, RemoveExpo } from "../../helpers/constant";
import { FormatNumber, FormatToken } from "../../helpers/decimal";
import { LOADER_BOX } from "../common/common";
import Timer from "../common/Timer";

function GetStatusPill(status) {
  if (status) {
    return (
      <span className="badge badge-success badge-pill u-uppercase">
        {`${status}`}
      </span>
    );
  }
  return (
    <span className="badge badge-danger badge-pill u-uppercase">
      {" "}
      {`${status}`}
    </span>
  );
}

export function InfoCard({ data, getStakeDetail }) {
  const staked = data.stake ? GetStatusPill(data.stake.staked) : LOADER_BOX;
  const stakedAmount = data.stake
    ? FormatToken(data.stake.stakedAmount)
    : LOADER_BOX;
  const earned = data.stake ? FormatToken(data.stake.earned) : LOADER_BOX;
  const totalRedeemed = data.stake
    ? FormatToken(data.stake.totalRedeemed)
    : LOADER_BOX;
  const lastRedeemedAt = data.stake
    ? DateStringFormat(data.stake.lastRedeemedAt * 1000)
    : LOADER_BOX;
  const nextDripAt = data.stake ? (
    <Timer endDate={new Date(Date.now() - 10000)} cb={getStakeDetail} />
  ) : (
    LOADER_BOX
  );

  return (
    <>
      <div className="stats-box p-4">
        <h5 className="mb-2">Stake Details</h5>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Staked {staked}
          </li>

          {data.stake && data.stake.staked ? (
            <>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Staked Amount <span className="">{stakedAmount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Current Earnings <span className="">{earned}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Rewards Redeemed<span className="">{totalRedeemed}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Last Rewards <span className="">{lastRedeemedAt}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Next Rewards <span className="">{nextDripAt}</span>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}

export function InfoHeader({
  stakingData,
  wallet,
  reputation,
  stakeValid,
  stakeValidClass,
}) {
  return (
    <>
      <div className="row mb-3">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="stats-box p-4">
            <h5>
              {wallet ? (
                <>
                  Wallet:{" "}
                  <span className="walletAddress">{toXdcAddress(wallet)}</span>
                </>
              ) : (
                LOADER_BOX
              )}
            </h5>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 mb-3">
          <div className="stats-box p-4">
            <div className="row staking-counter">
              <div className="col ver-divider safari-float-left">
                <div className="media align-items-center">
                  <div className="media-body text-center">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-1">
                      Minimum
                      <br />
                      Reputation
                    </h2>
                    <p>
                      <span className="counter">
                        {stakingData
                          ? FormatNumber(stakingData.reputationThreshold)
                          : LOADER_BOX}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col ver-divider safari-float-left">
                <div className="media align-items-center">
                  <div className="media-body text-center">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-1">
                      Minimum
                      <br />
                      Stake Amount
                    </h2>
                    <p>
                      <span className="counter">
                        {stakingData
                          ? FormatNumber(
                              fromWei(
                                RemoveExpo(stakingData.minStakeAmount + "")
                              )
                            )
                          : LOADER_BOX}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col ver-divider safari-float-left">
                <div className="media align-items-center">
                  <div className="media-body text-center">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-1">
                      Maximum
                      <br />
                      Stake Amount
                    </h2>
                    <p>
                      <span className="counter">
                        {stakingData
                          ? FormatNumber(
                              fromWei(RemoveExpo(stakingData.maxStakeAmount))
                            )
                          : LOADER_BOX}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col ver-divider safari-float-left">
                <div className="media align-items-center">
                  <div className="media-body text-center">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-1">
                      Current
                      <br />
                      Reputation
                    </h2>
                    <p>
                      <span className="counter">
                        {reputation ? reputation : LOADER_BOX}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col ver-divider safari-float-left">
                <div className="media align-items-center">
                  <div className="media-body text-center">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-1">
                      Hosting
                      <br />
                      Rewards
                    </h2>
                    <p>
                      <span className="counter">
                        {stakingData
                          ? FormatNumber(
                              fromWei(
                                RemoveExpo(stakingData.hostingCompensation)
                              )
                            )
                          : LOADER_BOX}
                      </span>{" "}
                      SRX P.A
                    </p>
                  </div>
                </div>
              </div>
              <div className="col ver-divider safari-float-left">
                <div className="media align-items-center">
                  <div className="media-body text-center">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-1">
                      Farmer Node
                      <br />
                      Status
                    </h2>
                    <p className={stakeValidClass}>
                      {stakeValid ? stakeValid : LOADER_BOX}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
