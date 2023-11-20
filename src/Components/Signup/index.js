import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Signup({ loginForm, setLoginForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("user>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("Doc already exists!");
    }
  }

  return (
    <div>
      <h2 className="title">
        Sign up on <span style={{ color: "var(--theme)" }}>Financely.</span>
      </h2>
      <form>
        <Input
          type={"text"}
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
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
        <Input
          type={"password"}
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button
          text={loading ? "Loading..." : "Signup using Email and Password"}
          onClick={signupWithEmail}
          disabled={loading}
        ></Button>
        <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
          Or Have An Account Already? Click Here.
        </p>
      </form>
    </div>
  );
}

export default Signup;
