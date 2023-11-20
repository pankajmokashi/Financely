import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Login({ loginForm, setLoginForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function loginWithEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          toast.success("Successfully Logged In!");
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="title">
        Login on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          type={"email"}
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"johndoe@gmail.com"}
        />
        <Input
          type={"password"}
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Button
          text={loading ? "Loading..." : "Login using Email and Password"}
          onClick={loginWithEmail}
          disabled={loading}
        ></Button>
        <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
          Or Don't Have An Account? Click Here.
        </p>
      </form>
    </div>
  );
}

export default Login;
