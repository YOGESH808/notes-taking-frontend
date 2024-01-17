import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NoteItem.css";
import axios from "axios";
import DeleteConfirmationModel from "./DeleteConfirmationModel";
import ShareModelCard from "./ShareModelCard";

const NoteItem = ({ note, onDelete}) => {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showShareModel, setShowShareModel] = useState(false);
  const [error, setError] = useState(null);
  const handleCancelDelete = () => {
    setShowDeleteModel(false);
  };
  const handleShareCancel = () => {
    setShowShareModel(false);
  };
  const handleDeleteConfirmed = () => {
    onDelete();
  };
  const handleShareNote = async (noteId, shareWithName) => {
    // Implement functionality to share a note
    // Make API request to share the note
    setShowShareModel(true);
    console.log(shareWithName);
    try {
      const shareResponse = await axios.post(
        `http://localhost:4000/api/notes/${noteId}/share`,
        {
          shareWith: shareWithName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setError("Note is Shared");
      setShowShareModel(false)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError(error.message);
      }
      
    }
    setTimeout(()=>{
      setError(null);
    },1000);
  };
  return (
    <li className="note-item" key={note.id}>
      <Link to={`/notes/${note._id}`} className="note-title">
        {note.title}
      </Link>
      <div>
        <Link to={`/notes/edit/${note._id}`} className="note-buttons">
          Edit
        </Link>

        <button
          className="note-button delete-button"
          onClick={() => setShowDeleteModel(true)}
        >
          Delete
        </button>
        {showDeleteModel && (
          <DeleteConfirmationModel
            onCancel={handleCancelDelete}
            onConfirm={handleDeleteConfirmed}
          />
        )}
        <button
          className="note-button share-button"
          onClick={() => setShowShareModel(true)}
        >
          Share
        </button>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        )}
        {showShareModel && (
          <ShareModelCard
            onCancel={handleShareCancel}
            onShare={(args) => {
              handleShareNote(note._id, args);
            }}
          />
        )}
      </div>
    </li>
  );
};

export default NoteItem;
