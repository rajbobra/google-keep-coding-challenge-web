import React from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

interface DeleteModalProps {
  show: any;
  toggleDeleteModal: any;
  noteToBeDeleted: number;
}

type DeleteResponse = { message: string };

const DeleteModal = (props: DeleteModalProps) => {
  const deleteNote = async (id: number) => {
    try {
      if (id != -1) {
        const response = await fetch(
          `http://localhost:8080/api/deleteNote/${id}`,
          { method: "DELETE" },
        );
        const deleteLog: DeleteResponse = await response.json();
        console.log(deleteLog);
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error);
    }
    props.toggleDeleteModal();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.toggleDeleteModal}>
        <Modal.Header></Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.toggleDeleteModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => deleteNote(props.noteToBeDeleted)}
          >
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
