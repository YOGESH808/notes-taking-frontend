import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import NoteList from "./NotesList";
import UserContext from "../../context/UserContext";
const NotesHome = ({onLogout}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {user} =useContext(UserContext)
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
