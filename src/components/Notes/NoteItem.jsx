// src/components/NoteItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NoteItem.css'; // Import the CSS file for styling

const NoteItem = ({ note, onEdit, onDelete, onShare }) => {
  return (
    <li className="note-item" key={note.id}>
      <Link to={`/notes/${note._id}`} className="note-title">
        {note.title}
      </Link>
      <div >
      <Link to={`/notes/edit/${note._id}`} className="note-buttons">
          Edit
      </Link>
        
        <button className="note-button delete-button" onClick={onDelete}>
          Delete
        </button>
        <button className="note-button share-button" onClick={onShare}>
          Share
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
