import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <li className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 w-full md:w-80 h-72 overflow-hidden mx-auto mb-4 shadow-md hover:shadow-lg rounded-lg bg-white" key={note.id}>
    <Link to={`/notes/${note._id}`} className="block p-4 font-semibold text-lg hover:underline">
      {note.title}
    </Link>
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <Link to={`/notes/edit/${note._id}`} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md text-sm">
        Edit
      </Link>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md text-sm"
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-sm"
        onClick={() => setShowShareModel(true)}
      >
        Share
      </button>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2">
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
