import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateNote.css'; // Import your CSS file for component-specific styling

const CreateNote = () => {
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [redirectToNotes, setRedirectToNotes] = useState(false);
  const navigate = useNavigate();

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:4000/api/notes',
        {
          content: newNoteContent,
          title: newNoteTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      // Set the state to trigger a redirect
      setRedirectToNotes(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Redirect to the notes page after setting state to true
    if (redirectToNotes) {
      navigate('/notes');
    }
  }, [redirectToNotes, navigate]);

  return (
    <div className="create-note-container">
      <h1>Create New Note</h1>
      <div className="input-container">
        <label>Title:</label>
        <input type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Content:</label>
        <textarea value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} />
      </div>
      <div className="button-container">
        <button onClick={handleAddNote}>Save Note</button>
        <Link to="/notes">Back to Notes</Link>
      </div>
    </div>
  );
};

export default CreateNote;
