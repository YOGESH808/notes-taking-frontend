import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import NoteList from "./NotesList";
const NotesHome = ({onLogout,userName}) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Navbar
        user={userName}
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
