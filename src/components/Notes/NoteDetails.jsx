import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function NoteDetails() {
  const { noteId } = useParams();
    const [note,setNote] = useState([]);
  const fetchDetails = useCallback(async () => {
    const noteResponse = await axios.get(`http://localhost:4000/api/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    setNote(noteResponse.data);
  });
  useEffect(() => {
    //fetch the details of the note
    fetchDetails();
  }, []);
  return (
    <>
      <div className="note-container">
      <h1>Title: {note.title}</h1>
      <p>Content: {note.content}</p>
      <p>Owner: {note.owner}</p>
      <p>Created At: {note.createdAt}</p>
      <p>Updated At: {note.updatedAt}</p>
    </div>
    </>
  );
}

export default NoteDetails;
