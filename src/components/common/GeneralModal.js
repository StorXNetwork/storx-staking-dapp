import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ToggleModal({
  children,
  btnElement = Button,
  btnName = "View",
  btnProps = {},
  disableSubmit = true,
  disableClose = true,
  modalClass = "custom-modal",
  ...rest
}) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const submitBtn = (
    <Button
      variant="primary"
      onClick={() => {
        if (rest.onSubmit && typeof rest.onSubmit === "function") {
          rest.onSubmit();
        }
      }}
    >
      {rest.btnNameSubmit || "Understood"}
    </Button>
  );

  let footer = rest.footer ? (
    rest.footer
  ) : disableClose === true ? (
    ""
  ) : (
    <Button
      variant="secondary"
      onClick={() => {
        handleClose();
        if (rest.onClose && typeof rest.onClose === "function") {
          rest.onClose();
        }
      }}
    ></Button>
  );

  return (
    <>
      {React.createElement(
        btnElement,
        { ...btnProps, onClick: handleShow },
        btnName
      )}

      <Modal
        dialogClassName={modalClass}
        {...rest}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{rest.modalname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
    </>
  );
}

export default ToggleModal;
