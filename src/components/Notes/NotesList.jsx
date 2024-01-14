// src/components/NoteList.js
import React, { useCallback, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import axios from "axios";
const NoteList = ({onShareNote, searchQuery }) => {
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
              Authorization: `Bearer${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setNotes(searchResponse.data);
      } else {
        const response = await axios.get("http://localhost:4000/api/notes", {
          headers: {
            Authorization: `Bearer${localStorage.getItem("token")}`,
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
        Authorization: `Bearer${localStorage.getItem("token")}`,
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
      <ul>
        {notes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onDelete={() => handleDeleteNote(note._id)}
          />
        ))}
      </ul>
      {userNotes.length>0?(
        <>
         <h1>Your Notes</h1>
      <ul>
        {userNotes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onDelete={() => handleDeleteNote(note._id)}
          />
        ))}
      </ul>
        </>
      ):<>No Notes.. create one</>}
      {sharedNotes.length>0?(
        <>
         <h1>Shared Notes With You</h1>
      <ul>
        {sharedNotes.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            onDelete={() => handleDeleteNote(note._id)}
          />
        ))}
      </ul>
        </>
      ):<></>}
      
    </main>
  );
};

export default NoteList;
