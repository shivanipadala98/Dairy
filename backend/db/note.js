const db = require("../models/index");
const note = require("../models/note");

async function createNote({
  description,
  date,
  email,
  image,
  createdAt,
  updatedAt,
}) {
  return db.note.create({
    description,
    date,
    email,
    image,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

async function getWritings(email) {
  return db.note.findAll({
    where: {
      email: email,
    },
  });
}

async function updateNote(description, id) {
  return db.note.update(
    { description: description },
    {
      where: {
        id: id,
      },
    }
  );
}

async function deleteNote(id) {
  return db.note.destroy({
    where: {
      id: id,
    },
  });
}

module.exports = { createNote, getWritings, updateNote, deleteNote };
