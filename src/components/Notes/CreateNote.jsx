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
    <div className="container mx-auto p-4"> {/* Centered container with padding */}
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-6">Create New Note</h1>
    <div className="space-y-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
          Content:
        </label>
        <textarea
          id="content"
          value={newNoteContent}
          onChange={(e) => setNewNoteContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
        />
      </div>
    </div>
    <div className="flex justify-end">
      <button
        onClick={handleAddNote}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Save Note
      </button>
      <Link to="/notes" className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-4">
        Back to Notes
      </Link>
    </div>
  </div>
</div>

  );
};

export default CreateNote;
