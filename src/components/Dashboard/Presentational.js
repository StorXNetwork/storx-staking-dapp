import React, { useState } from "react";

import { fromWei } from "xdc3-utils";

import FarmNode from "../../assets/img/icons/farmnodes.png";
import Staking from "../../assets/img/icons/staking.png";
import Rewards from "../../assets/img/icons/staking-rewards.png";
import HostingRewards from "../../assets/img/icons/hosting-rewards.png";
import { toXdcAddress } from "../../wallets/xinpay";
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

function RenderRows(holders, reputationThreshold, from) {
  if (!holders)
    return (
      <tr>
        <td className="u-text-center" style={{ maxWidth: "100%" }} colSpan={4}>
          LOADING
        </td>
      </tr>
    );

  const nodes = [];

  holders = Paginate({ data: holders, from: from * 10, limit: 10 });

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

function RenderPagination({ active, setPage, total }) {
  const prevClass = active === 0 ? "page-link disabled" : "page-link";
  const nextClass =
    Math.ceil(total / 10) === active + 1 ? "page-link disabled" : "page-link";
  const last = Math.ceil(total / 10);

  const nos = PaginateNav(active, last);
  const liClass = (x) => (x === active ? "page-link active" : "page-link");
  const liItemClass = (x) => (x === active ? "page-item active" : "page-item");

  return (
    <>
      <li className="page-item">
        <div
          className={prevClass}
          onClick={() => setPage(active - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </div>
      </li>
      {nos.map((x) => (
        <li key={`pagonate-li-${x}`} className={liItemClass(x)}>
          <div className={liClass(x)} onClick={() => setPage(x)}>
            {String(x + 1)}
          </div>
        </li>
      ))}
      <li className="page-item">
        <div
          onClick={() => setPage(active + 1)}
          className={nextClass}
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </div>
      </li>
    </>
  );
}

function DashboardPresentation({ data, node_data }) {
  const [active, setActive] = useState(0);

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
            <div className="col-xl-6 col-lg-12 mb-3">
              <h3 className="header-stats">Statistics</h3>
              <div className="stats-box h-0 p-3 pt-4 pb-4">
                <div className="row stats-counter">
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider ver-divider_none-md safari-float-left">
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
                          <span>
                            <GeneralModal
                              centered={true}
                              modalClass="map-modal modal-xl"
                              btnElement={"div"}
                              btnName="( View All )"
                              btnProps={{ className: "map-button small pl-5" }}
                              footer={
                                <div>Total Storage Providers: {nodeCount}</div>
                              }
                            >
                              <WorldMap data={node_data} />
                            </GeneralModal>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider ver-divider_none-md safari-float-left">
                    <div className="media align-items-center">
                      <figure className="sm-avatar mr-2">
                        <div className="xs-avatar mx-auto">
                          <img
                            src={Staking}
                            className="img-fluid"
                            alt="Epoch"
                          />
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
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-12 mb-3">
              <h3 className="header-stats">Rewards</h3>
              <div className="stats-box h-0 p-3 pt-4 pb-4">
                <div className="row stats-counter">
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider plus ver-divider_none-md safari-float-left">
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
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider plus ver-divider_none-md safari-float-left">
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
                    className="nav nav-tabs ticker-nav form-tabs"
                    role="tablist"
                  >
                    <li className="nav-item mb-3">
                      <div className="nav-link ">
                        Farm/Storage Nodes ( {`${nodeCount}`} )
                      </div>
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
                        {RenderRows(stakeholder, reputationThreshold, active)}
                      </tbody>
                    </table>

                    <div className="pagination-container">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <RenderPagination
                            active={active}
                            total={stakeholder?.length}
                            setPage={setActive}
                          />
                        </ul>
                      </nav>
                    </div>
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

export default DashboardPresentation;
