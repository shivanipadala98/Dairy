import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { deleteNotes, updateNotes } from "./api/note";
import Image from "./image";

const SingleNote = (props) => {
  const [isupdateClicked, setisupdateClicked] = useState(false);
  const [autosave, setAutosave] = useState();
  const [edit, setIsEdit] = useState(false);
  const [description, setdescription] = useState(props.data.description);
  const [descriptionError, setdescriptionError] = useState("");
  async function deleteNote() {
    await deleteNotes(props.data.id).then((response) => {
      props.refreshComponent();
    });
  }
  async function updateNote(e) {
    console.log("calling..");
    setdescriptionError("");
    e.preventDefault();
    await updateNotes(description, props.data.id)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (isupdateClicked) {
          setIsEdit(false);
          clearInterval(autosave);
        }
        props.refreshComponent();

        if (response.errors) {
          throw response.errors;
        }
      })
      .catch((error) => {
        console.log("In catch");
        console.log(error);
        for (var i = 0; i < error.length; i++) {
          switch (error[i].param) {
            case "description":
              setdescriptionError(error[i].msg);
              break;
            default:
              console.log("");
          }
        }
      });
  }
  return (
    <div className="diary-entry card">
      {edit ? (
        <form className="update-entry" onSubmit={updateNote}>
          <div className="update-entry-close">
            <AiFillCloseCircle
              onClick={() => {
                setIsEdit(false);
                clearInterval(autosave);
              }}
            />
          </div>
          <div>{props.data.date}</div>
          <div>
            <label>
              <h3>Update Note</h3>
            </label>
            <textarea
              rows={10}
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            ></textarea>
            <p>{descriptionError}</p>
          </div>
          <div className="update-entry-btn">
            <button
              type="submit"
              id="update"
              onClick={(e) => {
                e.isTrusted
                  ? setisupdateClicked(true)
                  : setisupdateClicked(false);
              }}
            >
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
                setAutosave(
                  setInterval(() => {
                    document.getElementById("update").click();
                  }, 15000)
                );
              }}
            />
            <AiFillDelete className="delete-icon" onClick={deleteNote} />
          </div>
          <p>{props.data.description}</p>
          <p>{props.data.date}</p>
          {props.data.image ? <Image path={props.data.image} /> : ""}
        </div>
      )}
    </div>
  );
};

export default SingleNote;
