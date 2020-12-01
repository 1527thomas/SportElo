import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import "./Header.css";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import logo from'./logo.png';

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
      <div className="buttons">
        <div className="search">
          <Link to="/Search">
          <Button variant="contained" color="primary">
            <SearchIcon fontSize ="large"/>
              
                Search
                
          </Button>
          </Link> 
        </div>
      <AuthOptions />
      </div>
    </div>
  );
}

export default Header;
