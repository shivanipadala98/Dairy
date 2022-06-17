import { useState } from "react";
async function getNotes() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return fetch("/dairy/view", requestOptions);
}

async function createNotes(description, value, img) {
  console.log(value);
  var options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const Date = value.toLocaleString("en", options).split("/");
  const realDate = [Date[2], Date[0], Date[1]].join("-");
  console.log(realDate);
  const formData = new FormData();
  formData.append("description", description);
  formData.append("date", realDate);
  formData.append("file", img);
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  };
  console.log(description);
  //console.log(requestOptions);
  return fetch("/dairy/create", requestOptions);
}

async function updateNotes(description, id) {
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: description,
      id: id,
    }),
  };
  return fetch("dairy/update", requestOptions);
}
async function deleteNotes(id) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return fetch(`dairy/delete/${id}`, requestOptions);
}

export { createNotes, getNotes, updateNotes, deleteNotes };
