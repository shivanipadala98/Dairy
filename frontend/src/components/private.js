import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Home from "./home";
import Note from "./note";
import Credentials from "./credentials";
import AllNotes from "./alldairynotes";
import AllCredentials from "./allcredentials";
function Private() {
  const [checkToken, setCheckToken] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function validateUser() {
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await fetch("/verify", requestOptions).then((response) => {
        console.log(response.status);
        response.status == 200 ? setCheckToken(true) : navigate("/login");
      });
    }
    validateUser();
  });
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/note" element={<Note />} />
        <Route path="/allnotes" element={<AllNotes />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/allcredentials" element={<AllCredentials />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default Private;
