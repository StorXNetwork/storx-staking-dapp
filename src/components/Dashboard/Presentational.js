import React, { useState, useEffect } from "react";

import { fromWei } from "xdc3-utils";

import FarmNode from "../../assets/img/icons/farmnodes.png";
import Staking from "../../assets/img/icons/staking.png";
import Rewards from "../../assets/img/icons/staking-rewards.png";
import HostingRewards from "../../assets/img/icons/hosting-rewards.png";
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
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Options = {
  0: "",
  1: "",
  2: "",
};

function RenderRows(
  holders,
  reputationThreshold,
  from,
  toggleFavorite,
  favorite,
  pageLength = 10
) {
  if (!holders)
    return (
      <tr>
        <td className="u-text-center" style={{ maxWidth: "100%" }} colSpan={4}>
          LOADING
        </td>
      </tr>
    );

  const nodes = [];

  holders = Paginate({
    data: holders,
    from: from * pageLength,
    limit: pageLength,
  });

  for (let i = 0; i < holders.length; i++) {
    const data = holders[i];
    const status =
      reputationThreshold <= data.reputation ? (
        <span className="btn btn-farmnode">Active</span>
      ) : (
        <span className="btn btn-slashed">Inactive</span>
      );
    const pinClass = favorite.includes(
      fromXdcAddress(data.stake.stakerHolder).toLowerCase()
    )
      ? "pin active"
      : "pin";

    nodes.push(
      <tr className="hover-grow">
        <td
          onClick={() => toggleFavorite(data.stake.stakerHolder)}
          className={pinClass}
        >
          <span className="table-responsive-stack-thead">FAVORITE</span>

          <FontAwesomeIcon
            className={
              favorite.includes(
                fromXdcAddress(data.stake.stakerHolder).toLowerCase()
              )
                ? "active"
                : ""
            }
            icon={faStar}
          />
        </td>

        <td className="truncate">
          <span className="table-responsive-stack-thead">
            FARM NODE ADDRESS
          </span>
          <a
            target="_blank"
            href={ADDR_LINK(EXPLORER, toXdcAddress(data.stake.stakerHolder))}
          >
            {toXdcAddress(data.stake.stakerHolder)}
          </a>
        </td>
        <td>
          <span className="table-responsive-stack-thead">STAKED AMOUNT</span>
          {FormatNumber(fromWei(data.stake.stakedAmount))} SRX
        </td>
        <td>
          <span className="table-responsive-stack-thead">REPUTATION</span>

          <div className="notify masternode">
            <span className="heartbit"></span>
            <span className="point"></span>
          </div>
          {FormatNumber(data.reputation)}
        </td>
        <td>
          <span className="table-responsive-stack-thead">STATUS</span>

          {status}
        </td>
      </tr>
    );
  }

  return nodes;
}

function RenderPagination({ active, setPage, total, pageLength = 10 }) {
  const prevClass = active === 0 ? "page-link disabled" : "page-link";
  const nextClass =
    Math.ceil(total / pageLength) <= active + 1
      ? "page-link disabled"
      : "page-link";
  const last = Math.ceil(total / pageLength);

  const nos = PaginateNav(active, last);
  const liClass = (x) => (x === active ? "page-link active" : "page-link");
  const liItemClass = (x) => (x === active ? "page-item active" : "page-item");

  useEffect(InitStackableTable, [pageLength]);

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

function DashboardPresentation({
  data,
  node_data,
  toggleFavorite = (addr) => console.log(addr),
  favorite,
  tab,
  setTab,
}) {
  const [active, setActive] = useState(0);
  const [pageLength, setPageLength] = useState(10);

  const nodeCount = data ? Object.keys(data.stakeHolders).length : LOADER_BOX;
  const nodeCountTab = data ? Object.keys(data.stakeHolders).length : "-";
  const inactiveNode = data
    ? Object.keys(data.stakeHolders).filter(
        (x) => data.stakeHolders[x].reputation < data.reputationThreshold
      )
    : LOADER_BOX;
  const favoriteNode = data
    ? Object.keys(data.stakeHolders).filter((x) =>
        favorite.includes(fromXdcAddress(x).toLowerCase())
      )
    : LOADER_BOX;
  const favoriteNodeCount = data ? favoriteNode.length : "-";
  const inactiveNodeCount = data ? inactiveNode.length : "-";

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

  const displayNodeTab = {
    0: data
      ? Object.keys(data.stakeHolders).map((x) => data.stakeHolders[x])
      : null,
    1: data ? favoriteNode.map((x) => data.stakeHolders[x]) : null,
    2: data ? inactiveNode.map((x) => data.stakeHolders[x]) : null,
  };

  const displayNode = displayNodeTab[`${tab}`];

  useEffect(() => {
    FlexTable();
  }, [active]);

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
                              modalClass="map-modal modal-lg"
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
                    className="nav nav-tabs ticker-nav form-tabs hidden-xs"
                    role="tablist"
                  >
                    <li className="nav-item mb-3">
                      <div
                        className={tab === 0 ? "nav-link active" : "nav-link"}
                        onClick={() => {
                          setActive(0);
                          setTab(0);
                        }}
                      >
                        Farm/Storage Nodes ( {nodeCountTab} )
                      </div>
                    </li>
                    <li className="nav-item mb-3">
                      <div
                        className={tab === 1 ? "nav-link active" : "nav-link"}
                        onClick={() => {
                          setActive(0);
                          setTab(1);
                        }}
                      >
                        Favorite ( {favoriteNodeCount} )
                      </div>
                    </li>
                    <li className="nav-item mb-3">
                      <div
                        className={tab === 2 ? "nav-link active" : "nav-link"}
                        onClick={() => {
                          setActive(0);
                          setTab(2);
                        }}
                      >
                        Inactive ( {inactiveNodeCount} ){" "}
                      </div>
                    </li>
                  </ul>
                  <div className="d-sm-none">
                    <select
                      className="mb10 form-control"
                      id="tab_selector"
                      value={`${tab}`}
                      onChange={(v) => {
                        setActive(0);
                        setTab(v.target.value);
                      }}
                    >
                      <option value="0">
                        Farm/Storage Nodes ( {nodeCountTab} )
                      </option>
                      <option value="1">
                        Favorite ( {favoriteNodeCount} )
                      </option>
                      <option value="2">
                        Inactive ( {inactiveNodeCount} ){" "}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
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
                        <th className="visibility-xs fav"></th>
                        <th>FARM NODE ADDRESS</th>
                        {/* <th>NODE IP</th> */}
                        <th>STAKED AMOUNT</th>
                        <th>REPUTATION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RenderRows(
                        displayNode,
                        reputationThreshold,
                        active,
                        toggleFavorite,
                        favorite,
                        pageLength
                      )}
                    </tbody>
                  </table>

                  <div className="pagination-container d-flex align-items-center justify-content-between">
                    <div class="entries-amount">
                      <span>Show</span>
                      <select
                        id="change-record-count"
                        class="select"
                        value={pageLength}
                        onChange={(e) => setPageLength(e.target.value)}
                      >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                      </select>
                      <span class="hide-mobile">Entries</span>
                    </div>

                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <RenderPagination
                          active={active}
                          total={displayNode?.length}
                          setPage={setActive}
                          pageLength={pageLength}
                        />
                      </ul>
                    </nav>
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
