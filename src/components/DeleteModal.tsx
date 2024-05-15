import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

interface DeleteModalProps {
  show: any;
  toggleDeleteModal: any;
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <>
      <Modal show={props.show} onHide={props.toggleDeleteModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.toggleDeleteModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={props.toggleDeleteModal}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
