import React from 'react';
import './Header.css'; // <-- 👈 add this line

function Header({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="header-section">
      <h1>You've got {total} task{total !== 1 ? "s" : ""} today 📋</h1>
      <h3>Progress: {completed} task{completed !== 1 ? "s" : ""} completed — {percent}%</h3>
    </div>
  );
}

export default Header;
