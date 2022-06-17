import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import Note from "./components/note";
import Credentials from "./components/credentials";
import AllNotes from "./components/alldairynotes";
import AllCredentials from "./components/allcredentials";
import Private from "./components/private";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Private />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
