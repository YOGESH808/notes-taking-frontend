// src/pages/NotesHome.js
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NoteList from "./NotesList";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NotesHome = ({onLogout}) => {
  const [user, setUser] = useState({ name: "John" }); // Replace with actual user data
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch user data and notes from the API
    // Example: fetch('/api/user').then(response => response.json()).then(data => setUser(data));
    //         fetch('/api/notes').then(response => response.json()).then(data => setNotes(data));
  }, []);

  const handleLogout = () => {
    // Implement logout functionality (clear session, redirect, etc.)
    console.log("Logout clicked");
    
  };


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
                'Authorization': `Bearer${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
    );
    // Update the UI by fetching the updated notes
    console.log(`Share Note ${noteId} clicked`);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar
        user={user}
        onLogout={onLogout}
        onSearchChange={setSearchTerm}
      />
      <NoteList
        notes={filteredNotes}
        onShareNote={handleShareNote}
        searchQuery={searchTerm}
      />
    </div>
  );
};

export default NotesHome;
