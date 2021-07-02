import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";
import { isAddress, fromWei } from "xdc3-utils";

import {
  AxiosInstance,
  BUILD_BLOCK_LINK,
  BUILD_TX_LINK,
  EXPLORER,
  RemoveExpo,
} from "../helpers/constant";
import { toXdcAddress } from "../wallets/xinpay";

function formatValue(varName, value) {
  if (isAddress(value)) return toXdcAddress(value);
  if (["amount", "earnings", "principal"].includes(varName))
    return fromWei(RemoveExpo(value));
}

function renderReturnValues(returnValues) {
  return (
    <Container>
      {Object.keys(returnValues)
        .filter((x) => isNaN(x))
        .map((v, i) => (
          <Row key={i} style={{ textAlign: "left" }}>
            <Col lg={4}>{v}</Col>
            <Col lg={8}>{formatValue(v, returnValues[v])}</Col>
          </Row>
        ))}
    </Container>
  );
}

function RenderEvent(event, i) {
  return (
    <tr>
      <td>{i + 1}</td>
      <td>
        <a target="_blank" href={BUILD_BLOCK_LINK(EXPLORER, event.block)}>
          {event.block}
        </a>
      </td>
      <td>{event.name}</td>
      <td>
        <a target="_blank" href={BUILD_TX_LINK(EXPLORER, event.tx_hash)}>
          HASH LINK
        </a>
      </td>
      <td>{renderReturnValues(event.data)}</td>
    </tr>
  );
}

function RenderAllEvents(events) {
  if (events === null) return "";
  return (
    <table>
      <thead>
        <tr>
          <th>Sr.</th>
          <th>Block Number</th>
          <th>Name</th>
          <th>Link</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>{events.map((event, i) => RenderEvent(event, i))}</tbody>
    </table>
  );
}

class TxHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.wallet, this.props.wallet)) {
      // fetch events
      this.getEvents();
    }
  }

  getEvents() {
    if (!this.props.wallet.address) return;
    if (this.state.events !== null) return;
    this.setState({ loading: true });
    AxiosInstance.get(`/get-user-events/${this.props.wallet.address}`)
      .then((resp) => {
        const data = resp.data.data;
        this.setState({ events: data, loading: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
  }

  render() {
    console.log("events", this.state);
    return (
      <div className="component-panel event-history">
        <Container>
          <Row>
            <Col className="event-history__title">TX History</Col>
          </Row>

          <Row>
            <Col className="event-history__table">
              {RenderAllEvents(this.state.events)}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ wallet }) {
  return { wallet };
}

export default connect(mapStateToProps)(TxHistory);
