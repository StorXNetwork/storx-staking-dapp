import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fromWei } from "xdc3-utils";

import { Navbar, Col } from "react-bootstrap";

import BalanceModal from "./common/BalanceModal";

import WalletConnect from "./wallet-connect/walletConnect";

import BrandLogo from "../assets/img/brand/header-logo.png";

class Header extends React.Component {
  renderCurrentAddressBox() {
    if (this.props.wallet.connected === false) return "Not Connected";

    if (!this.props.balance) return "Loading";

    const balances = ["native"];

    const resp = Object.keys(this.props.balance).reduce((acc, curr) => {
      if (balances.includes(curr)) {
        acc.push({ name: curr, balance: this.props.balance[curr] });
      }
      return acc;
    }, []);

    return (
      <>
        <Col lg={12} sm={12} md={12}>
          <BalanceModal data={[...resp]} />
        </Col>
      </>
    );
  }

  getWalletBtn() {
    let btnName = "CONNECT",
      disabled = false,
      balance = "",
      variant = "primary";

    if (this.props.wallet.connected && this.props.wallet.valid_network) {
      btnName = "WALLET CONNECTED";
      disabled = true;
    } else if (
      this.props.wallet.connected &&
      !this.props.wallet.valid_network
    ) {
      btnName = "INCORRECT NETWORK";
      disabled = true;
      variant = "danger";
    }

    if (this.props.wallet.connected !== false && this.props.balance) {
      const balances = ["native", "tokens"];

      console.log("this.props.balance", this.props.balance);

      const resp = Object.keys(this.props.balance).reduce((acc, curr) => {
        if (balances.includes(curr)) {
          acc.push({
            name: curr,
            balance: fromWei(this.props.balance[curr]),
          });
        }
        return acc;
      }, []);

      balance = (
        <div>
          <BalanceModal data={[...resp]} />
        </div>
      );
      // balance = (
      //   <Link className="balance-link" to="/wallet-page">
      //     <FontAwesomeIcon icon={faWallet} />
      //   </Link>
      // );
    }

    return (
      <>
        <div className="ml-auto header-btn">
          {balance}
          <WalletConnect
            variant={variant}
            disabled={disabled}
            btnName={btnName}
          />
        </div>
      </>
    );
  }

  render() {
    return (
      <Navbar className="custom-header" bg="light" expand="lg">
        <Link className="navbar-brand" to="/">
          <img src={BrandLogo} alt={"logo"} />
        </Link>

        <b>IN BETA STAGE</b>

        <div className="navbar-seperator"></div>

        <Link className="navbar-link" to="/">
          Home
        </Link>

        <Link className="navbar-link" to="/staking">
          Staking
        </Link>

        {this.getWalletBtn()}
      </Navbar>
    );
  }
}

function mapStateToProps({ wallet, balance }) {
  return { wallet, balance };
}

export default connect(mapStateToProps)(Header);
