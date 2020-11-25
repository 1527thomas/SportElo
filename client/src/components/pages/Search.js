import React, { useState } from "react";
// import "../../App.css";
import "./Search.css";

function Search() {
    //Search Page
    //Header

    //Search for Your Favorite Athletes In Our DB
    //Input

    
    return (
        <div className="app__home">
            <div className="search__container">
                <label className="search-label" htmlFor="search-input">
                    <input type="text" value="" id="search-input" 
                    placeholder="Search For Your Favorite NBA Athletes" />
                    <i className="fa fa-search search-icon" />
                </label>
            </div>

        </div>
        
    );
}

export default Search;
