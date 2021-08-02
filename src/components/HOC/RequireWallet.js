import React, { Component } from "react";
import { connect } from "react-redux";

import WalletConnect from "../wallet-connect/walletConnect";

const DefaultFallback = () => (
  <>
    <section className="block-overlap mt-5 pb-5">
      <div className="container">
        <div className="row text-center">
          <div className="col-sm-12 col-md-12 col-lg-10 offset-lg-1">
            <div className="stats-box p-4">
              <h3 className="mb-2">Please Connect Wallet</h3>
              <p>Connect your wallet from the list to stake SRX.</p>
              {
                <WalletConnect
                  btnName="CONNECT"
                  btnClass="btn btn-rounded btn-info"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const RequireWalletConnected =
  (FallbackComponent = DefaultFallback) =>
  (ComposedComponent) => {
    class Connected extends Component {
      render() {
        if (this.props.wallet.connected && this.props.wallet.valid_network)
          return <ComposedComponent {...this.props} />;
        if (!FallbackComponent) return <DefaultFallback />;
        return <FallbackComponent />;
      }
    }

    function mapStateToProps({ wallet }) {
      return { wallet };
    }

    return connect(mapStateToProps)(Connected);
  };

export default RequireWalletConnected;
