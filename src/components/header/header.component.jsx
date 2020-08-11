import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";
const Header = () => {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log("SignOut"));
  };

  return (
    <div className="header">
      <Link className="nav" to="/">
        Chit-Chat
      </Link>
      {auth().currentUser ? (
        <div className="nav logout" onClick={signOut}>
          Logout
        </div>
      ) : null}
    </div>
  );
};

export default Header;
