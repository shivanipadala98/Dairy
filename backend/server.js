const express = require("express");
const PORT = 3005;
const app = express();
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const noteRouter = require("./routes/notes");
const credentialsRouter = require("./routes/credentials");
const fileupload = require("express-fileupload");
const tokenverify = require("./routes/tokencheck");
app.use(
  fileupload({
    createParentPath: true,
  })
);
app.use(express.json());
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/dairy", noteRouter);
app.use(express.urlencoded({ extended: true }));
app.use("/credentials", credentialsRouter);
app.use("/verify", tokenverify);

app.listen(PORT, () => {
  console.log("App is up now");
});
