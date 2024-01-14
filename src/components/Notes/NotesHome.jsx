import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NoteList from "./NotesList";
const NotesHome = ({onLogout}) => {
  const [user, setUser] = useState({ name: "John" }); 
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Navbar
        user={user}
        onLogout={onLogout}
        onSearchChange={setSearchTerm}
      />
      <NoteList
        searchQuery={searchTerm}
      />
    </div>
  );
};

export default NotesHome;
