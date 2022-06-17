import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const [toggle, setIsToogle] = useState(false);
  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function toggleMenu() {
    if (toggle) {
      document
        .getElementById("hamburger-menu")
        .classList.remove("hamburger-menu-animation-open");
      document
        .getElementById("hamburger-menu")
        .classList.add("hamburger-menu-animation-cls");
    } else {
      document
        .getElementById("hamburger-menu")
        .classList.remove("hamburger-menu-animation-cls");
      document
        .getElementById("hamburger-menu")
        .classList.add("hamburger-menu-animation-open");
    }
    setIsToogle(!toggle);
  }
  return (
    <div>
      <nav class="menu">
        <div class="normal-menu">
          <ul class="normal-menu-links">
            <li>
              <a
                className="home nav-link"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/note");
                }}
              >
                Note
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/credentials");
                }}
              >
                Credentials
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/allnotes");
                }}
              >
                All Notes
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/allcredentials");
                }}
              >
                All Credentials
              </a>
            </li>
          </ul>
          <div>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div class="hamburger-menu" id="hamburger-menu">
          <div>
            <i
              class="bx bx-menu bx-md"
              onClick={toggleMenu}
              style={{ color: "white", cursor: "pointer" }}
            ></i>
          </div>
          <ul class="menu-links">
            <li>
              <a
                className="home nav-link"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/note");
                }}
              >
                Note
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/credentials");
                }}
              >
                Credentials
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/allnotes");
                }}
              >
                All Notes
              </a>
            </li>
            <li>
              <a
                className="nav-link"
                onClick={() => {
                  navigate("/allcredentials");
                }}
              >
                All Credentials
              </a>
            </li>
            <li className="logoutbtn">
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
