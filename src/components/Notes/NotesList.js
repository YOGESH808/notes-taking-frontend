// Import necessary styles or add styles directly in your component
import './NoteList.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditForm from './EditNote';
import 'bootstrap/dist/css/bootstrap.min.css';
const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [userNotes, setUserNotes] = useState([]);
    const [sharedNotes, setSharedNotes] = useState([]);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);

    const handleAction = async (action, noteId) => {
        try {
            switch (action) {
                case 'edit':
                    setEditingNoteId(noteId);
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
            console.log(response.data);
            setNotes(response.data);
            setUserNotes(response.data.userNotes);
            setSharedNotes(response.data.sharedNotes);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };
    const handleUpdateNote = () => {
        // Reset the editingNoteId to exit the edit mode
        setEditingNoteId(null);

        // Fetch the updated notes
        fetchNotes();
    };


    // Fetch notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    return (

        <div>
            <h2>Your Notes</h2>
            <form className='container'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Note Title</label>
                    <input type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Note Content</label>
                    <input type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => handleAction('create')}>Submit</button>
            </form>
            <div className='container'>
                <h3>Notes Owned by User</h3>

                <div className="notes-list container mt-3">
                    {userNotes.map((note) => (
                        <div className="note-card" key={note._id}>
                            {editingNoteId === note._id ? (
                                <EditForm
                                    noteId={note._id}
                                    onCancel={() => setEditingNoteId(null)}
                                    onUpdate={handleUpdateNote}
                                />
                            ) : (
                                <>
                                    <h3 className="note-title">{note.title}</h3>
                                    <p className="note-content">{note.content}</p>
                                    <p className="note-created-at">Created at: {note.createdAt}</p>
                                    <p className="note-owner">Owner: {note.owner}</p>
                                    {/* Additional details as needed */}
                                    <button onClick={() => handleAction('edit', note._id)} >Edit</button>
                                    <button onClick={() => handleAction('delete', note._id)}>Delete</button>
                                    <button onClick={() => handleAction('share', note._id)}>Share</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <h3>Notes Shared With User</h3>
                <div className="notes-list container mt-3">
                    {sharedNotes.map((note) => (
                        <div className="note-card" key={note._id}>
                            {editingNoteId === note._id ? (
                                <EditForm
                                    noteId={note._id}
                                    onCancel={() => setEditingNoteId(null)}
                                    onUpdate={handleUpdateNote}
                                />
                            ) : (
                                <>
                                    <h3 className="note-title">{note.title}</h3>
                                    <p className="note-content">{note.content}</p>
                                    <p className="note-created-at">Created at: {note.createdAt}</p>
                                    <p className="note-owner">Owner: {note.owner}</p>
                                    {/* Additional details as needed */}
                                    <button onClick={() => handleAction('delete', note._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <div>
                <button onClick={() => {
                    localStorage.removeItem('token');
                }}>LogOut</button>
            </div>
        </div>
    );
};

export default NotesList;
