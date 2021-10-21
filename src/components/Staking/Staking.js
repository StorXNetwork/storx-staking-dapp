import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { fromWei, toWei } from "xdc3-utils";

import { SubmitContractTxGeneral } from "../../wallets";
import { LOADER_BOX } from "../common/common";
import {
  AxiosInstance,
  CONTRACT_ADDRESS,
  RemoveExpo,
} from "../../helpers/constant";
import { InfoHeader, InfoCard } from "./Presentational";
import StakingForm from "./StakingForm";

const InitialState = {
  stake: null,
  loaded: false,
  approvedAmount: 0,
  stakingData: null,
};

class Staking extends React.Component {
  constructor(props) {
    super(props);

    this.state = InitialState;

    this.getStakeDetail = this.getStakeDetail.bind(this);
    this.claimEarned = this.claimEarned.bind(this);
  }

  componentDidMount() {
    this.getStakeDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wallet.address !== this.props.wallet.address)
      this.getStakeDetail();
  }

  claimEarned() {
    if (!this.props.wallet.connected) return;
    SubmitContractTxGeneral(
      "claimEarned",
      { type: "staking" },
      "nonpayable",
      this.props.wallet.address
    )
      .then(console.log)
      .catch(console.log);
  }

  getStakeDetail() {
    if (!this.props.wallet.connected) return LOADER_BOX;

    Promise.all([
      SubmitContractTxGeneral(
        "stakes",
        { type: "staking" },
        "view",
        this.props.wallet.address
      ),
      SubmitContractTxGeneral(
        "earned",
        { type: "staking" },
        "view",
        this.props.wallet.address
      ),
      SubmitContractTxGeneral(
        "nextDripAt",
        { type: "staking" },
        "view",
        this.props.wallet.address
      ),
      SubmitContractTxGeneral(
        "allowance",
        { type: "storx" },
        "view",
        this.props.wallet.address,
        CONTRACT_ADDRESS.staking
      ),
      AxiosInstance.get("/get-contract-data"),
      SubmitContractTxGeneral(
        "isStaker",
        { type: "reputation" },
        "view",
        this.props.wallet.address
      ),
      SubmitContractTxGeneral(
        "reputations",
        { type: "reputation" },
        "view",
        this.props.wallet.address
      ),
    ])
      .then(
        ([
          x,
          earned,
          nextDripAt,
          approvedAmount,
          stakingData,
          isStaker,
          reputation,
        ]) => {
          const {
            exists,
            balance,
            lastRedeemedAt,
            unstakedTime,
            staked,
            totalRedeemed,
            stakerHolder,
            stakedAmount,
            stakedTime,
            unstaked,
            ...rst
          } = x;

          this.setState(
            {
              loaded: true,
              stake: {
                exists,
                balance,
                lastRedeemedAt,
                unstakedTime,
                staked,
                totalRedeemed,
                stakerHolder,
                stakedAmount,
                stakedTime,
                earned,
                nextDripAt,
                unstaked,
                ...rst,
              },
              approvedAmount: fromWei(RemoveExpo(approvedAmount)),
              stakingData: stakingData.data.data,
              isStaker,
              reputation,
            },
            () => {
              if (unstaked) {
                SubmitContractTxGeneral(
                  "canWithdrawStakeIn",
                  { type: "staking" },
                  "view",
                  this.props.wallet.address
                ).then((x) => {
                  // console.log("canWithdrawStakeIn", x);
                  this.setState({
                    stake: {
                      ...this.state.stake,
                      canWithdrawStakeIn: x,
                    },
                  });
                });
              }
            }
          );
        }
      )
      .catch();
  }

  render() {
    const reputation = this.state.isStaker
      ? this.state.reputation
      : "NOT A STAKER";

    let stakeValidClass =
      this.state.isStaker &&
      this.state.reputation >= this.state.stakingData.reputationThreshold
        ? "text-success"
        : "text-danger";

    const stakeValid = this.state.stakingData
      ? this.state.isStaker
        ? (this.state.reputation >= this.state.stakingData.reputationThreshold)
            .toString()
            .toUpperCase()
        : "NOT A STAKER"
      : LOADER_BOX;

    return (
      <>
        <section className="block-overlap pb-3">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="announcement">
                  <b>Note</b>: If you're facing issues with your reputation &
                  redeeming rewards please refer the thread{" "}
                  <a
                    href="https://twitter.com/StorXNetwork/status/1450885741962096641"
                    target="_blank"
                    className="blue"
                  >
                    here
                  </a>
                </div>
              </div>
            </div>

            <InfoHeader
              stakingData={this.state.stakingData}
              reputation={reputation}
              stakeValid={stakeValid}
              stakeValidClass={stakeValidClass}
              wallet={this.props.wallet.address}
            />
            <div className="row mb-3">
              <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                <InfoCard
                  data={this.state}
                  getStakeDetail={this.getStakeDetail}
                  claimRewards={this.claimEarned}
                />
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 mb-3">
                <StakingForm
                  stake={this.state.stake}
                  getStakeDetail={this.getStakeDetail}
                  approvedAmount={this.state.approvedAmount}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

function mapStateToProps({ wallet }) {
  return { wallet };
}

export default connect(mapStateToProps)(Staking);
