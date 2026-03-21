import React from "react";
import "../styles/sidebar.css";

function Sidebar({ groups, selectedGroup, setSelectedGroup, openModal }) {
  return (
    <div className="sidebar">
      {/* HEADER  */}
      <div className="sidebar-header">
        <h2>Pocket Notes</h2>
      </div>

      {/* GROUP LIST */}
      <div className="group-list">
        {groups.map((group) => {
          const initials = group.name
            .split(" ")
            .map((w) => w[0].toUpperCase())
            .join("");

          return (
            <div
              key={group.id}
              className={`group-item ${
                selectedGroup?.id === group.id ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedGroup(group);
              }}>
              <div
                className="group-circle"
                style={{ backgroundColor: group.color }}>
                {initials}
              </div>
              <span>{group.name}</span>
            </div>
          );
        })}
      </div>

      {/* ADD BUTTON */}
      <button className="add-btn" onClick={openModal}>
        +
      </button>
    </div>
  );
}

export default Sidebar;
