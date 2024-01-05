// Import necessary styles or add styles directly in your component
import './NoteList.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleAction = async (action, noteId) => {
        try {
            switch (action) {
                case 'edit':
                    // Handle edit logic
                    //clicking on edit user should land on edit form component ,where he can edit the notes
                    break;
                case 'delete':
                    // Make API request to delete the note
                    await axios.delete(`http://localhost:4000/api/notes/${noteId}`, {
                        headers: {
                            'Authorization': `Bearer${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    // Update the UI by fetching the updated notes
                    await fetchNotes();
                    break;
                case 'create':
                    // Make API request to create a new note
                    // console.log();
                    const token = localStorage.getItem('token');
                    const response = await axios.post(
                        'http://localhost:4000/api/notes',
                        {
                            content: newNoteContent,
                            title: newNoteTitle,
                        },
                        {
                            headers: {
                                'Authorization': `Bearer${token}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    console.log(response);
                    // Update the UI by fetching the updated notes
                    await fetchNotes();
                    setNewNoteContent(''); // Clear the input field after creating a note
                    setNewNoteTitle(''); // Clear the input field after creating a note
                    break;
                case 'share':
                    const shareWithName = window.prompt('Enter the name of the user to share with:');
                    // Make API request to share the note
                    const shareResponse = await axios.post(
                        `http://localhost:4000/api/notes/${noteId}/share`,
                        {
                            shareWith:shareWithName
                        },
                        {
                            headers: {
                                'Authorization': `Bearer${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    // Update the UI by fetching the updated notes
                    await fetchNotes();
                    break;
                case 'search':
                    // Make API request to search for notes
                    const searchResponse = await axios.get(
                        `http://localhost:4000/api/search?q=${searchQuery}`,
                        {
                            headers: {
                                'Authorization': `Bearer${localStorage.getItem('token')}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    // Update the UI with the search results
                    setNotes(searchResponse.data);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(`Error handling ${action} action:`, error);
        }
    };

    const fetchNotes = async () => {
        try {
            // Make API request to fetch notes
            const response = await axios.get('http://localhost:4000/api/notes', {
                headers: {
                    'Authorization': `Bearer${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            // Update the state with the fetched notes
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Fetch notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>Your Notes</h2>

            {/* Create New Note */}
            <div>
                <label>Create New Note:</label>
                <textarea
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    placeholder='title'
                />
                <br></br>
                <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    placeholder='content'
                />

                <button onClick={() => handleAction('create')}>Create Note</button>
            </div>

            {/* Search Notes */}
            <div>
                <label>Search Notes:</label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => handleAction('search')}>Search</button>
            </div>

            <div className="notes-list">
                {notes.map((note) => (
                    <div className="note-card" key={note._id}>
                        <h3 className="note-title">{note.title}</h3>
                        <p className="note-content">{note.content}</p>
                        <p className="note-created-at">Created at: {note.createdAt}</p>
                        <p className="note-owner">Owner: {note.owner}</p>
                        {/* Additional details as needed */}
                        <button onClick={() => handleAction('edit', note._id)}>Edit</button>
                        <button onClick={() => handleAction('delete', note._id)}>Delete</button>
                        <button onClick={() => handleAction('share', note._id)}>Share</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotesList;
