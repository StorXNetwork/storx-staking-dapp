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
} from "../../helpers/constant";
import { toXdcAddress } from "../../wallets/xinpay";

import { InitStackableTable } from "../../helpers/responsive";

import Presentation from "./Presentation";
import { LOADER_BOX } from "../common/common";



class TxHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      loading: false,
    };

    this.initialized = false;
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    // console.log(
    //   "account change",
    //   !_.isEqual(prevProps.wallet, this.props.wallet),
    //   prevProps.wallet,
    //   this.props.wallet
    // );
    if (!_.isEqual(prevProps.wallet, this.props.wallet)) {
      // fetch events
      this.getEvents();
    }
  }

  getEvents() {
    if (!this.props.wallet.address) return;
    this.setState({ loading: true });
    AxiosInstance.get(`/get-user-events/${this.props.wallet.address}`)
      .then((resp) => {
        const data = resp.data.data;
        this.setState({ events: data, loading: false }, () => {
          if (data.length > 0) {
            if (this.initialized !== true) {
              InitStackableTable();
              this.initialized = true;
            }
          } else {
            this.initialized = false;
          }
        });
      })
      .catch((e) => {
        // console.log(e);
        this.setState({ loading: false });
      });
  }

  render() {
    return <Presentation events={this.state.events} />;
  }
}

function mapStateToProps({ wallet }) {
  return { wallet };
}

export default connect(mapStateToProps)(TxHistory);
