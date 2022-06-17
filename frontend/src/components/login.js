import React, { useState } from "react";
import logo from '../img/Capture.JPG';
import login from "./api/loginapi";
import { useNavigate } from "react-router-dom";

const Login=(props)=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");  

    return(
        <div className="login">
            <div className="login-form-img">
                <img src={logo} alt="Diary image"/>
            </div>
            <form className="login-form">
            <div className="login-form-header">
                <h2>Log In</h2>
            </div>
            <div className="login-form-fields">
                <label>Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email" required/>
            </div>
            <div className="login-form-fields">
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter password" required/>
            </div>
            <div className="not-login">
                <p onClick={(e)=>{
                    e.preventDefault();
                    navigate("/register");
                }}>Not Registered? <b>Sign Up</b> here</p>
            </div>
            <div className="login-form-btn">
                <button type="submit"
                onClick={async (e) => {
                    e.preventDefault();
                    //console.log(`Inside onClick handler: email: ${email}`);
                    const response = await login(email, password).then((response)=>{
                        return response.json();
                    });
                    localStorage.setItem("token", response.jwt);
                    navigate("/home");
                    console.log(`token: ${localStorage.getItem("token")}`);
                  }} 
                >Sign In</button>
            </div>
        </form>
        </div>
        
    )
}

export default Login;