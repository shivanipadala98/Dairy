import React from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { deleteCredentials } from "./api/credentials";
import { updateCredentials } from "./api/credentials";

const SingleCredentials = (props) => {
  const [edit, setIsEdit] = useState(false);
  const [platform, setPlatform] = useState(props.data.platform);
  const [username, setUsername] = useState(props.data.username);
  const [password, setPassword] = useState(props.data.password);
  const [platformError, setPlatformError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  async function deleteCredential() {
    await deleteCredentials(props.data.id).then((response) => {
      props.refreshComponent();
    });
  }
  async function updateCredential(e) {
    setPasswordError("");
    setPlatformError("");
    setUsernameError("");
    e.preventDefault();
    await updateCredentials(platform, username, password, props.data.id)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.message) {
          setIsEdit(false);
          props.refreshComponent();
          alert(response.message);
        }
        if (response.errors) {
          throw response.errors;
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
    <div className="singleCredential">
      {edit ? (
        <form onSubmit={updateCredential}>
          <div className="update-entry-close">
            <AiFillCloseCircle onClick={() => setIsEdit(false)} />
          </div>
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
          <div className="credentials-update-btn">
            <button className="cre-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="edit-btn">
            <FiEdit
              className="edit-icon"
              onClick={() => {
                setIsEdit(true);
              }}
            />
            <AiFillDelete className="delete-icon" onClick={deleteCredential} />
          </div>
          <div className="singleCredentialData">
            <label>Platform:</label>
            <p>{props.data.platform}</p>
          </div>
          <div className="singleCredentialData">
            <label>UserName:</label>
            <p>{props.data.username}</p>
          </div>
          <div className="singleCredentialData">
            <label>Password:</label>
            <p>{props.data.password}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCredentials;
