import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import "./Header.css";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import logo from "./logo2.png";

function Header() {
  return (
    <div className="header">
      <Link to="/home">
        <img className="app__headerImage" src={logo} alt="" />
      </Link>
      <div className="buttons">
        <div className="search">
          <Link to="/Search">
            <Button variant="contained" color="primary">
              <SearchIcon fontSize="large" />
              Search
            </Button>
          </Link>
        </div>
        <div className="profile">
          <Link to="/profile">
            <Button variant="contained" color="primary">
              <PersonIcon fontSize="large" />
              Profile
            </Button>
          </Link>
        </div>
        <AuthOptions />
      </div>
    </div>
  );
}

export default Header;
