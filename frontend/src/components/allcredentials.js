import React, { useState, useEffect } from "react";
import Navigation from "./navigation";
import { AiFillDelete, AiFillCloseCircle } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import SingleCredentials from "./singlecredentials";
import { getAllCredentials } from "./api/credentials";
import { useNavigate } from "react-router-dom";
import Private from "./private";
const AllCredentials = () => {
  const [credentialsdata, setCredentialsData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function updatingCredentials() {
      await getAllCredentials()
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setCredentialsData(response);
        });
    }
    updatingCredentials();
  }, []);
  async function refreshComponent() {
    console.log("in refresh");
    // await getAllCredentials().then((response) => {
    //   setCredentialsData(response);
    // });
    await getAllCredentials()
      .then((response) => {
        if (response.status == "401") {
          navigate("/");
        }
        return response.json();
      })
      .then((response) => {
        setCredentialsData(response);
      });
  }
  return (
    <div>
      {/* <Private /> */}
      <Navigation />
      <div className="allcredentials">
        {credentialsdata.length > 0
          ? credentialsdata.map((entry) => (
              <SingleCredentials
                data={entry}
                refreshComponent={refreshComponent}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default AllCredentials;
