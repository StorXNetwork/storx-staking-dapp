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
        // <span className="btn btn-farmnode">Active</span>
          <img src={tickIcon} style={{ maxWidth: "20px", margin: "0 0 0 18px" }} alt="icon" />
      ) : (
          /*<span className="btn btn-slashed">Inactive</span>*/
          <img src={crossIcon} style={{ maxWidth: "20px", margin: "0 0 0 18px" }} alt="icon" />
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
  filterData,
}) {
  const [active, setActive] = useState(0);
  const [pageLength, setPageLength] = useState(10);
  const [addrFilter, setaddrFilter] = useState("");

  const allNodeCount = data
    ? Object.keys(data.allStakeholders).length
    : LOADER_BOX;

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

  useEffect(() => {
    filterData(addrFilter);
  }, [addrFilter]);

  return (
    <>
      {/*<section className="mb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="announcement">
                <b>Note</b>: The minimum staking amount will be updated as per the
                new incremental model from 03/08/2021 onwards.{" "}
                <a
                  href="https://storxnetwork.medium.com/storx-farm-node-minimum-staking-increment-model-to-avoid-srx-token-inflation-7a343cf89401"
                  target="_blank"
                  className="blue"
                >
                  Refer
                </a>
              </div>
              <div className="announcement">
                <b>Note</b>: {" "}
                <a
                  href="https://docs.google.com/spreadsheets/d/1KO4nYGHu8QqRdKnu9AuMXc9ltrABjDOWlZ1DOZ8Q_Ag/edit?usp=sharing"
                  target="_blank"
                  className="blue"
                >
                  List of Default Storage Nodes (Published on 01-03-2023 14:00 UTC)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/*<section className="sec-banner">
        <div className="container">
          <div className="content-wrapper">
            <div className="consulting-wrapper"><img src={rocketIcon} alt="rocket icon" />Business Consulting</div>
            <h1>Ready to Take Your Business <br />
              Growth to The Next Level?</h1>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem<br /> accusantium doloremque laudantium aperiae</p>
          </div>
        </div>
        <div className="scroll-line-wrapper">
          <div className="scroll-line"></div>
          <div className="scroll-line"></div>
          <div className="scroll-line"></div>
          <div className="scroll-line"></div>
        </div>
      </section>*/}

      <section className="sec-resources">
        <div className="container">
          <ul className="custom-support">
            <li>
              <NavLink to="/staking">
                <div className="content">
                  <h3>Stake SRX</h3>
                </div>
                <div className="icon">
                  <img src={rightArrowIcon} alt="icon"/>
                </div>
              </NavLink>
            </li>
            {/*<li>
              <a href="https://doc.storx.io/storage-node.html" target="_blank">
                <div className="content">
                  <h3>Setup Node</h3>
                </div>
                <div className="icon">
                  <img src={rightArrowIcon} alt="icon"/>
                </div>
              </a>
            </li>*/}
           {/* <li>
              <NavLink to="/tx-history">
                <div className="content">
                  <h3>Transaction History
                  </h3>
                </div>
                <div className="icon">
                  <img src={rightArrowIcon} alt="icon"/>
                </div>
              </NavLink>
            </li>*/}
            {/*<li>
              <a href="#">
                <div className="content">
                  <h3>Connect Wallet</h3>
                </div>
                <div className="icon">
                  <img src={rightArrowIcon} alt="icon"/>
                </div>
              </a>
            </li>*/}
            <li>
              <a href="https://discord.com/invite/ha4Jufj2Nm" target="_blank">
                <div className="content">
                  <h3>Contact Support</h3>
                </div>
                <div className="icon">
                  <img src={rightArrowIcon} alt="icon"/>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="sec-statistics-objects">
        <div className="container">
          <div className="row row-eq-height">
            {/*<div className="col-xl-3 col-md-6">
              <div className="object-card">
                <div className="content-wrapper">
                  <p className="title">Storage Nodes</p>
                  <h4>{allNodeCount}</h4>
                  <p className="small date">
                    <GeneralModal
                        centered={true}
                        modalClass="map-modal modal-lg"
                        btnElement={"div"}
                        btnName="View All"
                        btnProps={{ className: "map-button" }}
                        footer={
                          <div>
                            Total Storage Providers: {allNodeCount}
                          </div>
                        }
                    >
                      <WorldMap data={node_data} />
                    </GeneralModal>
                  </p>
                </div>
                <div className="icon-wrapper">
                  <img src={FarmNode} className="img-fluid" alt="Current Block" />
                </div>
              </div>
            </div>*/}
            <div className="col-xl-4 col-md-6">
              <div className="object-card">
                <div className="content-wrapper">
                  <p className="title">SRX Staked</p>
                  <h4>{totalStaked}</h4>
                  <p className="small date">SRX</p>
                </div>
                <div className="icon-wrapper">
                  <img
                      src={Staking}
                      className="img-fluid"
                      alt="Epoch"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="object-card">
                <div className="content-wrapper">
                  <p className="title">Hosting Rewards</p>
                  {/*<h4>{hostingRewards}</h4>*/}
                  <h4>285</h4>
                  <p className="small date">SRX/per Month</p>
                </div>
                <div className="icon-wrapper">
                  <img
                      src={HostingRewards}
                      className="img-fluid"
                      alt="Next Checkpoint"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="object-card">
                <div className="content-wrapper">
                  <p className="title">Staking Rewards</p>
                  <h4>{stakingRewwards}%</h4>
                  <p className="small date">P.A (approx)</p>
                </div>
                <div className="icon-wrapper">
                  <img
                      src={Rewards}
                      className="img-fluid"
                      alt="Next Checkpoint"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block-overlap d-none">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-12 mb-3">
              <h3 className="header-stats">Statistics</h3>
              <div className="stats-box h-0 p-3 pt-4 pb-4">
                <div className="row stats-counter">
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider safari-float-left">
                    <div className="media align-items-center statistics-card">
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
                          <span className="counter">{allNodeCount}</span>
                          <span>
                            <GeneralModal
                              centered={true}
                              modalClass="map-modal modal-lg"
                              btnElement={"div"}
                              btnName="( View All )"
                              btnProps={{ className: "map-button small pl-5" }}
                              footer={
                                <div>
                                  Total Storage Providers: {allNodeCount}
                                </div>
                              }
                            >
                              <WorldMap data={node_data} />
                            </GeneralModal>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider safari-float-left">
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
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider plus safari-float-left">
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
                  <div className="col-sm-6 col-md-6 col-lg-6 ver-divider plus safari-float-left">
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

      <section className="section-sm sec-farmnode" id="farmnode">
        <div className="container">
          <div className="farmnode-wrapper">
            <div className="row">
              <div className="farmnodes-tabbed-section">
                <div className="col-lg-12">
                  <div className="ticker-head align-items-center justify-content-between mb-2">
                    <ul
                        className="nav nav-tabs ticker-nav form-tabs hidden-xs"
                        role="tablist"
                    >
                      <li className="nav-item ">
                        <div
                            className={tab === 0 ? "nav-link active" : "nav-link"}
                            onClick={() => {
                              setActive(0);
                              setTab(0);
                            }}
                        >
                          Storage Nodes Listing ( {nodeCountTab} )
                        </div>
                      </li>
                      <li className="nav-item" style={{ border: 'none' }}>
                        <div
                            className={tab === 1 ? "nav-link active" : "nav-link"}
                            onClick={() => {
                              setActive(0);
                              setTab(1);
                            }}
                        >
                          Selected Nodes ( {favoriteNodeCount} )
                        </div>
                      </li>
                      <li className="nav-item d-none">
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
                        {/*<option value="0">
                          Farm/Storage Nodes ( {nodeCountTab} )
                        </option>*/}
                        <option value="0">
                          Storage Nodes Listing ( {nodeCountTab} )
                        </option>
                        <option value="1">
                          Selected Nodes ( {favoriteNodeCount} )
                        </option>
                        {/*<option value="1">
                          Favorite ( {favoriteNodeCount} )
                        </option>*/}
                        {/*<option value="2">
                          Inactive ( {inactiveNodeCount} ){" "}
                        </option>*/}
                      </select>
                    </div>
                    <div className="input-group with-icon">
                      <input
                          className="form-control"
                          type="search"
                          placeholder="Filter Node Address..."
                          value={addrFilter}
                          onChange={(e) => setaddrFilter(e.target.value)}
                      />
                      <FontAwesomeIcon icon={faSearch}/>
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
                      <div className="entries-amount">
                        <span>Show</span>
                        <select
                            id="change-record-count"
                            className="select"
                            value={pageLength}
                            onChange={(e) => setPageLength(e.target.value)}
                        >
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                        </select>
                        <span className="hide-mobile">Entries</span>
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
        </div>
      </section>
    </>
  );
}

export default DashboardPresentation;
