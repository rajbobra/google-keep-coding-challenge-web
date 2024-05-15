import { useEffect, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import Note from "../note";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

interface EditorProps {
    show: any,
    onClose: any;
    addNote: any;
}

const BootstrapEditor = (props: EditorProps) => {
  const handler = () => {};

  const [notes, setNotes] = useState<Note[]>([]);
    const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  var titleInvalid = validated && title.trim() === '';

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/notes");
        const notes: Note[] = await response.json();
        console.log("notes: \n", notes);
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const saveNote = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
  
    setValidated(true);
    props.addNote(title, content);
    setTitle("");
    setContent("");
  };

  const closeModalAndResetEditor = () => {
    props.onClose();
    titleInvalid=false;
    setTitle("");
    setContent("");
  }

  return (
    <>
      <Modal show={props.show} size="lg" 
            aria-labelledby="contained-modal-title-vcenter" onHide={closeModalAndResetEditor}
            centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={saveNote}>
            <Form.Group className="mb-3">
                <Form.Control 
                    type="text" 
                    required
                    placeholder="title" 
                    value={title}
                    onChange={(event) => setTitle(event.target.value)} 
                    isInvalid={titleInvalid}
                     />
            </Form.Group>
            <Form.Group className="mb-3">
                <div className="quill">
                    <QuillEditor
                    theme="snow"
                    value={content}
                    onChange={(value) => setContent(value)}
                    placeholder="Content"
                    style={{maxHeight: '400px', overflowY: 'auto'}}
                    />
                </div>
            </Form.Group>
            <Form.Group>
                <Button type="submit">Add Note</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BootstrapEditor;
