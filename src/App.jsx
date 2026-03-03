import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeGroup, setActiveGroup] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [input, setInput] = useState("");

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  // Load from localStorage
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem("groups")) || [];
  });

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || {};
  });

  // Save groups
  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createGroup = () => {
    if (groupName.trim().length < 2)
      return alert("Minimum 2 characters required");

    if (!selectedColor) return alert("Select colour");

    const duplicate = groups.find(
      (g) => g.name.toLowerCase() === groupName.toLowerCase(),
    );
    if (duplicate) return alert("Group already exists");

    const newGroup = {
      id: Date.now(),
      name: groupName,
      color: selectedColor,
    };

    setGroups([...groups, newGroup]);
    setGroupName("");
    setSelectedColor("");
    setShowModal(false);
  };

  const addNote = () => {
    if (!input.trim() || !activeGroup) return;

    const newNote = {
      text: input,
      date: new Date().toLocaleString(),
    };

    setNotes({
      ...notes,
      [activeGroup.id]: [...(notes[activeGroup.id] || []), newNote],
    });

    setInput("");
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Pocket Notes</h2>

        {groups.map((group) => (
          <div
            key={group.id}
            className={`group-item ${activeGroup?.id === group.id ? "active" : ""}`}
            onClick={() => setActiveGroup(group)}>
            <div className="avatar" style={{ backgroundColor: group.color }}>
              {group.name.substring(0, 2).toUpperCase()}
            </div>
            <span>{group.name}</span>
          </div>
        ))}

        <button className="add-btn" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      {/* Main */}
      <div className="main">
        {!activeGroup ? (
          <div className="empty">
            <h1>Pocket Notes</h1>
            <p>Select or create a group to start</p>
          </div>
        ) : (
          <>
            <div className="header">
              <div
                className="avatar"
                style={{ backgroundColor: activeGroup.color }}>
                {activeGroup.name.substring(0, 2).toUpperCase()}
              </div>
              <h3>{activeGroup.name}</h3>
            </div>

            <div className="notes">
              {(notes[activeGroup.id] || []).map((note, index) => (
                <div key={index} className="note">
                  <p className="note-text">{note.text}</p>
                  <div className="note-time">{note.date}</div>
                </div>
              ))}
            </div>

            <div className="input-area">
              <input
                type="text"
                placeholder="Enter your note..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
              />
              <button onClick={addNote}>Send</button>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Group</h3>

            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            <div className="colors">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`color-circle ${selectedColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>

            <button onClick={createGroup}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
