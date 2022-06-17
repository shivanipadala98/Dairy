const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const Logindb = require("../db/login");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const validate = [
  body("email").isEmail().withMessage("Enter valid email"),
  body("password").notEmpty().withMessage("Password should not be empty"),
];

router.post("/", jsonParser, validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const user = await db.users.findByPk(req.body.email);
      if (!user) {
        res.json({
          message: "not a valid user",
        });
      } else {
        let userpassword = user.toJSON().password;
        console.log(userpassword);
        const isUserPassword = bcrypt.compareSync(
          req.body.password,
          userpassword
        );
        console.log(isUserPassword);
        if (isUserPassword) {
          const payload = {
            email: req.body.email,
            password: userpassword,
          };
          const token = jwt.sign(payload, "secret123");
          res.json({ jwt: token });
        } else {
          res.json({
            message: "Password is not Valid",
          });
        }
      }
    } catch (error) {
      res.json({
        error: error.toString(),
      });
    }
  }
});

module.exports = router;
