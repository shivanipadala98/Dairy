const express = require("express");
const router = express.Router();
const db = require("../models/index");
const { body, param, validationResult } = require("express-validator");
const verifyToken = require("../verifyToken/verify");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const notedb = require("../db/note");
const path = require("path");

const validate = [
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description min Length is 5"),
  body("date").isDate().withMessage("Date should be in a valid way"),
];

router.post("/create", verifyToken, validate, async (req, res) => {
  console.log("In func");
  console.log(req.body);
  console.log(req.userDetails);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    const data = {
      description: req.body.description,
      date: req.body.date,
      email: req.userDetails.email,
      image: "",
    };
    try {
      db.users.findByPk(data.email).then((user) => {
        if (user) {
          if (req.files) {
            let filename = req.files.file;
            let image = Date.now() + filename.name;
            filename.mv("./public/" + image);
            data.image = image;
          }
          notedb
            .createNote(data)
            .then((response) => {
              res.status(200).json({ message: "Note is Added" });
            })
            .catch((error) => {
              if (error.name == "SequelizeUniqueConstraintError") {
                res.status(400).json({
                  errors: [
                    {
                      msg: "Date already exists",
                      param: "date",
                    },
                  ],
                });
              }
              console.log(error.name);
            });
        } else {
          res.json({
            message: "email doesn't exist",
          });
        }
      });
    } catch (error) {
      res.json({
        error: error.toString(),
      });
    }
  }
});

const emailValidate = [
  param("email").isEmail().withMessage("Enter a valid email"),
];

router.get("/view", verifyToken, emailValidate, async (req, res) => {
  try {
    const showWritings = await notedb.getWritings(req.userDetails.email);
    console.log(req.userDetails.email);
    res.json(showWritings);
  } catch (error) {
    res.json({
      error: error.toString(),
    });
  }
});

router.get("/view/:path", verifyToken, async (req, res) => {
  console.log("In img func");
  const directory = path.parse(__dirname);
  res.sendFile(path.join(directory.dir, "public", req.params.path));
});

const updatevalidate = [
  body("id").isNumeric().withMessage("Id should be in Numerics"),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description min Length is 5"),
];

router.put(
  "/update",
  jsonParser,
  verifyToken,
  updatevalidate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const data = {
        id: req.body.id,
        description: req.body.description,
        email: req.userDetails.email,
      };
      try {
        const idCheck = db.note.findByPk(data.id).then((entry) => {
          if (entry) {
            console.log(entry.toJSON());
            const entryjson = entry.toJSON();
            if (entryjson.email == req.userDetails.email) {
              try {
                const updatedWriting = notedb.updateNote(
                  data.description,
                  data.id
                );
                res.json(updatedWriting);
              } catch (error) {
                res.json({
                  error: error.toString(),
                });
              }
            } else {
              res.json({
                message: "email doesn't exist",
              });
            }
          } else {
            res.json({
              message: "Id doesn't exist",
            });
          }
        });
      } catch (error) {
        res.json({
          error: error.toString(),
        });
      }
    }
  }
);

const deletevalidate = [
  param("id").isNumeric().withMessage("Id should be in Numerics"),
];

router.delete("/delete/:id", verifyToken, deletevalidate, async (req, res) => {
  console.log(req.params.id);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    try {
      //console.log(req.params.id);
      const idCheck = db.note.findByPk(req.params.id).then((entry) => {
        if (entry) {
          const deleteWritings = notedb.deleteNote(req.params.id);
          console.log(req.params.id);
          res.json(deleteWritings);
        } else {
          res.json({
            message: "No entry with this id",
          });
        }
      });
    } catch (error) {
      res.json({
        error: error.toString(),
      });
    }
  }
});

module.exports = router;
