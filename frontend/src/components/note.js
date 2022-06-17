import Calendar from "react-calendar";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Navigation from "./navigation";
import { createNotes, getNotes } from "./api/note";
import SingleNote from "./singlenote";
import { useNavigate } from "react-router-dom";
import Private from "./private";
const Note = () => {
  const navigate = useNavigate();
  const [img, setimg] = useState();
  //const [isUser, setisUser] = useState("false");
  const [value, onChange] = useState(new Date());
  const [descriptionError, setdescriptionError] = useState("");
  const [dateError, setdateError] = useState("");
  const [description, setdescription] = useState("");
  const [dairydata, setdairyData] = useState([]);
  let [filterDairyData, setFilterDairyData] = useState([]);
  useEffect(() => {
    async function updatingNote() {
      await getNotes()
        .then((response) => {
          // console.log(response);
          return response.json();
          //setdairyData(response);
          ///console.log(response);
        })
        .then((response) => {
          setdairyData(response);
        });
    }
    updatingNote();
    setFilterDairyData(
      dairydata.filter((data) => {
        return new Date(data.date).toDateString() == new Date().toDateString();
      })
    );
  }, []);
  async function refreshComponent() {
    console.log("in refresh");
    await getNotes()
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setdairyData(response);
        setFilterDairyData(
          response.filter((data) => {
            return new Date(data.date).toDateString() == value.toDateString();
          })
        );
        console.log(filterDairyData);
      });
  }

  async function onSubmithandler(e) {
    setdescriptionError("");
    setdateError("");
    e.preventDefault();
    await createNotes(description, value, img)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.message) {
          refreshComponent();
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
            case "description":
              setdescriptionError(error[i].msg);
              break;
            case "date":
              setdateError(error[i].msg);
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
      <div className="note">
        <form className="note-form" onSubmit={onSubmithandler}>
          <div>
            <label>
              <h2>Add Note</h2>
            </label>
            <textarea
              placeholder="Write your Dairy Note here..."
              rows={19}
              cols={80}
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            ></textarea>
            <p>{descriptionError}</p>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setimg(e.target.files[0]);
              }}
            />
          </div>
          <div className="note-form-btn">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="note-cal">
          <Calendar
            onChange={(selectedDate) => {
              console.log(selectedDate.toDateString());
              setFilterDairyData(
                dairydata.filter((data) => {
                  return (
                    new Date(data.date).toDateString() ==
                    selectedDate.toDateString()
                  );
                })
              );
              onChange(selectedDate);
            }}
            value={value}
          />
          <p>{dateError}</p>
        </div>
      </div>
      <div className="all-diary-entries">
        {filterDairyData.map((entry, i) => (
          <SingleNote
            refreshComponent={refreshComponent}
            data={entry}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
export default Note;
