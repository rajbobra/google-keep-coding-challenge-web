import { useEffect, useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Editor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import Note from "../note";

interface Props {
  onClose: any;
  addNote: any;
}

const Editor = (props: Props) => {
  const handler = () => {};

  const [notes, setNotes] = useState<Note[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  const saveNote = (event: React.FormEvent) => {
    props.addNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div className="overlay">
      <div className="editor-container">
        <div className="editor-header">
          <FontAwesomeIcon
            className="notes-header-icon fa-xl"
            icon={faWindowClose}
            onClick={props.onClose}
          />
        </div>
        <div className="editor-body">
          <h2 className="note-form">New note</h2>
          <form className="note-form" onSubmit={saveNote}>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="title"
              required
            />
            <QuillEditor
              className="quill"
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="Content"
            />
            <button type="submit">Add Note</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editor;
