import { useState,useEffect } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import NotesList from "./components/Notes/NotesList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    setIsLoggedIn(isAuthenticated);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <NotesList />
      ) : (
        <Login onLoginSuccess = {handleLoginSuccess}/>
      )}
    </>
  );
}

export default App;
