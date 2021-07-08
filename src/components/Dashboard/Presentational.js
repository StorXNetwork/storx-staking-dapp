import React from "react";

import { fromWei } from "xdc3-utils";

import FarmNode from "../../assets/img/icons/farmnodes.png";
import Staking from "../../assets/img/icons/staking.png";
import Rewards from "../../assets/img/icons/rewards.png";
import HostingRewards from "../../assets/img/icons/hosting-rewards.png";
import { toXdcAddress } from "../../wallets/xinpay";
import { FormatNumber, FormatToken } from "../../helpers/decimal";
import { ADDR_LINK, EXPLORER, RemoveExpo } from "../../helpers/constant";
import { LOADER_BOX } from "../common/common";

function RenderRows(holders, reputationThreshold) {
  if (!holders)
    return (
      <tr>
        <td className="u-text-center" style={{ maxWidth: "100%" }} colSpan={4}>
          LOADING
        </td>
      </tr>
    );

  const nodes = [];

  for (let i = 0; i < holders.length; i++) {
    const data = holders[i];
    const status =
      reputationThreshold <= data.reputation ? (
        <span className="btn btn-farmnode">Active</span>
      ) : (
        <span className="btn btn-slashed">Inactive</span>
      );

    nodes.push(
      <tr className="hover-grow" key={i + "stake-holder"}>
        <td className="truncate">
          <a
            target="_blank"
            href={ADDR_LINK(EXPLORER, toXdcAddress(data.stake.stakerHolder))}
          >
            {toXdcAddress(data.stake.stakerHolder)}
          </a>
        </td>
        {/* <td>{data.data.address}</td> */}
        <td>{FormatNumber(fromWei(data.stake.stakedAmount))} SRX</td>
        <td>
          <div className="notify masternode">
            <span className="heartbit"></span>
            <span className="point"></span>
          </div>
          {FormatNumber(data.reputation)}
        </td>
        <td>{status}</td>
      </tr>
    );
  }

  return nodes;
}

function DashboardPresentation({ data }) {
  const nodeCount = data ? Object.keys(data.stakeHolders).length : LOADER_BOX;
  const stakeholder = data
    ? Object.keys(data.stakeHolders).map((x) => data.stakeHolders[x])
    : null;
  const reputationThreshold = data ? data.reputationThreshold : null;

  const totalStaked = data
    ? FormatNumber(FormatToken(data.totalStaked + ""))
    : LOADER_BOX;
  const hostingRewards = data
    ? FormatNumber(fromWei(RemoveExpo(data.hostingCompensation) + ""))
    : LOADER_BOX;

  const stakingRewwards = data
    ? data.interest / data.interestPrecision
    : LOADER_BOX;

  return (
    <>
      <section className="bg-home bg-gradient red" id="home">
        <div id="particles-js" className="particles-js"></div>
      </section>

      <section className="block-overlap">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="header-stats">Network Stats</h3>
            </div>
          </div>

          <div className="stats-box p-4">
            <div className="row stats-counter">
              <div className="col-sm-6 col-md-6 col-lg-3 ver-divider ver-divider_none-md safari-float-left">
                <div className="media align-items-center">
                  <figure className="sm-avatar mr-2">
                    <div className="xs-avatar mx-auto">
                      <img
                        src={FarmNode}
                        className="img-fluid"
                        alt="Current Block"
                      />
                    </div>
                  </figure>
                  <div className="media-body">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-0">
                      Farm/Storage Nodes
                    </h2>
                    <p>
                      <span className="counter">{nodeCount}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 ver-divider ver-divider_none-md safari-float-left">
                <div className="media align-items-center">
                  <figure className="sm-avatar mr-2">
                    <div className="xs-avatar mx-auto">
                      <img src={Staking} className="img-fluid" alt="Epoch" />
                    </div>
                  </figure>
                  <div className="media-body">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-0">
                      SRX Staked
                    </h2>
                    <p>
                      <span className="counter">{totalStaked}</span>{" "}
                      <span className="small">SRX</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 ver-divider ver-divider_none-md safari-float-left">
                <div className="media align-items-center">
                  <figure className="sm-avatar mr-2">
                    <div className="xs-avatar mx-auto">
                      <img
                        src={HostingRewards}
                        className="img-fluid"
                        alt="Next Checkpoint"
                      />
                    </div>
                  </figure>
                  <div className="media-body">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-0">
                      Hosting Rewards
                    </h2>
                    <p>
                      <span className="counter">{hostingRewards}</span>{" "}
                      <span className="small">SRX/PA</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-3 ver-divider ver-divider_none-md safari-float-left">
                <div className="media align-items-center">
                  <figure className="sm-avatar mr-2">
                    <div className="xs-avatar mx-auto">
                      <img
                        src={Rewards}
                        className="img-fluid"
                        alt="Next Checkpoint"
                      />
                    </div>
                  </figure>
                  <div className="media-body">
                    <h2 className="font-size-1 text-uppercase text-secondary mb-0">
                      Staking Rewards
                    </h2>
                    <p>
                      <span className="counter">{stakingRewwards}</span>%{" "}
                      <span className="small">P.A (approx)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm" id="farmnode">
        <div className="container">
          <div className="row">
            <div className="farmnodes-tabbed-section">
              <div className="col-lg-12">
                <div className="ticker-head mb-2">
                  <ul
                    className="nav nav-tabs ticker-nav form-tabs hidden-xs"
                    role="tablist"
                  >
                    <li className="nav-item mb-3">
                      <a
                        className="nav-link active show"
                        href="#tab1"
                        role="tab"
                        data-toggle="tab"
                        aria-selected="true"
                      >
                        Farm/Storage Nodes ( {`${nodeCount}`} )
                      </a>
                    </li>
                  </ul>
                  {/* <div className="d-sm-none">
                <select className="mb10 form-control" id="tab_selector">
                  <option value="0">Farm Nodes (6)</option>
                  <option value="1">Slashed Nodes (4)</option>
                  <option value="2">Resigned Nodes (3)</option>
                </select>
              </div> */}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane fade in active show"
                    id="tab1"
                  >
                    <table className="table table-responsive-stack">
                      <thead>
                        <tr>
                          <th>FARM NODE ADDRESS</th>
                          {/* <th>NODE IP</th> */}
                          <th>STAKED AMOUNT</th>
                          <th>REPUTATION</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {RenderRows(stakeholder, reputationThreshold)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default React.memo(DashboardPresentation);
