import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <Link to="/">
        <img
          className="app__headerImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </Link>
      <Link to="/Search">
        Search
      </Link>
      <AuthOptions />
    </div>
  );
}

export default Header;
