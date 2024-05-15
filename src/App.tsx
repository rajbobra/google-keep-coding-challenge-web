import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Note from "./note";
import { eventNames } from "process";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faEdit,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import Editor from "./components/Editor";
import RenderHTML from "./components/renderhtml";
import DeleteModal from "./components/DeleteModal";
import BootstrapEditor from "./components/BootstrapEditor";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  const toggleEditor = () => {
    setShowEditor(!showEditor);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const notes: Note[] = await response.json();
        console.log("notes: \n", notes);
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (title: string, content: string) => {
    // event.preventDefault()
    const id = notes.length + 1;
    try {
      // setNotes([newNote, ...notes]);
      const response = await fetch("http://localhost:8080/api/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title, content }),
      });

      const newNoteJson = await response.json();
      if (response.status == 200) {
        console.log(newNoteJson);
        console.log(notes);
        console.log("Note added with content: %s %s", title, content);
      } else {
        console.log(response.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <div className="app-container">
      <FontAwesomeIcon
        icon={faPlusSquare}
        className="add-new-note-plus fa-2x"
        onClick={toggleEditor}
      />
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="notes-item">
            <div className="notes-header">
              <FontAwesomeIcon className="notes-header-icon" icon={faEdit} />
              <FontAwesomeIcon
                className="notes-header-icon"
                icon={faTrashCan}
                onClick={toggleDeleteModal}
              />
            </div>
            <h2>{note.title}</h2>
            <RenderHTML htmlContent={note.content} />
            <div id="updatedLabel">
              <label>last updated {note.updatedAt.toLocaleString()}</label>
            </div>
          </div>
        ))}
      </div>
      <BootstrapEditor show={showEditor} onClose={toggleEditor} addNote={handleAddNote} />
      <DeleteModal show={showDeleteModal} toggleDeleteModal={toggleDeleteModal} />
    </div>
  );
}

export default App;
