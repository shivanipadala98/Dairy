import React, { useState } from "react";
import { createCredentials } from "./api/credentials";
import Navigation from "./navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Private from "./private";
const Credentials = () => {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [platformError, setPlatformError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkToken, setCheckToken] = useState(false);
  async function credentialsSubmit(e) {
    setPasswordError("");
    setPlatformError("");
    setUsernameError("");
    e.preventDefault();
    await createCredentials(platform, username, password)
      .then((response) => {
        console.log(response);
        if (response.status == "401") {
          navigate("/");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.message) {
          //refreshComponent();
          alert(response.message);
        }
        if (response.errors) {
          throw response.errors;
        }
        if (response.error) {
          throw response.error;
        }
      })
      .catch((error) => {
        console.log("In catch");
        console.log(error);
        for (var i = 0; i < error.length; i++) {
          switch (error[i].param) {
            case "platform":
              setPlatformError(error[i].msg);
              break;
            case "username":
              setUsernameError(error[i].msg);
              break;
            case "password":
              setPasswordError(error[i].msg);
              break;
            default:
              console.log("");
          }
        }
      });
  }
  return (
    <div>
      {/* <Private /> */}
      <Navigation />
      <div>
        <form className="credentials-form" onSubmit={credentialsSubmit}>
          <h2>Credentials</h2>
          <div className="credentials-form-fields">
            <label>Platform</label>
            <input
              type="text"
              placeholder="Enter Platform"
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
              }}
              required
            />
            <p>{platformError}</p>
          </div>
          <div className="credentials-form-fields">
            <label>UserName</label>
            <input
              type="text"
              placeholder="Enter UserName"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <p>{usernameError}</p>
          </div>
          <div className="credentials-form-fields">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <p>{passwordError}</p>
          </div>
          <div className="credentials-form-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Credentials;
