
import React from "react";
import "../../App.css";
import "./LandingPage.css";

function LandingPage() {
    var curry = "https://www.mercurynews.com/wp-content/uploads/2019/10/BNG-L-WARRIORS-1011-18.jpg";
    return (
        <div className="app__home">
            <h1 className="title">Welcome to SportElo!</h1>
            <img src={curry} className="pic"></img>
            <p className="introTxt"> Register/ login to follow your favorite athletes and keep up to date with their latest stats, Tweets, and news! </p>
        </div>
    );
}
export default LandingPage;