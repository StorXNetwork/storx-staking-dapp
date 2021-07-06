import React, { useState } from "react";
import _ from "lodash";

import { GetAccountFromPK, VerifyPrivateKey } from "../../helpers/crypto";
import { LOADER_BOX } from "../common/common";

const PrivateKey = ({ cb, loading, back }) => {
  const [privateKey, setPrivateKey] = useState("");

  function renderMessage() {
    if (_.isEmpty(privateKey)) return <div className="no-key">&nbsp;</div>;
    const isValid = VerifyPrivateKey(privateKey);
    if (isValid)
      return <div className="valid-private-key">Private Key is valid</div>;
    else if (isValid === false)
      return <div className="invalid-private-key">Invalid Private Key</div>;
  }

  let btnName = "Submit";

  if (loading) {
    btnName = LOADER_BOX;
  }

  return (
    <div className="modal-content">
      <div className="modal-header border-bottom-0">
        <h5 className="modal-title" id="exampleModalLabel">
          Connect with Private Key
        </h5>
      </div>
      <div className="modal-body">
        <form className="" role="form">
          <div className="form-group">
            <label>Enter Private Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Private Key"
              value={privateKey}
              onChange={(x) => setPrivateKey(x.target.value)}
            />
          </div>

          <div className="private-key__message">{renderMessage()}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              const account = GetAccountFromPK(privateKey);
              cb(account);
            }}
            disabled={loading}
            className="btn btn-rounded btn-info mb-2"
          >
            {btnName}
          </button>
          <div></div>
        </form>
      </div>
      <div className="modal-footer border-top-0 d-flex justify-content-center">
        <button
          onClick={back}
          type="button"
          className="back"
          data-dismiss="modal"
        >
          Back
        </button>
      </div>
    </div>

    // <Container>
    //   <Row>
    //     <input
    //       className="private-key__input"
    //       value={privateKey}
    //       onChange={(x) => setPrivateKey(x.target.value)}
    //     />
    //   </Row>

    //   <Row>
    //     <div className="private-key__message">{renderMessage()}</div>
    //   </Row>

    //   <Row>
    //     <Col>
    //       <Button
    //         className="u-float-r"
    //         onClick={() => {
    //           const account = GetAccountFromPK(privateKey);
    //           cb(account);
    //         }}
    //         disabled={loading}
    //       >
    //         {btnName}
    //       </Button>
    //     </Col>
    //   </Row>
    // </Container>
    // </div>
  );
};

export default PrivateKey;
