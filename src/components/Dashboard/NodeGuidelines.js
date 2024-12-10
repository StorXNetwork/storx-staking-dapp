import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { fromWei } from "xdc3-utils";

import FarmNode from "../../assets/img/icons/farmnodes.png";
import Staking from "../../assets/img/icons/staking.png";
import Rewards from "../../assets/img/icons/staking-rewards.png";
import HostingRewards from "../../assets/img/icons/hosting-rewards.png";
import rocketIcon from "../../assets/img/icons/banner-rocket-icon.svg";
import tickIcon from "../../assets/img/icons/green-tick-icon.svg";
import crossIcon from "../../assets/img/icons/red-cross-icon.svg";
import rightArrowIcon from "../../assets/img/icons/right-arrow-white-icon.svg";
import { fromXdcAddress, toXdcAddress } from "../../wallets/xinpay";
import { FormatNumber, FormatToken } from "../../helpers/decimal";
import {
  ADDR_LINK,
  EXPLORER,
  Paginate,
  PaginateNav,
  RemoveExpo,
} from "../../helpers/constant";
import { LOADER_BOX } from "../common/common";

import GeneralModal from "../common/GeneralModal";
import WorldMap from "../common/WorldMap";
import { FlexTable, InitStackableTable } from "../../helpers/responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

function NodeGuidelines({
  data,
  node_data,
  toggleFavorite = (addr) => console.log(addr),
  favorite,
  tab,
  setTab,
  filterData,
}) {
  const [active, setActive] = useState(0);

  return (
    <>
      <section className="sec-resources">
        <div className="container">
          <div className="resources-card">
            <h3>Node Set Up Requirements</h3>
            <ul className="custom-support grid-3">
              <li>
                <a href="https://doc.storx.io/storage-node.html" target="_blank">
                  <div className="content">
                    <h3>Hardware Requirements</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://doc.storx.io/storage-node.html" target="_blank">
                  <div className="content">
                    <h3>Software Requirements</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://doc.storx.io/storage-node.html" target="_blank">
                  <div className="content">
                    <h3>Staking Requirements</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="resources-card">
            <h3>Node Setup Process</h3>
            <ul className="custom-support grid-3">
              <li>
                <a href="https://doc.storx.io/storage-node-manual.html" target="_blank">
                  <div className="content">
                    <h3>Setup Node Manually</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://doc.storx.io/storage-node-shell.html" target="_blank">
                  <div className="content">
                    <h3>Setup Node Using Shell Script</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </a>
              </li>
              <li>
                <NavLink exact to="/#farmnode">
                  <div className="content">
                    <h3>Verification of Node Setup</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </NavLink>
                {/*<a href="/#farmnode">
                  <div className="content">
                    <h3>Verification of Node Setup</h3>
                  </div>
                  <div className="icon">
                    <img src={rightArrowIcon} alt="icon"/>
                  </div>
                </a>*/}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default NodeGuidelines;
