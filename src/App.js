import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import { CreateNote, EditNote, NoteDetails, NotesHome} from "./components/Notes/index.js";



function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("token") !== null);

  const handleLoginSucess = () => {
    setAuthenticated(true);
  };

  const handleLogout = async() => {
    await localStorage.setItem("token", "");
    setAuthenticated(false);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard}></Route>
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSucess} />}
          ></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route
            path="/notes"
            element={
              authenticated ? (
                <NotesHome onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notes/create"
            element={authenticated ? <CreateNote /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/:noteId"
            element={authenticated ? <NoteDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes/edit/:noteId"
            element={authenticated ? <EditNote /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
