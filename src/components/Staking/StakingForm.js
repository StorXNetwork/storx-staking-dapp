import React from "react";
import { fromWei, toWei } from "xdc3-utils";

import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { CONTRACT_ADDRESS } from "../../helpers/constant";
import { FormatNumber } from "../../helpers/decimal";
import { SubmitContractTxGeneral } from "../../wallets";
import { LOADER_BOX } from "../common/common";
import Timer from "../common/Timer";

const InitialState = {
  form: {
    amount: 0,
  },
  showModal: false,
};
class StakingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = InitialState;

    this.stake = this.stake.bind(this);
    this.unstake = this.unstake.bind(this);
    this.approveAmount = this.approveAmount.bind(this);
    this.withdrawStake = this.withdrawStake.bind(this);
  }

  stake() {
    SubmitContractTxGeneral(
      "stake",
      { type: "staking" },
      "nonpayable",
      toWei(this.state.form.amount)
    )
      .then(() => this.props.getStakeDetail())
      .catch();
  }

  approveAmount() {
    SubmitContractTxGeneral(
      "approve",
      { type: "storx" },
      "nonpayable",
      CONTRACT_ADDRESS.staking,
      toWei(this.state.form.amount)
    )
      .then(() => this.props.getStakeDetail())
      .catch();
  }

  unstake() {
    SubmitContractTxGeneral("unstake", { type: "staking" }, "nonpayable")
      .then(() => this.props.getStakeDetail())
      .catch();
  }

  withdrawStake() {
    SubmitContractTxGeneral("withdrawStake", { type: "staking" }, "nonpayable")
      .then(() => this.props.getStakeDetail())
      .catch();
  }

  renderStakingFunc() {
    const stake = this.props.stake;
    const approvedAmount = FormatNumber(this.props.approvedAmount);

    if (!stake)
      return (
        <div
          className="stats-box p-4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {LOADER_BOX}
        </div>
      );

    if (!stake.staked && !stake.unstaked)
      return (
        <div className="stats-box stake-card">
          <h5 className="title">Stake</h5>
          <div className="stake-body">
            <ul className="list-group mb-2">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Approved Amount <span className="">{approvedAmount}</span>
              </li>
            </ul>
            <label className="form-label">Staking Amount</label>
            <input
                type="number"
                className="form-control"
                placeholder="Enter Staking Amount"
                value={this.state.form.amount}
                onChange={(e) =>
                    this.setState({ form: { amount: e.target.value } })
                }
            />
            <div className="mt-2">
              {parseFloat(this.props.approvedAmount) >=
              parseFloat(this.state.form.amount) ? (
                  <button onClick={this.stake} className="btn btn-rounded btn-info">
                    Stake
                  </button>
              ) : (
                  <button
                      onClick={this.approveAmount}
                      className="btn btn-rounded btn-warning"
                  >
                    Approve
                  </button>
              )}
            </div>
          </div>
        </div>
      );

    if (stake.staked)
      return (
        <div className="stats-box mh-175 p-4">
          <h5 className="mb-2">Unstake</h5>
          <Container>
            <Row>
              <Col className="u-text-center vh-align-center">
                <Button
                  onClick={() => this.setState({ showModal: true })}
                  variant="danger"
                >
                  UNSTAKE
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      );

    if (stake.unstaked && stake.canWithdrawStakeIn)
      return (
        <div className="stats-box p-3">
          <h5 className="mb-2">Claim Pending</h5>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Can Claim In{" "}
              <span className="">
                <Timer
                  endDate={
                    Date.now() + parseFloat(stake.canWithdrawStakeIn) * 1000
                  }
                />
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Amount{" "}
              <span className="">
                {FormatNumber(fromWei(stake.stakedAmount))}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Pending Earnings{" "}
              <span className="">{FormatNumber(fromWei(stake.balance))}</span>
            </li>
          </ul>
          <div className="text-center mt-3">
            <button
              onClick={this.withdrawStake}
              disabled={parseFloat(stake.canWithdrawStakeIn) !== 0}
              href="claim-stake.html"
              className="btn btn-rounded btn-info"
            >
              Claim Stake
            </button>
          </div>
        </div>
      );
  }

  render() {
    return (
      <>
        {this.renderStakingFunc()}
        <Modal
          centered={true}
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header>
            <h4>Confirm</h4>
          </Modal.Header>
          <Modal.Body>
            On unstaking you will no longer receive rewards.
            <br /> The current rewards & the staked amount will become
            redeemable after a cool-off period of 7 days.
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.setState({ showModal: false })}
              variant="secondary"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                this.setState({ showModal: false }, () => {
                  this.unstake();
                });
              }}
              variant="primary"
            >
              Unstake
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default StakingForm;
