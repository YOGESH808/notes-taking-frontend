// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import useDebounce from '../../customHooks/useDebounce';
const Navbar = ({ user, onLogout, onSearchChange }) => {
  const [searchVal,setSearchVal] = useState('');
  const debouncedSearch = useDebounce(onSearchChange,1000);
  // const betterSearch = (fn,d)=>{
  //   setTimeout(()=>{
  //     fn();
  //   },d);
  // }
  const handleInputChange = (e) => {
    setSearchVal(e.target.value)
    //I want to debounce seacrh method so that api doesn't make frequnect call
    // betterSearch(onSearchChange,1000);
    debouncedSearch(e.target.value);
  }
  return (
    <nav className="navbar">
      <span>Hello, {user}</span>
      <input
        type="text"
        placeholder="Search"
        className="search-input text-black"
        onChange={handleInputChange}
        value={searchVal}

      />
      <div className="action-buttons">
        <Link className="action-button" to = "/notes/create">
          Add Note
        </Link>
        <button className="action-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
