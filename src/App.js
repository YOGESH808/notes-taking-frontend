import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import { useEffect, useState } from "react";
import CreateNote from "./components/Notes/CreateNote";
import NotesHome from "./components/Notes/NotesHome";
import NoteDetails from "./components/Notes/NoteDetails";
import EditNote from "./components/Notes/EditNote";

function App() {
  const [authenticated,setAuthenticated] = useState(false);
  useEffect(()=>{
    const isAuthenticated = localStorage.getItem('token') !== null;
    setAuthenticated(isAuthenticated);
  },[]);
  const handleLoginSucess = ()=>{
    setAuthenticated(true);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard}></Route>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSucess}/>}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/notes" element={authenticated?<NotesHome/>:<Login onLoginSuccess={handleLoginSucess}/>}></Route>
          <Route path="/notes/create" element={authenticated?<CreateNote/>:<Login onLoginSuccess={handleLoginSucess}/>}></Route>
          <Route path="/notes/:noteId" element={authenticated?<NoteDetails/>:<Login onLoginSuccess={handleLoginSucess}/>}></Route>
          <Route path="/notes/edit/:noteId" element={authenticated?<EditNote/>:<Login/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
