import { useState, useEffect } from "react"; // 1. Import useEffect
import "./App.css";

function App() {
  const [noteText, setNoteText] = useState("");

  // 2. Cek Local Storage pas pertama kali load
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("chill-notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // 3. Auto-save ke Local Storage tiap kali 'notes' berubah
  useEffect(() => {
    localStorage.setItem("chill-notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (noteText.trim() === "") return;
    setNotes([...notes, noteText]);
    setNoteText("");
  };

  const handleDeleteNote = (indexToRemove) => {
    const updatedNotes = notes.filter((_, index) => index !== indexToRemove);
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <h1>notes_</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Write a new note..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes-msg">No notes yet. Start typing!</p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-item">
              <span>{note}</span>
              <button
                className="delete-btn"
                onClick={() => handleDeleteNote(index)}
              >
                X
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
