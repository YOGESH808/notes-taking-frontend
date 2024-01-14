// src/components/Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const Navbar = ({ user, onAddNote, onLogout, onSearchChange }) => {
  return (
    <nav className="navbar">
      <span>Hello, {user.name}</span>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="action-buttons">
        <Link className="action-button" to = "/notes/create">
          Add Note
        </Link>
        <button className="action-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
