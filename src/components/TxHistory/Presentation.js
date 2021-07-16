import React, { useState } from "react";

import { fromWei, isAddress } from "xdc3-utils";

import { toXdcAddress } from "../../wallets/xinpay";
import { FormatNumber, FormatToken } from "../../helpers/decimal";
import {
  ADDR_LINK,
  EXPLORER,
  Paginate,
  PaginateNav,
  RemoveExpo,
  BUILD_BLOCK_LINK,
  BUILD_TX_LINK,
} from "../../helpers/constant";
import { LOADER_BOX } from "../common/common";

function formatValue(varName, value) {
  if (isAddress(value))
    return (
      <span class="truncate">
        <a target="_blank" href={ADDR_LINK(EXPLORER, toXdcAddress(value))}>
          {toXdcAddress(value)}
        </a>
      </span>
    );
  if (["amount", "earnings", "principal"].includes(varName))
    return fromWei(RemoveExpo(value));
}

function renderReturnValues(returnValues) {
  return (
    <>
      {Object.keys(returnValues)
        .filter((x) => isNaN(x))
        .map((v, i) => (
          <div key={i} className="row">
            <div className="col-lg-4 col-sm-4 col-xs-4 text-left">{v}</div>
            <div className="col-lg-8 col-sm-8 col-xs-8">
              {formatValue(v, returnValues[v])}
            </div>
          </div>
        ))}
    </>
  );
}

function RenderRows(events, from) {
  if (!events)
    return (
      <tr>
        <td className="u-text-center" style={{ maxWidth: "100%" }} colSpan={4}>
          LOADING
        </td>
      </tr>
    );

  const nodes = [];

  if (events.length === 0) {
    return (
      <tr className="hover-grow ">
        <td className="u-text-center">No Treansactions done yet</td>
      </tr>
    );
  }

  events = Paginate({ data: events, from: from * 10, limit: 10 });

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    nodes.push(
      <tr className="hover-grow">
        <td>
          <a target="_blank" href={BUILD_BLOCK_LINK(EXPLORER, event.block)}>
            {event.block}
          </a>
        </td>
        <td>{event.name}</td>
        <td>
          <a target="_blank" href={BUILD_TX_LINK(EXPLORER, event.tx_hash)}>
            HASH LINK
          </a>
        </td>
        <td>{renderReturnValues(event.data)}</td>
      </tr>
    );
  }

  return nodes;
}

function RenderPagination({ active, setPage, total }) {
  const prevClass = active === 0 ? "page-link disabled" : "page-link";
  const nextClass =
    Math.ceil(total / 10) <= active + 1 ? "page-link disabled" : "page-link";
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

function TxHistoryPresentation({ events }) {
  const [active, setActive] = useState(0);

  const data = events ? events : null;

  return (
    <>
      <section className="section-sm mt-5" id="tx-history-block">
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
                      <div className="nav-link">TX History</div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="tab-content">
                  <div
                    role="tabpanel"
                    className="tab-pane fade in active show"
                    id="tx-history"
                  >
                    <table className="table table-responsive-stack">
                      <thead>
                        <tr>
                          <th>BLOCK NUMBER</th>
                          <th>NAME</th>
                          <th>LINK</th>
                        </tr>
                      </thead>
                      <tbody>{RenderRows(data, active)}</tbody>
                    </table>

                    <div className="pagination-container">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <RenderPagination
                            active={active}
                            total={data?.length}
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

export default TxHistoryPresentation;
