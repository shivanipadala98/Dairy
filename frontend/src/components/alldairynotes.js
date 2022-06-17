import React from "react";
import { useState, useEffect } from "react";
import SingleNote from "./singlenote";
import { getNotes } from "./api/note";
import Navigation from "./navigation";
import { useNavigate } from "react-router-dom";
import Private from "./private";
const AllReactNotes = (props) => {
  const [dairydata, setdairyData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function updatingNote() {
      await getNotes()
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setdairyData(response);
          ///console.log(response);
        });
    }
    updatingNote();
  }, []);
  async function refreshComponent() {
    console.log("in refresh");
    await getNotes()
      .then((response) => {
        if (response.status == "401") {
          navigate("/");
        }
        return response.json();
      })
      .then((response) => {
        setdairyData(response);
      });
  }
  return (
    <div>
      {/* <Private /> */}
      <div>
        <Navigation />
      </div>
      <div className="all-diary-entries">
        {dairydata.map((entry) => (
          <SingleNote data={entry} refreshComponent={refreshComponent} />
        ))}
      </div>
    </div>
  );
};

export default AllReactNotes;
