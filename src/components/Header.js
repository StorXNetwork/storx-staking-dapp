import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import BalanceModal from "./common/BalanceModal";
import WalletConnectModal from "./wallet-connect/walletConnect";

import LogoLight from "../assets/img/storx-logo-light.png";

import LogoDark from "../assets/img/storx-logo.png";
import { IsDark, Toggle } from "../helpers/theme";

import * as actions from "../actions";

const ToggleLight = (
  <span className="d-block-light">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </span>
);

const ToggleDark = (
  <span className="d-block-dark">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-sun"
    >
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  </span>
);

class Header extends React.Component {
  render() {
    const brandLogo = IsDark(this.props.theme) === true ? LogoLight : LogoDark;
    const themeToggle =
      IsDark(this.props.theme) === true ? ToggleLight : ToggleDark;

    return (
      <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-custom sticky">
          <div className="container">
            <Link className="logo" to="/">
              <img src={brandLogo} alt="SRX" />
            </Link>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto" id="mySidenav">
                <li className="nav-item button">
                  <Link className="btn nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item button">
                  <Link className="btn nav-link" to="/staking">
                    Staking
                  </Link>
                </li>
                <li className="nav-item button">
                  <Link className="btn nav-link" to="/tx-history">
                    TX History
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mobile-footer-block">
              <ul className="navbar-nav mobile-footer-nav">
                <li className="nav-item button">{<WalletConnectModal />}</li>
                <li className="nav-item button">
                  {
                    <BalanceModal
                      data={{
                        xdc: {
                          amount: this.props.balance.native || 100,
                          total:
                            parseFloat(this.props.balance.native) * 0.1 || 10,
                        },
                        srx: {
                          amount: this.props.balance.tokens || 10000,
                          total:
                            parseFloat(this.props.balance.tokens) * 0.1 || 1000,
                        },
                      }}
                      btn={
                        <div data-toggle="modal" className="btn nav-link">
                          Balance
                        </div>
                      }
                    />
                  }
                </li>
              </ul>
              <ul className="navbar-nav mobile-footer-nav">
                <li className="nav-item button">
                  <div className="themeSwitcher">
                    <button
                      id="theme-toggle"
                      className="btn btn-link btn-sm small theme-toggle"
                      type="button"
                      onClick={() =>
                        this.props.SetTheme(Toggle(this.props.theme))
                      }
                    >
                      {themeToggle}
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({ wallet, balance, theme }) {
  return { wallet, balance, theme };
}

export default connect(mapStateToProps, actions)(Header);
