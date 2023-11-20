import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { RxPerson } from "react-icons/rx";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  function logoutFnc() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logout Succssful!");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile-img"
              style={{
                borderRadius: "50%",
                height: "2rem",
                width: "2rem",
              }}
            />
          ) : (
            <RxPerson style={{
              color: "#645555",
              height: "1.5rem",
              width: "1.5rem",
            }}/>
          )}
          <p className="logo link" onClick={logoutFnc}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
