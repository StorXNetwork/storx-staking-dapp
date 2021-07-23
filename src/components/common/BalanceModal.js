import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { fromWei } from "xdc3-utils";

import XdcLogo from "../../assets/img/wallets/xdc-logo.png";
import SrxLogo from "../../assets/img/wallets/storx-logo.png";
import { DECIMALS, RemoveExpo } from "../../helpers/constant";
import { FormatNumber, FormatToken } from "../../helpers/decimal";

const BalanceModal = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const content = (
    <div className="modal-content">
      <div className="modal-header border-bottom-0">
        <h5 className="modal-title" id="exampleModalLabel">
          Wallet Balance
        </h5>
        <button
          type="button"
          className="close no-outline"
          onClick={handleClose}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="wallet-icon-block">
              <div className="wallet-icon" style={{ float: "left" }}>
                <img src={XdcLogo} alt="XDC" />
              </div>
              <div style={{ marginLeft: "45px" }}>
                <h5>XDC</h5>
                <p>XinFin Network</p>
              </div>
            </div>
            <div className="wallet-icon-block text-right">
              <h5>{FormatToken(data.xdc.amount)}</h5>
              {/* <p>{FormatToken(data.xdc.total)} $</p> */}
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div className="wallet-icon-block">
              <div className="wallet-icon" style={{ float: "left" }}>
                <img src={SrxLogo} alt="SRX" />
              </div>
              <div style={{ marginLeft: "45px" }}>
                <h5>SRX</h5>
                <p>StorX&nbsp;Network</p>
              </div>
            </div>
            <div className="wallet-icon-block text-right">
              <h5>{FormatToken(data.srx.amount)}</h5>
              {/* <p>{FormatToken(data.srx.total)} $</p> */}
            </div>
          </li>
        </ul>
      </div>
      <div className="modal-footer border-top-0 d-flex justify-content-center">
        <button type="button" className="back" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div onClick={handleShow} className="btn nav-link">
        Balance
      </div>
      <Modal centered={true} show={showModal} onHide={handleClose}>
        {content}
      </Modal>
    </>
  );
};

export default BalanceModal;
