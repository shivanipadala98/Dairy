import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/register.jpg";
import register from "./api/registerapi";
const Register = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [ageError, setAgeError] = useState("");
  function validateDetails() {
    let validateUserData = true;
    if (username.match(/^([a-zA-Z]+)$/)) {
      setUsernameError("");
    } else {
      setUsernameError("Username should have letters");
      validateUserData = false;
    }
    if (password.match(/^([a-zA-Z0-9]+){5,}$/)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "password should contain numbers and upper and lowercase letters"
      );
      validateUserData = false;
    }
    if (age.match(/^([1-9]+)$/)) {
      setAgeError("");
    } else {
      setAgeError("Age should be valid");
      validateUserData = false;
    }
    if (mobile.match(/^\d{10}$/)) {
      setMobileError("");
    } else {
      setMobileError("Mobile Number should number contain 10 digits");
      validateUserData = false;
    }
    return validateUserData;
  }
  async function registerSubmit(e) {
    setUsernameError("");
    setEmailError("");
    setAgeError("");
    setMobileError("");
    setPasswordError("");
    e.preventDefault();
    if (validateDetails()) {
      await register(username, email, password, mobile, age)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          if (response.message) {
            alert(response.message);
            navigate("/");
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
              case "username":
                setUsernameError(error[i].msg);
                break;
              case "email":
                setEmailError(error[i].msg);
                break;
              case "password":
                setPasswordError(error[i].msg);
                break;
              case "mobile":
                setMobileError(error[i].msg);
                break;
              case "age":
                setAgeError(error[i].msg);
                break;
              default:
                console.log("");
            }
          }
        });
    }
  }
  return (
    <div className="register">
      <div className="register-form-img">
        <img src={logo} alt="Diary image" />
      </div>
      <form className="register-form" onSubmit={registerSubmit}>
        <div className="register-form-header">
          <h2>Sign Up</h2>
        </div>
        <div className="register-form-fields">
          <label>UserName</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter Username"
            required
          />
          <p className="reg-err">{usernameError}</p>
        </div>
        <div className="register-form-fields">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Email"
            required
          />
          <p className="reg-err">{emailError}</p>
        </div>
        <div className="register-form-fields">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password"
            required
          />
          <p className="reg-err">{passwordError}</p>
        </div>
        <div className="register-form-fields">
          <label>Mobile</label>
          <input
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            placeholder="Enter Mobile Number"
            required
          />
          <p className="reg-err">{mobileError}</p>
        </div>
        <div className="register-form-fields">
          <label>Age</label>
          <input
            type="age"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            placeholder="Enter Current Age"
            required
          />
          <p className="reg-err">{ageError}</p>
        </div>
        <div className="not-register">
          <p
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Already a user? <b>Sign in </b>here
          </p>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
