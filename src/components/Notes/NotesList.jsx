// src/components/NoteList.js
import React, { useCallback, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import axios from "axios";
const NoteList = ({ searchQuery }) => {
  const [notes, setNotes] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const fetchNotes = useCallback(async () => {
    try {
      // Make API request to fetch notes
      if (searchQuery.length !== 0) {
        const searchResponse = await axios.get(
          `http://localhost:4000/api/search?q=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setNotes(searchResponse.data);
      } else {
        const response = await axios.get("http://localhost:4000/api/notes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        // Update the state with the fetched notes
        setNotes([]);
        setUserNotes(response.data.userNotes);
        setSharedNotes(response.data.sharedNotes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  });

  const handleDeleteNote = async (noteId) => {
    await axios.delete(`http://localhost:4000/api/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes(searchQuery);
  }, [searchQuery]);
  return (
    <main>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {notes.map((note) => (
        <NoteItem
          key={note._id}
          note={note}
          onDelete={() => handleDeleteNote(note._id)}
          className="w-full h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-md hover:shadow-lg rounded-lg bg-white"
        />
      ))}
    </div>
    {userNotes.length > 0 && (
      <section className="mt-8">
        <h1 className="text-lg font-semibold mb-4">Your Notes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {userNotes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              onDelete={() => handleDeleteNote(note._id)}
              className="w-full h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-md hover:shadow-lg rounded-lg bg-white"
            />
          ))}
        </div>
      </section>
    )}
    {sharedNotes.length > 0 && (
      <section className="mt-8">
        <h1 className="text-lg font-semibold mb-4">Shared Notes With You</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {sharedNotes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              onDelete={() => handleDeleteNote(note._id)}
              className="w-full h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-hidden shadow-md hover:shadow-lg rounded-lg bg-white"
            />
          ))}
        </div>
      </section>
    )}
  </main>
  
  
  
  );
};

export default NoteList;
