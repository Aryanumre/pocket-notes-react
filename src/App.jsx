import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import NotesArea from "./components/NotesArea";
import CreateGroupModal from "./components/CreateGroupModal";
import "./styles/sidebar.css";
import "./styles/notes.css";
import "./styles/modal.css";

function App() {
  const [groups, setGroups] = useState([
    { id: 1, name: "My Notes", color: "#16008b" },
    { id: 2, name: "My Personal grp", color: "#ff5733" },
    { id: 3, name: "JavaScript", color: "#f1c40f" },
    { id: 4, name: "HTML", color: "#e67e22" },
    { id: 5, name: "CSS Notes", color: "#2980b9" },
    { id: 6, name: "SQL Notes", color: "#27ae60" },
    { id: 7, name: "Python Notes", color: "#8e44ad" },
    { id: 8, name: "React grp", color: "#ff5733" },
    { id: 9, name: "Github grp", color: "#4c1bb0" },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || {},
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addGroup = (newGroup) => {
    const exists = groups.some(
      (g) => g.name.toLowerCase() === newGroup.name.trim().toLowerCase(),
    );

    if (exists) {
      alert("Group name already exists!");
      return;
    }

    const id = groups.length + 1;
    setGroups([...groups, { id, ...newGroup }]);
  };

  const addNote = (text) => {
    if (!selectedGroup) return;

    const groupId = selectedGroup.id;
    const now = new Date();

    const formattedDate =
      now.getDate() +
      " " +
      now.toLocaleString("en-US", { month: "short" }) +
      " " +
      now.getFullYear() +
      " • " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    setNotes((prev) => ({
      ...prev,
      [groupId]: [
        ...(prev[groupId] || []),
        {
          id: Date.now(),
          text,
          date: formattedDate,
        },
      ],
    }));
  };

  return (
    <div className="app">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        openModal={() => setIsModalOpen(true)}
      />

      <NotesArea
        selectedGroup={selectedGroup}
        notes={notes[selectedGroup?.id] || []}
        addNote={addNote}
      />

      {isModalOpen && (
        <CreateGroupModal
          closeModal={() => setIsModalOpen(false)}
          addGroup={addGroup}
          groups={groups}
        />
      )}
    </div>
  );
}

export default App;
