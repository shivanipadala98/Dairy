import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Note from "../img/Dear_Diary.jpg";
import Credentials from "../img/Credentials.JPG";
import { useNavigate } from "react-router-dom";
import Navigation from "./navigation";
import { useEffect } from "react";
import Private from "./private";
const Home = (props) => {
  const [checkToken, setCheckToken] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      {/* <Private /> */}
      <Navigation />
      <div className="cards home-cards">
        <div
          className="card home-card one"
          onClick={() => {
            navigate("/note");
          }}
        >
          <img src={Note} alt="Note" />
          <div className="container">
            <h4>To write a Note</h4>
          </div>
        </div>
        <div
          className="card home-card two"
          onClick={() => {
            navigate("/credentials");
          }}
        >
          <img src={Credentials} alt="Credentials" />
          <div className="container">
            <h4>
              <b>To hide Credentials</b>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
