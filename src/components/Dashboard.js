import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AxiosInstance, RemoveExpo } from "../helpers/constant";
import { toXdcAddress } from "../wallets/xinpay";
import { LOADER_BOX } from "./common/common";
import { AnimatedNumberCard } from "./common/NumberCard";
import { fromWei } from "xdc3-utils";

const intialState = {
  data: null,
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = intialState;
  }

  componentDidMount() {
    AxiosInstance.get("/get-contract-data")
      .then((resp) => {
        this.setState({ data: resp.data.data });
      })
      .catch(console.error);
  }

  renderCards() {
    if (!this.state.data)
      return <Col className="u-text-center">{LOADER_BOX}</Col>;

    const {
      stakeHolders = [],
      totalStaked,
      interest,
      interestPrecision,
      totalRedeemed,
    } = this.state.data;

    return (
      <>
        <Col>
          <AnimatedNumberCard
            title={"Total Farm Nodes"}
            color={"red"}
            number={Object.keys(stakeHolders).length}
          />
        </Col>

        <Col>
          <AnimatedNumberCard
            title={"Total SRX Staked"}
            color={"green"}
            number={fromWei(RemoveExpo(totalStaked))}
          />
        </Col>

        <Col>
          <AnimatedNumberCard
            title={"Rewards PA"}
            color={"blue"}
            number={parseFloat(interest) / parseFloat(interestPrecision) + " %"}
          />
        </Col>

        <Col>
          <AnimatedNumberCard
            title={"Rewards Redeemed"}
            color={"orange"}
            number={fromWei(RemoveExpo(totalRedeemed))}
          />
        </Col>
      </>
    );
  }

  renderFarmerNode() {
    if (!this.state.data)
      return <Col className="u-text-center">{LOADER_BOX}</Col>;
    const rows = Object.keys(this.state.data.stakeHolders || []).map(
      (address) => (
        <tr>
          <td>{toXdcAddress(address)}</td>
          <td>
            {this.state.data.stakeHolders &&
              fromWei(this.state.data.stakeHolders[address].stake.stakedAmount)}
          </td>
          <td>
            {this.state.data.stakeHolders &&
              this.state.data.stakeHolders[address].reputation}
          </td>
        </tr>
      )
    );

    return (
      <Col className="farmer-node">
        <table>
          <thead>
            <tr>
              <th>Farmer Node Address</th>
              <th>Staked Amount</th>
              <th>Node Reputation</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </table>
      </Col>
    );
  }

  render() {
    return (
      <div className="dashboard component-panel">
        <Container>
          <Row>{this.renderCards()}</Row>
          <Row>{this.renderFarmerNode()}</Row>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
