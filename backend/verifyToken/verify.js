const jwt = require("jsonwebtoken");
const db = require("../models/index");
const verify = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    if (token) {
      try {
        var decoded = jwt.verify(token, "secret123");
        if (decoded.email && decoded.password) {
          const user = await db.users.findByPk(decoded.email);
          if (!user) {
            res.status(401).json({
              message: "not a valid user",
            });
          } else {
            let userpassword = user.toJSON().password;
            console.log(userpassword);
            const isUserPassword =
              userpassword == decoded.password ? true : false;
            console.log(isUserPassword);
            if (isUserPassword) {
              req.userDetails = { email: decoded.email };
              console.log(req.userDetails);
              next();
            } else {
              res.status(401).json({
                message: "Password is not Valid",
              });
            }
          }
        } else {
          res.status(401).json({
            error: "Data missing",
          });
        }
      } catch (error) {
        res.status(401).json({
          error: error.toString(),
        });
      }
    } else {
      res.status(401).json({
        message: "Token Missing",
      });
    }
  } else {
    res.status(401).json({
      message: "authorizationHeader Missing",
    });
  }
};

module.exports = verify;
