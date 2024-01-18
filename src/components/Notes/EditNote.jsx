import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNote() {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });
    const [error, setError] = useState(null);

    const { noteId } = useParams();
    const navigate = useNavigate();
    const handleAlert = (alertType, msg) => {
        setError({
            type: alertType,
            msg: msg,
        });
        setTimeout(() => {
            setError(null);
        }, 1500);
    };
    const displayAlert = (alertType, msg) => {
        return (
            <div
                className={`${alertType == "Success" ? "bg-green-500" : "bg-red-500"
                    } p-3 fixed top-0 z-10 text-brightWhite mx-auto font-medium rounded-b-lg flex items-center`}
            >
                {msg}
            </div>
        );
    };
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/notes/${noteId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const noteData = {
                    title: response.data.title,
                    content: response.data.content,
                };
                setNote(noteData);
            } catch (error) {
                if (error.response) {
                    handleAlert("failure", error.response.data.message || "Server Error");
                  } else if (error.request) {
                    handleAlert("failure", "Network Error");
                  } else {
                    handleAlert("failure", "Unexpected Error");
                  }
            }
        };

        fetchNote();
    }, [noteId]);

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:4000/api/notes/${noteId}`,
                {
                    title: note.title,
                    content: note.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
                //notify the parent component
            );
            navigate("/notes");
        } catch (error) {
            if (error.response) {
                handleAlert("failure", error.response.data.message || "Server Error");
              } else if (error.request) {
                handleAlert("failure", "Network Error");
              } else {
                handleAlert("failure", "Unexpected Error");
              }
        }
    };

    const handleCancel = async () => {
        navigate("/notes");
    };
    return (
        <div className="container mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
            {error && displayAlert(error.type, error.msg)}

            <div className="grid grid-cols-2 gap-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Title:
                </label>
                <input
                    type="text"
                    id="title"
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                />

                <label
                    htmlFor="content"
                    className="block text-gray-700 font-medium mb-2"
                >
                    Content:
                </label>
                <textarea
                    id="content"
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 resize-none"
                />
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Update Now
                </button>
                <button
                    onClick={handleCancel}
                    className="ml-4 px-4 py-2 border border-blue-500 text-blue-500 font-medium rounded-md hover:bg-blue-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
