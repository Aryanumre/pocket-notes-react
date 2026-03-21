import React, { useState } from "react";
import "../styles/notes.css";
import notesImage from "../assets/notes.png";

function NotesArea({ selectedGroup, notes, addNote }) {
  const [message, setMessage] = useState("");

  if (!selectedGroup) {
    return (
      <div className="notes-area empty">
        <div className="notes-content">
          <img src={notesImage} alt="notes" className="notes-image" />
          <h1>Pocket Notes</h1>
          <p>
            Send and receive messages without keeping your phone online.
            <br />
            Use Pocket Notes on up to 4 linked devices.
          </p>
        </div>

        <span className="encryption">🔒 end-to-end encrypted</span>
      </div>
    );
  }

  const handleSend = () => {
    if (!message.trim()) return;
    addNote(message);
    setMessage("");
  };

  return (
    <div className="notes-area group">
      <div className="notes-header">
        <div
          className="group-circle"
          style={{ backgroundColor: selectedGroup.color }}>
          {selectedGroup.name
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </div>

        <h3>{selectedGroup.name}</h3>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-bubble">
            <p>{note.text}</p>
            <span className="note-date">{note.date}</span>
          </div>
        ))}
      </div>

      <div className="note-input">
        <div className="input-wrapper">
          <textarea
            placeholder="Enter your text here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message.trim() && <button onClick={handleSend}>➤</button>}
        </div>
      </div>
    </div>
  );
}

export default NotesArea;
