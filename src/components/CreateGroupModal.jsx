import { useState } from "react";
import "../styles/modal.css";

function CreateGroupModal({ closeModal, addGroup, groups }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleCreate = () => {
    if (!groupName.trim()) return;

    const exists = groups.some(
      (g) => g.name.toLowerCase() === groupName.trim().toLowerCase(),
    );

    if (exists) {
      alert("Group name already exists!");
      return;
    }

    addGroup({ name: groupName, color: selectedColor });
    closeModal();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modal-header">
          <h2>Create New group</h2>
        </div>

        {/* GROUP NAME ROW */}
        <div className="modal-row">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        {/* COLOR ROW */}
        <div className="modal-row">
          <label>Choose colour</label>
          <div className="color-options">
            {colors.map((c, i) => (
              <span
                key={i}
                className={`color-circle ${
                  selectedColor === c ? "active" : ""
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setSelectedColor(c)}></span>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <div className="modal-btn">
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;
