import React, { useState } from "react";
import "./styles.css";
import Login from "../Login";
import Signup from "../Signup";

function SignupSignin() {
  let [loginForm, setLoginForm] = useState(true);
  
  return (
    <div className="signup-wrapper">
      {
        loginForm ?
        <Login loginForm={loginForm} setLoginForm={setLoginForm} /> :
        <Signup loginForm={loginForm} setLoginForm={setLoginForm} />
      }
    </div>
  );
}

export default SignupSignin;
