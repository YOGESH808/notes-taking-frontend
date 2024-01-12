import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import NotesList from "./components/Notes/NotesList";
import { useEffect, useState } from "react";

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
          <Route path="/notes" element={authenticated?<NotesList/>:<Login onLoginSuccess={handleLoginSucess}/>}></Route>
          {/* <Route path="/notes/:noteId" element={authenticated?<NoteDetails/>:<Login onLoginSuccess={handleLoginSucess}/>}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
