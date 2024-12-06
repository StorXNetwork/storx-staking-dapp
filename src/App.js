import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 *
 * @dev import components
 *
 */

import CacheBuster from "./cacheBuster";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer";
import Staking from "./components/Staking/Staking";
import Disclaimer from "./components/Disclaimer";
import TxHistory from "./components/TxHistory/TxHistory";
import NodeGuidelines from "./components/Dashboard/NodeGuidelines";
import OurFaqs from "./components/Dashboard/OurFaqs";
import TermsConditions from "./components/Dashboard/TermsConditions";
import PrivacyPolicy from "./components/Dashboard/PrivacyPolicy";

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

import { OnScroll, InitScrollToTop } from "./helpers/responsive";
import { Button } from "react-bootstrap";

const ComposedStaking = RequireWallet()(Staking);
const ComposedHistory = RequireWallet()(TxHistory);

function App() {
  useEffect(() => {
    window.addEventListener("scroll", OnScroll);
    InitScrollToTop();

    return () => {
      window.removeEventListener("scroll", OnScroll);
    };
  });

  return (
    <div className="app">
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

      <Route exact path={"/tx-history"} component={ComposedHistory} />
      <Route exact path={"/staking"} component={ComposedStaking} />
      <Route exact path={"/disclaimer"} component={Disclaimer} />
      <Route exact path={"/node-guidelines"} component={NodeGuidelines} />
      <Route exact path={"/faqs"} component={OurFaqs} />
      <Route exact path={"/terms-conditions"} component={TermsConditions} />
      <Route exact path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route exact path={"/"} component={Dashboard} />

      <Footer />
    </div>
  );
}

export default App;
