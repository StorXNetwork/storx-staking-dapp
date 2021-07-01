import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { fromWei, toWei } from "xdc3-utils";

import { SubmitContractTxGeneral } from "../wallets";
import { toXdcAddress } from "../wallets/xinpay";
import { LOADER_BOX } from "./common/common";
import {
  AxiosInstance,
  CONTRACT_ADDRESS,
  DateStringFormat,
  RemoveExpo,
} from "../helpers/constant";
import Timer from "./common/Timer";

const InitialState = {
  stake: null,
  loaded: false,
  approvedAmount: 0,
  form: {
    amount: null,
  },
  stakingData: null,
};

class Staking extends React.Component {
  constructor(props) {
    super(props);

    this.stake = this.stake.bind(this);
    this.unstake = this.unstake.bind(this);
    this.approveAmount = this.approveAmount.bind(this);
    this.withdrawStake = this.withdrawStake.bind(this);

    this.state = InitialState;
  }

  componentDidMount() {
    this.getStakeDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wallet.address !== this.props.wallet.address)
      this.getStakeDetail();
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
    ]).then(
      ([
        x,
        earned,
        nextDripAt,
        approvedAmount,
        stakingData,
        isStaker,
        reputation,
      ]) => {
        console.log("stakingData", stakingData);

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
                console.log("canWithdrawStakeIn", x);
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
    );
  }

  stake() {
    SubmitContractTxGeneral(
      "stake",
      { type: "staking" },
      "nonpayable",
      toWei(this.state.form.amount)
    ).then(() => this.getStakeDetail());
  }

  approveAmount() {
    SubmitContractTxGeneral(
      "approve",
      { type: "storx" },
      "nonpayable",
      CONTRACT_ADDRESS.staking,
      toWei(this.state.form.amount)
    ).then(() => this.getStakeDetail());
  }

  unstake() {
    SubmitContractTxGeneral("unstake", { type: "staking" }, "nonpayable").then(
      () => this.getStakeDetail()
    );
  }

  withdrawStake() {
    SubmitContractTxGeneral(
      "withdrawStake",
      { type: "staking" },
      "nonpayable"
    ).then(() => this.getStakeDetail());
  }

  renderStakeDetails() {
    if (!this.props.wallet.connected) return LOADER_BOX;
    if (!this.state.loaded) return LOADER_BOX;

    const stake = this.state.stake;

    return (
      <div className="stake-details">
        <div className="stake-details__title">Stake Details</div>
        <Container>
          <Row>
            <Col>Staked</Col>
            <Col>{`${stake.staked}`}</Col>
          </Row>
          {stake.staked ? (
            <Row>
              <Col>Rewards</Col>
              <Col>{fromWei(stake.earned)}</Col>
            </Row>
          ) : (
            <></>
          )}

          <Row>
            <Col>Staked Amount</Col>
            <Col>{fromWei(stake.stakedAmount)}</Col>
          </Row>

          <Row>
            <Col>Total Rewards</Col>
            <Col>{fromWei(stake.totalRedeemed)}</Col>
          </Row>
          <Row>
            <Col>Last Rewards</Col>
            <Col>{DateStringFormat(stake.lastRedeemedAt * 1000)}</Col>
          </Row>
          {stake.staked ? (
            <Row>
              <Col>Next Rewards</Col>
              <Col>{<Timer endDate={stake.nextDripAt * 1000} />}</Col>
            </Row>
          ) : (
            <></>
          )}
        </Container>
      </div>
    );
  }

  renderStakingFunc() {
    if (!this.props.wallet.connected) return LOADER_BOX;
    if (!this.state.loaded) return LOADER_BOX;

    const stake = this.state.stake;

    if (!stake.staked && !stake.unstaked)
      return (
        <div className="staking-func">
          <div className="staking-func__title">Stake</div>
          <Container>
            <Row>
              <Col>Approved Amount</Col>
              <Col>{`${this.state.approvedAmount}`}</Col>
            </Row>
            <Row>
              <Col>Enter Amount</Col>
              <Col>
                <input
                  value={this.state.form.amount}
                  onChange={(e) =>
                    this.setState({ form: { amount: e.target.value } })
                  }
                />
              </Col>
            </Row>

            {this.state.approvedAmount >= this.state.form.amount ? (
              <Row>
                <Col className="u-text-center">
                  <Button onClick={this.stake} variant="primary">
                    STAKE
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col className="u-text-center">
                  <Button onClick={this.approveAmount} variant="warning">
                    Approve
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      );

    if (stake.staked)
      return (
        <div className="staking-func">
          <div className="staking-func__title">Unstake</div>
          <Container>
            <Row>
              <Col className="u-text-center">
                <Button onClick={this.unstake} variant="danger">
                  UNSTAKE
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      );

    if (stake.unstaked && stake.canWithdrawStakeIn)
      return (
        <div className="staking-func">
          <div className="staking-func__title">Claim Pending</div>
          <Container>
            <Row>
              <Col>Can Claim In</Col>
              <Col>
                <Timer
                  endDate={
                    Date.now() + parseFloat(stake.canWithdrawStakeIn) * 1000
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col>Amount</Col>
              <Col>{fromWei(stake.stakedAmount)}</Col>
            </Row>
            <Row>
              <Col>Pending Earnings</Col>
              <Col>{fromWei(stake.balance)}</Col>
            </Row>
            <Row>
              <Col className="u-text-center">
                <Button
                  variant="danger"
                  onClick={this.withdrawStake}
                  disabled={parseFloat(stake.canWithdrawStakeIn) !== 0}
                >
                  CLAIM STAKE
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }

  render() {
    return (
      <div className="staking component-panel">
        <Container>
          <Row>
            <Col>
              <div className="loaded-address">
                <span className="loaded-address__label">Wallet</span>
                <span className="loaded-address__address">
                  {toXdcAddress(this.props.wallet.address)}
                </span>
              </div>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <div className="loaded-address">
                <Container>
                  <Row>
                    <Col>
                      <span className="loaded-address__label">
                        Minimum Reputation
                      </span>
                      <span className="loaded-address__address">
                        {this.state.stakingData
                          ? this.state.stakingData.reputationThreshold
                          : LOADER_BOX}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="loaded-address__label">
                        Minimum Stake Amount
                      </span>
                      <span className="loaded-address__address">
                        {this.state.stakingData
                          ? fromWei(
                              RemoveExpo(this.state.stakingData.minStakeAmount)
                            )
                          : LOADER_BOX}{" "}
                      </span>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <span className="loaded-address__label">
                        Maximum Stake Amount
                      </span>
                      <span className="loaded-address__address">
                        {this.state.stakingData
                          ? fromWei(
                              RemoveExpo(this.state.stakingData.maxStakeAmount)
                            )
                          : LOADER_BOX}{" "}
                      </span>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
            <Col>
              <div className="loaded-address">
                <Container>
                  <Row>
                    <Col>
                      <span className="loaded-address__label">
                        Current Reputation
                      </span>
                      <span className="loaded-address__address">
                        {this.state.isStaker
                          ? this.state.reputation
                          : "NOT A STAKER"}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="loaded-address__label">
                        Farmer Node Valid
                      </span>
                      <span className="loaded-address__address">
                        {this.state.stakingData
                          ? this.state.isStaker
                            ? (
                                this.state.reputation >
                                this.state.stakingData.reputationThreshold
                              )
                                .toString()
                                .toUpperCase()
                            : "NOT A STAKER"
                          : LOADER_BOX}
                      </span>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>{this.renderStakeDetails()}</Col>
            <Col>{this.renderStakingFunc()}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ wallet }) {
  return { wallet };
}

export default connect(mapStateToProps)(Staking);
