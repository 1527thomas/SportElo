import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import "./Header.css";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import logo from'./logo2.png';

function Header() {
  return (
    <div className="header">
      <Link to="/home">
        <img
          className="app__headerImage"
          src={logo}
          alt=""
          height =" 90px"
          width = "125px"
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
