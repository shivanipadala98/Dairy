const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const UserDb = require("../db/register");
const db = require("../models");
const validate = [
  body("username").isAlpha().withMessage("Username must be a alphabets"),
  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .custom((value) => {
      return db.users.findByPk(value).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  body("mobile")
    .isNumeric()
    .withMessage("Only Decimals allowed")
    .isLength({ min: 10, max: 10 })
    .withMessage("Length must be 10 only"),
  body("age").isNumeric().withMessage("Only Decimals are allowed"),
];

router.post("/user", jsonParser, validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const hashPassword = bcrypt.hashSync(req.body.password, 5);
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      mobile: req.body.mobile,
      age: req.body.age,
    };
    try {
      const user = await UserDb.createUser(data);
      res.json({
        message: `Created a new user`,
      });
    } catch (err) {
      res.json({
        error: err.toString(),
      });
    }
  }
});

module.exports = router;
