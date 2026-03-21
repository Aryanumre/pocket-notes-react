import { useState } from "react";

function NotesView({ selectedGroup, groups, setGroups }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    const updatedGroups = groups.map((g) =>
      g.id === selectedGroup.id
        ? {
            ...g,
            notes: [
              ...(g.notes || []),
              {
                text,
                time: new Date().toLocaleString(),
              },
            ],
          }
        : g,
    );

    setGroups(updatedGroups);
    setText("");
  };

  const currentGroup = groups.find((g) => g.id === selectedGroup.id);

  return (
    <div className="notes-view">
      {}
      <div className="notes-header">
        <div
          className="group-circle"
          style={{ backgroundColor: selectedGroup.color }}>
          {selectedGroup.initials}
        </div>
        <h3>{selectedGroup.name}</h3>
      </div>

      {}
      <div className="notes-list">
        {(currentGroup.notes || []).map((note, index) => (
          <div key={index} className="note-card">
            <p>{note.text}</p>
            <span>{note.time}</span>
          </div>
        ))}
      </div>

      {}
      <div className="notes-input">
        <textarea
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
}

export default NotesView;
