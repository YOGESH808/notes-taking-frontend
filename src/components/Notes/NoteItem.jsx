import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NoteItem.css';
import axios from 'axios';
import DeleteConfirmationModel from './DeleteConfirmationModel';

const NoteItem = ({ note, onDelete, onShare }) => {
  const [showDeleteModel,setShowDeleteModel] = useState(false);
  const [showShareModel,setShowShareModel] = useState(false)
  const handleCancelDelete = ()=>{
    setShowDeleteModel(false);
  }
  const handleDeleteConfirmed = ()=>{
    onDelete();
  }
  const handleShareNote = async(noteId) => {
    // Implement functionality to share a note
    const shareWithName = window.prompt('Enter the name of the user to share with:');
    // Make API request to share the note
    const shareResponse = await axios.post(
        `http://localhost:4000/api/notes/${noteId}/share`,
        {
            shareWith: shareWithName
        },
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
    );
    // Update the UI by fetching the updated notes
    console.log(`Share Note ${noteId} clicked`);
  };
  return (
    <li className="note-item" key={note.id}>
      <Link to={`/notes/${note._id}`} className="note-title">
        {note.title}
      </Link>
      <div >
      <Link to={`/notes/edit/${note._id}`} className="note-buttons">
          Edit
      </Link>
        
        <button className="note-button delete-button" onClick={()=>setShowDeleteModel(true)}>
          Delete
        </button>

        {showDeleteModel && <DeleteConfirmationModel onCancel={handleCancelDelete} onConfirm={handleDeleteConfirmed}/>}
        <button className="note-button share-button" onClick={()=>handleShareNote(note._id)}>
          Share
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
