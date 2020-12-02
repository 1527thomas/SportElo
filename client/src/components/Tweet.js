import React from "react";
import Axios from "axios";



function Tweet({ handle }) {
    
    if (handle != null) {
        getTweet(handle).then(res => {
            if (res === undefined) {
                document.getElementById(handle).innerHTML = "No recent tweets";
                document.getElementById(handle).style.marginTop = "40%";
                document.getElementById(handle).style.textAlign = "center";
            }
            var TwitterWidgetsLoader = require('twitter-widgets');

            TwitterWidgetsLoader.load(function (err, twttr) {
                if (err) {
                    return;
                }

                if (document.getElementById(handle).innerHTML === "")
                    twttr.widgets.createTweet(res, document.getElementById(handle));
            });
        });
    }


    return (
        <div className="tweet_post">
            <div id={handle} ></div>
        </div>
    );
}

async function getTweet(handle) {
    return await Axios.get(
        "http://localhost:5000/twitter", {
            params: {
                username: handle
            }
        })
        .then(result => {
            return result.data.id;
        });


}
export default Tweet;