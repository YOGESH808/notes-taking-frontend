import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
export default function EditNote() {
    const [note, setNote] = useState({
        title: '',
        content: ''
    });

    const {noteId} = useParams(); 
    const navigate =useNavigate();
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/notes/${noteId}`, {
                    headers: {
                        'Authorization': `Bearer${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const noteData = {
                    title: response.data.title,
                    content: response.data.content,
                }
                setNote(noteData);
            } catch (error) {
                console.error('Error fetching note for editing:', error);
            }
        };

        fetchNote();
    }, [noteId]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/api/notes/${noteId}`,
                {
                    title: note.title,
                    content: note.content
                },
                {
                    headers: {
                        'Authorization': `Bearer${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                }
                //notify the parent component

            );
            navigate("/notes");
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancel = async()=>{
 
      navigate("/notes");
    }
    return (
        <div>
            <h2>Edit Note</h2>
            <label>
                Title:
            </label>
            <input
                type='text'
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
            />

            <label>
                Content:
            </label>

            <textarea
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
            <button onClick={handleUpdate}>Update Now</button>
            <button onClick={handleCancel}>Cancel</button>

        </div>
    )
}
