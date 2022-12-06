import { useEffect, useState } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./service/Note"
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNotes] = useState("a new note....");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  useEffect(() => {
    noteService.getAll().then(data => {
      console.log("hello");
      setNotes(data);
    });
  }, []);
  const addNote = (event) => {
    event.preventDefault();
    console.log("button-clicked", event.target);
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then(data => {
      setNotes(notes.concat(data));
      setNewNotes("");
    });
    setNotes(notes.concat(noteObject));
    setNewNotes("");
  };

  const handleNewNote = (event) => {
    console.log(event.target.value);
    setNewNotes(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService.update(id,changedNote).then(data => {
      setNotes(notes.map((n) => (n.id !== id ? n : data)));
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNote} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
