import React from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 *
 * @dev import components
 *
 */

import CacheBuster from "./cacheBuster";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Staking from "./components/Staking";
import TxHistory from "./components/TxHistory";

/**
 *
 * @dev import HOC
 *
 */

import RequireWallet from "./components/HOC/RequireWallet";

/**
 *
 * @dev import CSS
 *
 */

import "./assets/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";
import packageJson from "../package.json";
import { PROJECT_NAME } from "./helpers/constant";

const ComposedStaking = RequireWallet()(Staking);
const ComposedHistory = RequireWallet()(TxHistory);

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <CacheBuster>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          // console.log("[*] cache policy", loading, isLatestVersion);
          if (loading) return null;
          console.log(`${PROJECT_NAME} UI Version:`, packageJson.version);
          if (!loading && !isLatestVersion) {
            // You can decide how and when you want to force reload
            refreshCacheAndReload();
          }

          return null;
        }}
      </CacheBuster>

      <Header />

      {/* <Route exact path={"/tx-history"} component={ComposedHistory} />
      <Route exact path={"/staking"} component={ComposedStaking} />
      <Route exact path={"/"} component={Dashboard} /> */}
    </div>
  );
}

export default App;
